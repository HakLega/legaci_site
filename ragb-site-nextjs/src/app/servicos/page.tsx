import type { Metadata } from "next";
import { ArrowRight, MessageCircle } from "lucide-react";
import BrandWordmark from "../../components/brand-wordmark";
import MobileNavigation from "../../components/mobile-navigation";
import { site } from "../../data/site";
import styles from "./servicos.module.css";

const navigation = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/#processo", label: "Como trabalhamos" },
];

const serviceGroups = [
  {
    number: "01",
    anchor: "mapa",
    title: "Empresas e estabelecimentos MAPA",
    items: [
      { title: "Fertilizantes, inoculantes e substratos", description: "Produção, importação e comércio." },
      { title: "Armazenagem e acondicionamento", description: "Regularização de prestadores de serviços." },
      { title: "Defensivos agrícolas", description: "Fabricação, importação, exportação e comércio." },
      { title: "Alimentação animal", description: "Fabricação de alimentos, ingredientes, suplementos e aditivos." },
      { title: "Produtos veterinários", description: "Importação de produtos veterinários." },
    ],
  },
  {
    number: "02",
    title: "Registro e cadastro de produtos",
    items: [
      { title: "Produtos agrícolas", description: "Fertilizantes, substratos, inoculantes e defensivos agrícolas." },
    ],
  },
  {
    number: "03",
    anchor: "viabilidade",
    title: "Viabilidade técnica e regulatória",
    items: [
      {
        title: "Avaliação prévia",
        description: "Análise de empresas, atividades e produtos para identificar requisitos, documentos e adequações necessários à regularização.",
      },
      {
        title: "Planejamento de projetos",
        description: "Orientação sobre o caminho regulatório para novas operações e produtos.",
      },
    ],
  },
];

const pageTitle = "Serviços regulatórios | Leggare";
const pageDescription =
  "Conheça o apoio da Leggare para empresas e estabelecimentos MAPA, produtos agrícolas, viabilidade técnica e planejamento regulatório.";

export const metadata: Metadata = {
  title: "Serviços regulatórios",
  description: pageDescription,
  alternates: { canonical: "/servicos" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/servicos",
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

export default function ServicesPage() {
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
            <a className="button button-small" href="/#contato">
              Fale com a Leggare <ArrowRight aria-hidden="true" />
            </a>
          </nav>
          <MobileNavigation items={navigation} />
        </div>
      </header>

      <main id="conteudo">
        <section className={styles.hero} aria-labelledby="services-title">
          <div className="container">
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Serviços Leggare</p>
              <h1 className={styles.heroTitle} id="services-title">
                Serviços regulatórios para cada etapa da operação.
              </h1>
              <p className={styles.heroIntro}>
                A Leggare atua na estruturação e condução de projetos regulatórios,
                apoiando empresas na regularização de operações, produtos e atividades.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.services} aria-label="Serviços regulatórios">
          <div className="container">
            {serviceGroups.map((group) => (
              <article className={styles.serviceBlock} id={group.anchor} key={group.number}>
                <div className={styles.serviceHeading}>
                  <span className={styles.serviceNumber}>{group.number}</span>
                  <h2 className={styles.serviceTitle}>{group.title}</h2>
                </div>
                <ul className={styles.serviceList}>
                  {group.items.map((item) => (
                    <li className={styles.serviceItem} key={item.title}>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                      <p className={styles.itemDescription}>{item.description}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contato" aria-labelledby="services-contact-title">
          <div className="container contact-layout">
            <div>
              <p className="eyebrow">Vamos conversar?</p>
              <h2 id="services-contact-title">Precisa entender qual caminho regulatório seguir?</h2>
            </div>
            <div className="contact-actions">
              <a className="button button-light" href={site.whatsappUrl}>
                <MessageCircle aria-hidden="true" /> Fale com a Leggare
              </a>
            </div>
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
