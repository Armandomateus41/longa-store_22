import { FaqAccordion } from "../components/info/FaqAccordion";
import { InfoPageLayout } from "../components/info/InfoPageLayout";

export function FaqPage() {
  return (
    <InfoPageLayout title="FAQ - Perguntas Frequentes">
      <FaqAccordion />
    </InfoPageLayout>
  );
}
