

export type Category = 'Alimentación' | 'Transporte' | 'Vivienda' | 'Ocio' | 'Salario' | 'Otros';

export const CATEGORIES = {
  FOOD : 'Alimentación',
  TRANSPORTATION: 'Transporte',
  HOUSING : 'Vivienda',
  LEISURE: 'Ocio',
  SALARY: 'Salario',
  OTHERS: 'Otros'
} as const;


export type TransactionType = 'Gasto' | 'Ingreso';

export const TRANSACTIONS_TYPES = {
  SPENDING: 'Gasto',
  INCOME: 'Ingreso'
} as const;




