import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ClipboardCheck,
  FileSearch,
  MessageCircle,
  Route,
  ShieldCheck,
} from "lucide-react";
import { site } from "../data/site";
import MobileNavigation from "../components/mobile-navigation";
import ButterflyInteraction from "../components/butterfly-interaction";
import ButterflyMark from "../components/butterfly-mark";
import BrandWordmark from "../components/brand-wordmark";

const services = [
  {
    number: "01",
    title: "MAPA",
    description:
      "Apoio regulatório para estabelecimentos, produtos, licenças e processos de renovação.",
  },
  {
    number: "02",
    title: "Estratégia regulatória",
    description:
      "Análise de enquadramento, requisitos e riscos para planejar os próximos passos do seu projeto.",
  },
];

const steps = [
  { icon: FileSearch, title: "Entendimento", number: "01" },
  { icon: Route, title: "Estratégia", number: "02" },
  { icon: ClipboardCheck, title: "Execução", number: "03" },
  { icon: ShieldCheck, title: "Acompanhamento", number: "04" },
];

const navigation = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Como trabalhamos" },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="Leggare, início">
            <BrandWordmark />
          </a>

          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
            <a className="button button-small" href="#contato">
              Fale com a Leggare <ArrowRight aria-hidden="true" />
            </a>
          </nav>

          <MobileNavigation items={navigation} />
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Consultoria regulatória</p>
              <h1 id="hero-title">
                Clareza regulatória para <em>avançar com segurança.</em>
              </h1>
              <p className="hero-intro">{site.heroDescription}</p>
              <div className="hero-actions">
                <a className="button" href="#contato">
                  Fale com a Leggare <ArrowRight aria-hidden="true" />
                </a>
                <a className="text-link" href="#servicos">
                  Conheça os serviços <ArrowDownRight aria-hidden="true" />
                </a>
              </div>
            </div>

            <ButterflyInteraction />
          </div>
          <a className="scroll-cue" href="#servicos" aria-label="Rolar para os serviços">
            <span />
          </a>
        </section>

        <section className="section services-section" id="servicos" aria-labelledby="services-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Como podemos ajudar</p>
              <h2 id="services-title">Conhecimento técnico.<br /><em>Próximos passos claros.</em></h2>
              <p>
                Cada projeto começa pela compreensão do contexto e dos objetivos
                da sua empresa.
              </p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service.number}>
                  <span className="card-number">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="#contato" aria-label={`Falar sobre ${service.title}`}>
                    Falar sobre este serviço <ArrowRight aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="process-section" id="processo" aria-labelledby="process-title">
          <div className="container process-layout">
            <div className="process-intro">
              <p className="eyebrow">Nosso processo</p>
              <h2 id="process-title">Um caminho bem definido, <em>do início ao próximo passo.</em></h2>
              <p>
                Você acompanha cada etapa com comunicação direta e orientação
                alinhada ao seu projeto.
              </p>
            </div>
            <ol className="process-list">
              {steps.map(({ icon: Icon, title, number }) => (
                <li key={number}>
                  <span className="step-number">{number}</span>
                  <span className="step-icon"><Icon aria-hidden="true" /></span>
                  <span className="step-title">{title}</span>
                  <Check className="step-check" aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="about-section section" id="sobre" aria-labelledby="about-title">
          <div className="container about-grid">
            <div className="about-monogram" aria-hidden="true">
              <span className="monogram-line" />
              <ButterflyMark className="about-butterfly" />
              <small>Consultoria Regulatória</small>
            </div>
            <div className="about-copy">
              <p className="eyebrow">Sobre a Leggare</p>
              <h2 id="about-title">Regulação compreendida. <em>Decisões mais seguras.</em></h2>
              <p>
                Atuamos em assessoria e consultoria regulatória, aproximando
                requisitos técnicos das decisões do dia a dia da sua empresa.
                O trabalho é conduzido de forma personalizada, com atenção ao
                contexto de cada projeto.
              </p>
              <a className="text-link" href="#contato">
                Fale com a Leggare <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contato" aria-labelledby="contact-title">
          <div className="container contact-layout">
            <div>
              <p className="eyebrow">Vamos conversar?</p>
              <h2 id="contact-title">O próximo passo começa com uma conversa.</h2>
            </div>
            <div className="contact-actions">
              <a className="button button-light" href={site.whatsappUrl}>
                <MessageCircle aria-hidden="true" /> Conversar pelo WhatsApp
              </a>
              <a className="contact-email" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <a className="contact-phone" href={`tel:${site.phone}`}>{site.phoneLabel}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="brand footer-brand" href="#inicio" aria-label="Leggare, voltar ao início">
            <BrandWordmark />
          </a>
          <div className="footer-meta">
            <p>Consultoria regulatória</p>
            <span>© {new Date().getFullYear()} Leggare</span>
          </div>
        </div>
      </footer>
    </>
  );
}
