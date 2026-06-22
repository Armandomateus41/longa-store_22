import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiMail, FiPhone } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { storeContact, storeSocialLinks } from "../data/storeInfo";
import { storeImages } from "../data/storeImages";

const socialIcons = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  YouTube: FaYoutube,
  TikTok: FaTiktok,
} as const;

const menuLinks = [
  { label: "Sobre Nós", to: "/sobre" },
  { label: "Contato", to: "/contato" },
  { label: "Meus Pedidos", to: "/pedidos" },
  { label: "Rastrear pedido", to: "/rastrear-pedido" },
  { label: "Editar cadastro", to: "/conta" },
  { label: "Todos os Produtos", to: "/#catalog" },
];

const policyLinks = [
  { label: "Politicas de privacidade", to: "/privacidade" },
  { label: "Politicas de devolução e trocas", to: "/trocas" },
  { label: "Politicas de Entrega e Prazos", to: "/entregas" },
];

export function SitePreFooter() {
  return (
    <section className="site-prefooter" id="atendimento" aria-label="Informações da loja">
      <div className="site-prefooter__inner">
        <div className="site-prefooter__grid">
          <div className="site-prefooter__column">
            <h2>Atendimento Ao Cliente</h2>
            <h3>Horário de Atendimento</h3>
            <ul className="site-prefooter__contact">
              <li>
                <FiClock aria-hidden="true" />
                {storeContact.hours}
              </li>
              <li>
                <FiPhone aria-hidden="true" />
                <a href={storeContact.phoneLink}>Contato: {storeContact.phone}</a>
              </li>
              <li>
                <FaWhatsapp aria-hidden="true" />
                <a href={storeContact.whatsappLink} target="_blank" rel="noreferrer">
                  Whatsapp: {storeContact.whatsapp}
                </a>
              </li>
              <li>
                <FiMail aria-hidden="true" />
                <a href={`mailto:${storeContact.email}`}>
                  Email: {storeContact.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="site-prefooter__column">
            <h2>Menu</h2>
            <ul className="site-prefooter__links">
              {menuLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-prefooter__column">
            <h2>Nossas Políticas</h2>
            <ul className="site-prefooter__links">
              {policyLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>

            <h3 className="site-prefooter__subtitle">Onde nos encontrar:</h3>
            <div className="site-prefooter__social">
              {storeSocialLinks.map(({ label, href }) => {
                const Icon = socialIcons[label as keyof typeof socialIcons];
                return (
                  <a
                    key={label}
                    href={href}
                    className="site-prefooter__social-link"
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="site-prefooter__column">
            <h2>Formas de Pagamento</h2>
            <img
              src={storeImages.paymentMethods}
              alt="Formas de pagamento aceitas"
              className="site-prefooter__payments"
            />

            <h3 className="site-prefooter__subtitle">Loja Verificada</h3>
            <img
              src={storeImages.siteSecure}
              alt="Loja verificada e site seguro"
              className="site-prefooter__secure"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
