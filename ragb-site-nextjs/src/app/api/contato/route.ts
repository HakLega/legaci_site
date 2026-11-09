const states = new Set([
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
]);

const subjects = new Set([
  "Estabelecimentos MAPA",
  "Registros e cadastros",
  "Pós-registro",
  "Viabilidade técnica e regulatória",
  "Outro assunto",
]);

type ContactPayload = {
  name: string;
  company: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  subject: string;
  message: string;
  website: string;
  turnstileToken: string;
};

type FieldName = "name" | "company" | "phone" | "email" | "state" | "city" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

function cleanLine(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanMessage(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, 5000);
}

function validate(input: Record<string, unknown>) {
  const data: ContactPayload = {
    name: cleanLine(input.name, 120),
    company: cleanLine(input.company, 120),
    phone: cleanLine(input.phone, 30),
    email: cleanLine(input.email, 254).toLowerCase(),
    state: cleanLine(input.state, 2).toUpperCase(),
    city: cleanLine(input.city, 120),
    subject: cleanLine(input.subject, 80),
    message: cleanMessage(input.message),
    website: cleanLine(input.website, 200),
    turnstileToken: cleanLine(input.turnstileToken, 2048),
  };
  const errors: FieldErrors = {};

  if (data.name.length < 2) errors.name = "Informe seu nome completo.";
  if (input.company !== undefined && typeof input.company !== "string") errors.company = "Confira o nome da empresa.";
  const digits = data.phone.replace(/\D/g, "");
  const nationalDigits = digits.startsWith("55") && (digits.length === 12 || digits.length === 13) ? digits.slice(2) : digits;
  if (nationalDigits.length !== 10 && nationalDigits.length !== 11) errors.phone = "Informe um telefone brasileiro válido com DDD.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = "Informe um e-mail válido.";
  if (!states.has(data.state)) errors.state = "Selecione um estado válido.";
  if (input.city !== undefined && typeof input.city !== "string") errors.city = "Confira a cidade informada.";
  if (!subjects.has(data.subject)) errors.subject = "Selecione um assunto válido.";
  if (!data.message) errors.message = "Escreva uma mensagem para a equipe.";
  if (typeof input.name !== "string" || input.name.length > 120) errors.name = "Confira o nome informado.";
  if (typeof input.phone !== "string" || input.phone.length > 30) errors.phone = "Confira o telefone informado.";
  if (typeof input.email !== "string" || input.email.length > 254) errors.email = "Confira o e-mail informado.";
  if (typeof input.state !== "string" || input.state.length > 2) errors.state = "Selecione um estado válido.";
  if (typeof input.subject !== "string" || input.subject.length > 80) errors.subject = "Selecione um assunto válido.";
  if (typeof input.message !== "string" || input.message.length > 5000) errors.message = "A mensagem deve ter até 5.000 caracteres.";
  if (data.company.length > 120 || (typeof input.company === "string" && input.company.length > 120)) errors.company = "A empresa deve ter até 120 caracteres.";
  if (data.city.length > 120 || (typeof input.city === "string" && input.city.length > 120)) errors.city = "A cidade deve ter até 120 caracteres.";
  if (input.turnstileToken !== undefined && typeof input.turnstileToken !== "string") errors.message = "Refaça a verificação de segurança.";

  return { data, errors };
}

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

async function verifyTurnstile(token: string, secret: string): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!response.ok) return false;
    const result = await response.json() as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 20_000) return json({ ok: false, message: "A solicitação excede o limite permitido." }, 413);

  let input: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > 20_000) return json({ ok: false, message: "A solicitação excede o limite permitido." }, 413);
    input = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: "Não foi possível processar os dados enviados." }, 400);
  }
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return json({ ok: false, message: "Confira os dados do formulário." }, 400);
  }

  const { data, errors } = validate(input as Record<string, unknown>);
  if (Object.keys(errors).length) return json({ ok: false, fieldErrors: errors }, 400);
  if (data.website) return json({ ok: false, message: "Não foi possível validar a solicitação." }, 400);

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) return json({ ok: false, message: "O envio pelo formulário não está configurado." }, 503);
  if (!data.turnstileToken || !(await verifyTurnstile(data.turnstileToken, turnstileSecret))) {
    return json({ ok: false, message: "A verificação de segurança não foi concluída." }, 400);
  }

  const tenantId = process.env.MS_GRAPH_TENANT_ID;
  const clientId = process.env.MS_GRAPH_CLIENT_ID;
  const clientSecret = process.env.MS_GRAPH_CLIENT_SECRET;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!tenantId || !clientId || !clientSecret || !fromEmail || !toEmail) {
    return json({ ok: false, message: "O envio pelo formulário não está configurado." }, 503);
  }

  try {
    const tokenController = new AbortController();
    const tokenTimeout = setTimeout(() => tokenController.abort(), 8000);
    let accessToken: string | undefined;
    try {
      const tokenResponse = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          scope: "https://graph.microsoft.com/.default",
          grant_type: "client_credentials",
        }),
        signal: tokenController.signal,
        cache: "no-store",
      });
      if (!tokenResponse.ok) return json({ ok: false, message: "Não foi possível enviar sua solicitação agora." }, 502);
      const tokenPayload = await tokenResponse.json() as { access_token?: string };
      accessToken = tokenPayload.access_token;
    } finally {
      clearTimeout(tokenTimeout);
    }
    if (!accessToken) return json({ ok: false, message: "Não foi possível enviar sua solicitação agora." }, 502);

    const lines = [
      "NOVO CONTATO PELO SITE",
      "",
      `Nome: ${data.name}`,
      `Empresa: ${data.company}`,
      `Telefone: ${data.phone}`,
      `E-mail: ${data.email}`,
      `Estado: ${data.state}`,
      `Cidade: ${data.city}`,
      `Assunto: ${data.subject}`,
      "",
      "Mensagem:",
      data.message,
      "",
      "Origem:",
      "https://leggare.com/contato",
    ];
    const graphResponse = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(fromEmail)}/sendMail`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: `[Site Leggare] ${data.subject} — ${data.name}${data.company ? ` | ${data.company}` : ""}`,
          body: { contentType: "Text", content: lines.join("\n") },
          toRecipients: [{ emailAddress: { address: toEmail } }],
          replyTo: [{ emailAddress: { address: data.email } }],
        },
      }),
      cache: "no-store",
    });

    if (graphResponse.status !== 202) return json({ ok: false, message: "Não foi possível enviar sua solicitação agora." }, 502);
    return json({ ok: true }, 200);
  } catch {
    return json({ ok: false, message: "Não foi possível enviar sua solicitação agora." }, 502);
  }
}
