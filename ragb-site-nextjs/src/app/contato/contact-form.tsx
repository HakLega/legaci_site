"use client";

import Script from "next/script";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { site } from "../../data/site";
import styles from "./contato.module.css";

const states = [
  ["AC", "Acre"], ["AL", "Alagoas"], ["AP", "Amapá"], ["AM", "Amazonas"],
  ["BA", "Bahia"], ["CE", "Ceará"], ["DF", "Distrito Federal"], ["ES", "Espírito Santo"],
  ["GO", "Goiás"], ["MA", "Maranhão"], ["MT", "Mato Grosso"], ["MS", "Mato Grosso do Sul"],
  ["MG", "Minas Gerais"], ["PA", "Pará"], ["PB", "Paraíba"], ["PR", "Paraná"],
  ["PE", "Pernambuco"], ["PI", "Piauí"], ["RJ", "Rio de Janeiro"], ["RN", "Rio Grande do Norte"],
  ["RS", "Rio Grande do Sul"], ["RO", "Rondônia"], ["RR", "Roraima"], ["SC", "Santa Catarina"],
  ["SP", "São Paulo"], ["SE", "Sergipe"], ["TO", "Tocantins"],
] as const;

const subjects = [
  "Estabelecimentos MAPA",
  "Registros e cadastros",
  "Pós-registro",
  "Viabilidade técnica e regulatória",
  "Outro assunto",
] as const;

type FieldName = "name" | "company" | "phone" | "email" | "state" | "city" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type FormStatus = "idle" | "sending" | "success" | "error";

type TurnstileWidget = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme?: "light" | "dark" | "auto";
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => string;
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileWidget;
  }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function readText(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const renderTurnstile = useCallback(() => {
    if (!turnstileSiteKey || !turnstileRef.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(turnstileRef.current, {
      sitekey: turnstileSiteKey,
      theme: "light",
      callback: (token) => {
        setTurnstileToken(token);
        setTurnstileError("");
      },
      "expired-callback": () => {
        setTurnstileToken("");
        setTurnstileError("A verificação expirou. Faça a verificação novamente.");
      },
      "error-callback": () => {
        setTurnstileToken("");
        setTurnstileError("Não foi possível carregar a verificação. Tente novamente.");
      },
    });
  }, []);

  useEffect(() => {
    renderTurnstile();
  }, [renderTurnstile]);

  const resetTurnstile = () => {
    setTurnstileToken("");
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const payload = {
      name: readText(formData, "name"),
      company: readText(formData, "company"),
      phone: readText(formData, "phone"),
      email: readText(formData, "email"),
      state: readText(formData, "state"),
      city: readText(formData, "city"),
      subject: readText(formData, "subject"),
      message: readText(formData, "message"),
      website: readText(formData, "website"),
      turnstileToken,
    };

    setFieldErrors({});
    setStatus("sending");
    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: FieldErrors;
      } | null;

      if (!response.ok || !result?.ok) {
        setFieldErrors(result?.fieldErrors ?? {});
        setStatus("error");
        if (turnstileToken) resetTurnstile();
        return;
      }

      form.reset();
      resetTurnstile();
      setStatus("success");
    } catch {
      setStatus("error");
      if (turnstileToken) resetTurnstile();
    }
  };

  const continueOnWhatsApp = () => {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    const formData = new FormData(form);
    const name = readText(formData, "name");
    const company = readText(formData, "company");
    const phone = readText(formData, "phone");
    const email = readText(formData, "email");
    const state = readText(formData, "state");
    const city = readText(formData, "city");
    const subject = readText(formData, "subject");
    const message = readText(formData, "message");

    const lines = [
      site.whatsappMessage,
      "",
      `Nome: ${name}`,
      ...(company ? [`Empresa: ${company}`] : []),
      `Telefone: ${phone}`,
      `E-mail: ${email}`,
      `Estado: ${state}`,
      ...(city ? [`Cidade: ${city}`] : []),
      `Assunto: ${subject}`,
      "",
      "Mensagem:",
      message,
    ];
    const url = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const errorFor = (field: FieldName) => fieldErrors[field];

  return (
    <form className={styles.form} ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className={styles.formHeading}>
        <p className={styles.eyebrow}>Envie sua solicitação</p>
        <h2>Conte um pouco sobre o que precisa.</h2>
        <p>Os campos com * são obrigatórios.</p>
      </div>

      <label className={styles.honeypot} aria-hidden="true">
        Deixe este campo vazio
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Nome completo <span aria-hidden="true">*</span></label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required maxLength={120} aria-invalid={Boolean(errorFor("name"))} aria-describedby={errorFor("name") ? "contact-name-error" : undefined} />
          {errorFor("name") && <span className={styles.fieldError} id="contact-name-error">{errorFor("name")}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-company">Empresa</label>
          <input id="contact-company" name="company" type="text" autoComplete="organization" maxLength={120} aria-invalid={Boolean(errorFor("company"))} aria-describedby={errorFor("company") ? "contact-company-error" : undefined} />
          {errorFor("company") && <span className={styles.fieldError} id="contact-company-error">{errorFor("company")}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-phone">Telefone / WhatsApp <span aria-hidden="true">*</span></label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" required maxLength={30} aria-invalid={Boolean(errorFor("phone"))} aria-describedby={errorFor("phone") ? "contact-phone-error" : undefined} />
          {errorFor("phone") && <span className={styles.fieldError} id="contact-phone-error">{errorFor("phone")}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email">E-mail <span aria-hidden="true">*</span></label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={Boolean(errorFor("email"))} aria-describedby={errorFor("email") ? "contact-email-error" : undefined} />
          {errorFor("email") && <span className={styles.fieldError} id="contact-email-error">{errorFor("email")}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-state">Estado <span aria-hidden="true">*</span></label>
          <select id="contact-state" name="state" autoComplete="address-level1" required defaultValue="" aria-invalid={Boolean(errorFor("state"))} aria-describedby={errorFor("state") ? "contact-state-error" : undefined}>
            <option value="" disabled>Selecione o estado</option>
            {states.map(([uf, stateName]) => <option key={uf} value={uf}>{stateName}</option>)}
          </select>
          {errorFor("state") && <span className={styles.fieldError} id="contact-state-error">{errorFor("state")}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-city">Cidade</label>
          <input id="contact-city" name="city" type="text" autoComplete="address-level2" maxLength={120} aria-invalid={Boolean(errorFor("city"))} aria-describedby={errorFor("city") ? "contact-city-error" : undefined} />
          {errorFor("city") && <span className={styles.fieldError} id="contact-city-error">{errorFor("city")}</span>}
        </div>
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor="contact-subject">Assunto <span aria-hidden="true">*</span></label>
          <select id="contact-subject" name="subject" required defaultValue="" aria-invalid={Boolean(errorFor("subject"))} aria-describedby={errorFor("subject") ? "contact-subject-error" : undefined}>
            <option value="" disabled>Selecione o assunto</option>
            {subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
          </select>
          {errorFor("subject") && <span className={styles.fieldError} id="contact-subject-error">{errorFor("subject")}</span>}
        </div>
        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label htmlFor="contact-message">Mensagem <span aria-hidden="true">*</span></label>
          <textarea id="contact-message" name="message" rows={5} required maxLength={5000} aria-invalid={Boolean(errorFor("message"))} aria-describedby={errorFor("message") ? "contact-message-error" : undefined} />
          {errorFor("message") && <span className={styles.fieldError} id="contact-message-error">{errorFor("message")}</span>}
        </div>
      </div>

      {turnstileSiteKey ? (
        <div className={styles.turnstileBlock}>
          <div ref={turnstileRef} aria-label="Verificação de segurança" />
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onLoad={renderTurnstile}
          />
          {turnstileError && <p className={styles.fieldError} role="alert">{turnstileError}</p>}
        </div>
      ) : (
        <p className={styles.configurationNote}>
          O envio por formulário estará disponível após a configuração da verificação de segurança. Você ainda pode continuar pelo WhatsApp.
        </p>
      )}

      <p className={styles.privacy}>
        Ao enviar, você autoriza a Leggare a utilizar os dados informados exclusivamente para responder à sua solicitação.
      </p>

      <div className={styles.actions}>
        <button className="button" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Enviando…" : "Enviar para a Leggare"}
        </button>
        <button className={styles.whatsappButton} type="button" onClick={continueOnWhatsApp}>
          <span>Continuar pelo WhatsApp</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <p className={styles.status} aria-live="polite" role={status === "error" ? "alert" : "status"}>
        {status === "success" && "Mensagem enviada com sucesso. Nossa equipe recebeu sua solicitação e entrará em contato."}
        {status === "error" && "Não foi possível enviar sua mensagem agora. Seus dados foram preservados. Tente novamente ou continue pelo WhatsApp."}
      </p>
    </form>
  );
}
