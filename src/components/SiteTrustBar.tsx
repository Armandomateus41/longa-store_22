import { FiCreditCard, FiPackage, FiPhone, FiTruck } from "react-icons/fi";

const trustItems = [
  {
    icon: FiTruck,
    title: "Entrega Garantida",
    description: "Enviamos para todo Brasil",
  },
  {
    icon: FiPackage,
    title: "Cliente Satisfeito",
    description: "Entrega garantida",
  },
  {
    icon: FiPhone,
    title: "Suporte ao Cliente",
    description: "Atendimento Seg a Sex: 8 a 18",
  },
  {
    icon: FiCreditCard,
    title: "Pagamento Seguro",
    description: "Aceitamos cartão, pix e boleto",
  },
];

export function SiteTrustBar() {
  return (
    <section className="site-trust" aria-label="Benefícios da loja">
      <div className="site-trust__inner">
        <ul className="site-trust__list">
          {trustItems.map(({ icon: Icon, title, description }) => (
            <li key={title} className="site-trust__item">
              <span className="site-trust__icon" aria-hidden="true">
                <Icon />
              </span>
              <div className="site-trust__content">
                <strong>{title}</strong>
                <span>{description}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
