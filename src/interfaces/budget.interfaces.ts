import { Category } from "./category.interfaces"
import { IUser } from "./user.interface"

export interface Budget {
    id: number
    startDate: string
    endDate: string
    total: number
    type: string
    frequency: string
    category: Category
    user: IUser
  }