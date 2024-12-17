import { Category } from "./category.interfaces"
import { IUser } from "./user.interface"

export interface Budget {
  id: number
  startDate: string
  endDate: string
  total: number
  type: BugdetType
  frequency: BudgetFrecuency
  category: Category
  user: IUser
}

export interface CreateBudget {
  categoryId: number
  startDate?: Date
  endDate?: Date
  total: number
  type: BugdetType
  frequency?: BudgetFrecuency
}

export enum BugdetType {
  OCASSIONAL = 'Ocasional',
  FREQUENT = 'Frecuente'
}

export enum BudgetFrecuency {
  MONTHLY = 'Mensual',
  BIWEEKLY = 'Quincenal',
  WEEKLY = 'Semanal'
}