import { Link } from "react-router-dom";
import { InfoPageLayout } from "../components/info/InfoPageLayout";

export function ShippingPage() {
  return (
    <InfoPageLayout title="Entregas e Prazos">
      <div className="info-content__body">
        <p>
          Após a confirmação do pagamento, seu pedido passa por separação,
          embalagem e despacho. O prazo de entrega é calculado com base no CEP
          informado no checkout e na transportadora disponível para a região.
        </p>

        <p>
          Você recebe o código de rastreamento por e-mail assim que a encomenda
          for postada. Para acompanhar o status, acesse{" "}
          <Link to="/pedido-confirmado">Rastrear pedido</Link> ou consulte a
          área de meus pedidos após finalizar uma compra.
        </p>

        <p>
          Em compras elegíveis, oferecemos frete grátis conforme campanhas
          vigentes na loja. O valor do frete é exibido no carrinho antes da
          confirmação do pedido, sem custos ocultos.
        </p>

        <p>
          Caso o prazo informado expire, entre em contato com nosso atendimento
          informando o número do pedido. Nossa equipe verifica a situação junto
          à transportadora e retorna com uma posição em até 1 dia útil.
        </p>
      </div>
    </InfoPageLayout>
  );
}
