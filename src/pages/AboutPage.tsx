import { InfoPageLayout } from "../components/info/InfoPageLayout";
import { storeName } from "../data/storeInfo";

export function AboutPage() {
  return (
    <InfoPageLayout title={`Sobre a ${storeName}`}>
      <div className="info-content__body">
        <h2 className="info-content__subtitle">
          {storeName}: sua loja completa de eletrônicos online
        </h2>

        <p>
          A {storeName} nasceu com o objetivo de oferecer produtos de qualidade
          com praticidade, segurança e preços competitivos. Trabalhamos com um
          catálogo selecionado de eletrônicos, acessórios e itens para o dia a
          dia, sempre priorizando a experiência de compra do cliente.
        </p>

        <p>
          Nossa equipe acompanha cada etapa do pedido, do pagamento à entrega,
          para garantir transparência e confiança em todas as transações. Contamos
          com canais de atendimento por WhatsApp, e-mail e telefone para tirar
          dúvidas, orientar sobre produtos e apoiar pós-venda quando necessário.
        </p>

        <p>
          Acreditamos em relacionamento de longo prazo com nossos clientes. Por
          isso, investimos em logística confiável, políticas claras de troca e
          devolução, e formas de pagamento variadas para facilitar sua compra.
        </p>

        <p>
          Obrigado por escolher a {storeName}. Estamos prontos para atender você
          com agilidade e profissionalismo.
        </p>
      </div>
    </InfoPageLayout>
  );
}
