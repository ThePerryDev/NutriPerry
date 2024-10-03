import { useContext } from 'react';
import { ConsumoCaloricoContext } from '../context/ConsumoCaloricoContext';

// Definindo a função como exportação padrão corretamente
const useConsumoCalorico = () => {
  const context = useContext(ConsumoCaloricoContext);

  if (!context) {
    throw new Error('useConsumoCalorico deve ser usado dentro de um ConsumoCaloricoProvider');
  }

  return context;
};

// Exportando como padrão
export default useConsumoCalorico;
