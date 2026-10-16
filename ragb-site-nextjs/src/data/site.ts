const phone = "+5516996109741";
const whatsappNumber = phone.replace(/\D/g, "");
const whatsappMessage =
  "Olá! Conheci a Leggare pelo site e gostaria de conversar sobre um projeto regulatório.";

export const site = {
  name: "Leggare",
  url: "https://leggare.com",
  description:
    "Consultoria regulatória para empresas que buscam clareza sobre requisitos, estratégia e próximos passos no Brasil.",
  heroDescription:
    "A Leggare assessora empresas na estruturação e condução de projetos regulatórios, transformando requisitos técnicos em caminhos claros para cada operação.",
  email: "regulatorio@leggare.com",
  phone,
  phoneLabel: "(16) 99610-9741",
  whatsappNumber,
  whatsappMessage,
  whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
} as const;
