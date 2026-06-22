import { InfoPageLayout } from "../components/info/InfoPageLayout";
import { storeContact, storeName } from "../data/storeInfo";

export function PrivacyPage() {
  return (
    <InfoPageLayout title="Política de Privacidade">
      <div className="info-content__body">
        <p>
          A {storeName} respeita a privacidade dos visitantes e clientes. Esta
          política descreve como tratamos informações neste site demonstrativo.
        </p>

        <h2 className="info-content__subtitle">Dados coletados</h2>
        <p>
          Podemos coletar nome, e-mail, telefone, endereço e dados de navegação
          informados voluntariamente no cadastro, checkout ou formulários de
          contato.
        </p>

        <h2 className="info-content__subtitle">Uso das informações</h2>
        <p>
          Os dados são utilizados para processar pedidos, responder atendimentos,
          melhorar a experiência de compra e cumprir obrigações legais quando
          aplicável.
        </p>

        <h2 className="info-content__subtitle">Armazenamento local</h2>
        <p>
          Nesta versão demonstrativa, conta, carrinho e pedidos podem ser salvos
          no navegador (localStorage) do dispositivo utilizado.
        </p>

        <h2 className="info-content__subtitle">Contato</h2>
        <p>
          Dúvidas sobre privacidade:{" "}
          <a href={`mailto:${storeContact.email}`}>{storeContact.email}</a>
        </p>
      </div>
    </InfoPageLayout>
  );
}
