export const storeName = "Longa Store";
export const storeLiveUrl = "https://longa-store-22.vercel.app";

export type InfoNavId =
  | "contact"
  | "about"
  | "shipping"
  | "faq"
  | "privacy"
  | "returns";

export const infoNavItems: {
  id: InfoNavId;
  label: string;
  path: string;
}[] = [
  {
    id: "contact",
    label: "Atendimento ao Cliente",
    path: "/contato",
  },
  {
    id: "about",
    label: `Sobre a ${storeName}`,
    path: "/sobre",
  },
  {
    id: "shipping",
    label: "Entregas e Prazos",
    path: "/entregas",
  },
  {
    id: "faq",
    label: "Perguntas Frequentes",
    path: "/faq",
  },
  {
    id: "privacy",
    label: "Política de Privacidade",
    path: "/privacidade",
  },
  {
    id: "returns",
    label: "Trocas e Devoluções",
    path: "/trocas",
  },
];

export const storeContact = {
  whatsapp: "(34) 9 0000-0000",
  whatsappLink: "https://wa.me/5534900000000",
  email: "trocaremail@gmail.com",
  phone: "(34) 9 0000-0000",
  phoneLink: "tel:+5534900000000",
  hours: "Segunda à sexta, das 09:00 às 18:00",
};

export const storeSocialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/",
  },
];

export const faqItems = [
  {
    id: "payment-methods",
    question: "Quais as formas de pagamento aceitas?",
    answer:
      "Aceitamos cartão de crédito, cartão de débito, Pix e boleto bancário. Todas as transações são processadas em ambiente seguro.",
  },
  {
    id: "shipping-time",
    question: "Qual o prazo de entrega?",
    answer:
      "O prazo varia conforme a região e a transportadora. Após a confirmação do pagamento, você recebe o código de rastreamento por e-mail.",
  },
  {
    id: "order-status",
    question: "Como acompanho meu pedido?",
    answer:
      "Acesse Rastrear pedido no topo do site ou entre em Meus Pedidos. Informe o número do pedido para consultar o status da entrega.",
  },
  {
    id: "returns",
    question: "Como solicitar troca ou devolução?",
    answer:
      "Entre em contato pelo WhatsApp ou e-mail em até 7 dias após o recebimento. Informe o número do pedido e o motivo da solicitação.",
  },
  {
    id: "invoice",
    question: "Como recebo a nota fiscal?",
    answer:
      "A nota fiscal eletrônica é enviada para o e-mail cadastrado após a confirmação do pagamento e faturamento do pedido.",
  },
];
