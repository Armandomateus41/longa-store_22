import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FiClock, FiMail, FiPhone } from "react-icons/fi";
import { storeImages } from "../data/storeImages";

const menuLinks = [
  { label: "Sobre Nós", to: "/sobre" },
  { label: "Contato", to: "/contato" },
  { label: "Meus Pedidos", to: "/pedido-confirmado" },
  { label: "Acompanhe seus pedidos", to: "/pedido-confirmado" },
  { label: "Editar cadastro", to: "/conta" },
  { label: "Todos os Produtos", to: "/#catalog" },
];

const policyLinks = [
  "Politicas de privacidade",
  "Politicas de devolução e trocas",
  "Politicas de Entrega e Prazos",
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: FaFacebookF },
  { label: "Instagram", href: "#", icon: FaInstagram },
  { label: "YouTube", href: "#", icon: FaYoutube },
  { label: "TikTok", href: "#", icon: FaTiktok },
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
                Segunda a sexta: 8:00 às 18:00h
              </li>
              <li>
                <FiPhone aria-hidden="true" />
                Contato: (34) 9 0000 0000
              </li>
              <li>
                <FaWhatsapp aria-hidden="true" />
                Whatsapp: (34) 9 0000 0000
              </li>
              <li>
                <FiMail aria-hidden="true" />
                Email: trocaremail@gmail.com
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
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>

            <h3 className="site-prefooter__subtitle">Onde nos encontrar:</h3>
            <div className="site-prefooter__social">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="site-prefooter__social-link"
                  aria-label={label}
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
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
