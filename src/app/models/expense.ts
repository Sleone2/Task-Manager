export interface Expense {
  id?: number;
  description: string;
  amount: number;
  category: string;
  date: Date;
  type: 'income' | 'expense';
}
