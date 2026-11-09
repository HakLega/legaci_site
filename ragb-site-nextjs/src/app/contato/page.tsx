import type { Metadata } from "next";
import { ArrowRight, MessageCircle } from "lucide-react";
import BrandWordmark from "../../components/brand-wordmark";
import MobileNavigation from "../../components/mobile-navigation";
import { site } from "../../data/site";
import styles from "./contato.module.css";
import ContactForm from "./contact-form";

const navigation = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/#processo", label: "Como trabalhamos" },
];

const pageTitle = "Contato | Leggare";
const pageDescription =
  "Fale com a Leggare sobre sua empresa ou projeto regulatório. Envie sua solicitação ou converse diretamente pelo WhatsApp.";

export const metadata: Metadata = {
  title: "Contato",
  description: pageDescription,
  alternates: { canonical: "/contato" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/contato",
    siteName: site.name,
    title: pageTitle,
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/opengraph-image"],
  },
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/" aria-label="Leggare, início">
            <BrandWordmark />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
            <a className="button button-small" href="/contato">
              Fale com a Leggare <ArrowRight aria-hidden="true" />
            </a>
          </nav>
          <MobileNavigation items={navigation} />
        </div>
      </header>

      <main id="conteudo">
        <section className={styles.hero} aria-labelledby="contact-title">
          <div className="container">
            <p className={styles.eyebrow}>Contato</p>
            <h1 className={styles.title} id="contact-title">
              Fale com a Leggare.
            </h1>
            <p className={styles.intro}>
              Conte-nos brevemente sobre sua empresa ou projeto. Você pode enviar sua solicitação pelo formulário ou continuar diretamente pelo WhatsApp.
            </p>
          </div>
        </section>

        <section className={styles.contact} aria-label="Opções de contato">
          <div className={`container ${styles.grid}`}>
            <aside className={styles.direct} aria-labelledby="direct-title">
              <p className={styles.eyebrow}>Contato direto</p>
              <h2 id="direct-title">Prefere falar agora?</h2>
              <p className={styles.directIntro}>
                Converse com a equipe da Leggare pelo canal mais conveniente para você.
              </p>
              <a className="button" href={site.whatsappUrl}>
                <MessageCircle aria-hidden="true" /> Conversar pelo WhatsApp
              </a>
              <div className={styles.directLinks}>
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <a href={`tel:${site.phone}`}>{site.phoneLabel}</a>
              </div>
            </aside>

            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="brand footer-brand" href="/" aria-label="Leggare, voltar ao início">
            <BrandWordmark />
          </a>
          <div className="footer-meta">
            <p>Consultoria regulatória</p>
            <span>© {new Date().getFullYear()} Leggare</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
