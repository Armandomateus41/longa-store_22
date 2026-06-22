import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

type CatalogStatusProps = {
  message: string;
  onRetry?: () => void;
};

export function CatalogStatus({ message, onRetry }: CatalogStatusProps) {
  return (
    <div className="catalog-status catalog-status--error" role="alert">
      <span className="catalog-status__icon" aria-hidden="true">
        <FiAlertCircle />
      </span>
      <h2 className="catalog-status__title">Algo deu errado</h2>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="catalog-status__retry" onClick={onRetry}>
          <FiRefreshCw aria-hidden="true" />
          Tentar novamente
        </button>
      )}
    </div>
  );
}
