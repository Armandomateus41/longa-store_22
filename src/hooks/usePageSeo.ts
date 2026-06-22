import { useEffect } from "react";
import { getSeoForPath } from "../data/seo";
import { applyPageSeo } from "../utils/pageSeo";

export function usePageSeo(pathname: string) {
  useEffect(() => {
    applyPageSeo(getSeoForPath(pathname));
  }, [pathname]);
}
