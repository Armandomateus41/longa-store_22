import { useLocation } from "react-router-dom";
import { usePageSeo } from "../../hooks/usePageSeo";

export function SeoManager() {
  const { pathname } = useLocation();
  usePageSeo(pathname);

  return null;
}
