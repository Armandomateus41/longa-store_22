import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { faqItems } from "../../data/storeInfo";

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div className="faq-accordion">
      {faqItems.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={`faq-accordion__item${isOpen ? " is-open" : ""}`}
          >
            <button
              type="button"
              className="faq-accordion__trigger"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
            >
              <span>{item.question}</span>
              {isOpen ? (
                <FiMinus aria-hidden="true" />
              ) : (
                <FiPlus aria-hidden="true" />
              )}
            </button>

            {isOpen && (
              <div className="faq-accordion__panel">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
