import { Budget } from './budget.interfaces';

export interface Transaction {
    id: number
    description: string
    date: string
    total: number
    type: TransactionType;
    budget: Budget
}

export interface CreateTransaction {
    description: string
    total: number
    type: TransactionType;
    budgetId: number;
}

export enum TransactionType {
    BUDGET = 'Presupuesto',
    EXPENSE = 'Gasto'
}
