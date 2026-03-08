import { Category, TransactionType } from './constants.model';

export interface Transaction {
  id: string,
  type: TransactionType,
  category: Category,
  issueDate: string,
  amount: number,
  description: string | null;
  proofImage: string;
}
