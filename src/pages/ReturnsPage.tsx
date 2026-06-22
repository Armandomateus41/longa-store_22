import { InfoPageLayout } from "../components/info/InfoPageLayout";
import { storeContact, storeName } from "../data/storeInfo";

export function ReturnsPage() {
  return (
    <InfoPageLayout title="Política de Trocas e Devoluções">
      <div className="info-content__body">
        <p>
          A {storeName} trabalha para que você fique satisfeito com sua compra.
          Confira abaixo as regras gerais para trocas e devoluções.
        </p>

        <h2 className="info-content__subtitle">Prazo para solicitação</h2>
        <p>
          Você pode solicitar troca ou devolução em até 7 dias corridos após o
          recebimento do produto, conforme o Código de Defesa do Consumidor.
        </p>

        <h2 className="info-content__subtitle">Condições do produto</h2>
        <p>
          O item deve estar sem sinais de uso, com embalagem original, manual e
          acessórios quando aplicável. Produtos personalizados ou perecíveis podem
          ter regras específicas.
        </p>

        <h2 className="info-content__subtitle">Como solicitar</h2>
        <p>
          Entre em contato informando o número do pedido, motivo da solicitação
          e fotos do produto quando necessário. Nossa equipe orientará o
          procedimento de coleta ou postagem.
        </p>

        <h2 className="info-content__subtitle">Reembolso</h2>
        <p>
          Após a análise e recebimento do produto, o reembolso é processado na
          mesma forma de pagamento utilizada na compra, respeitando prazos
          bancários.
        </p>

        <h2 className="info-content__subtitle">Atendimento</h2>
        <p>
          WhatsApp:{" "}
          <a href={storeContact.whatsappLink} target="_blank" rel="noreferrer">
            {storeContact.whatsapp}
          </a>
          <br />
          E-mail:{" "}
          <a href={`mailto:${storeContact.email}`}>{storeContact.email}</a>
        </p>
      </div>
    </InfoPageLayout>
  );
}
