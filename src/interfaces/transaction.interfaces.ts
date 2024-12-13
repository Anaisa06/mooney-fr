import { Budget } from "./budget.interfaces"

export interface Transaction {
    id: number
    description: string
    date: string
    total: number
    type: string
    budget: Budget
}