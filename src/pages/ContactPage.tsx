import { FaWhatsapp } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import { InfoPageLayout } from "../components/info/InfoPageLayout";
import { storeContact } from "../data/storeInfo";

export function ContactPage() {
  return (
    <InfoPageLayout title="Atendimento ao Cliente">
      <p className="info-content__intro">
        Dúvidas? Reclamações? Sugestões? Elogios? Entre em contato conosco pelo
        suporte no e-mail ou WhatsApp.
      </p>

      <div className="info-contact-cards">
        <a
          href={storeContact.whatsappLink}
          className="info-contact-card"
          target="_blank"
          rel="noreferrer"
        >
          <span className="info-contact-card__icon" aria-hidden="true">
            <FaWhatsapp />
          </span>
          <h2 className="info-contact-card__title">Atendimento Whatsapp</h2>
          <p className="info-contact-card__text">{storeContact.hours}</p>
          <p className="info-contact-card__value">{storeContact.whatsapp}</p>
        </a>

        <a
          href={`mailto:${storeContact.email}`}
          className="info-contact-card"
        >
          <span className="info-contact-card__icon" aria-hidden="true">
            <FiMail />
          </span>
          <h2 className="info-contact-card__title">Atendimento Via E-mail</h2>
          <p className="info-contact-card__text">{storeContact.hours}</p>
          <p className="info-contact-card__value">{storeContact.email}</p>
        </a>

        <a href={`tel:+5534900000000`} className="info-contact-card">
          <span className="info-contact-card__icon" aria-hidden="true">
            <FiPhone />
          </span>
          <h2 className="info-contact-card__title">Atendimento Via Telefone</h2>
          <p className="info-contact-card__text">{storeContact.hours}</p>
          <p className="info-contact-card__value">{storeContact.phone}</p>
        </a>
      </div>
    </InfoPageLayout>
  );
}
