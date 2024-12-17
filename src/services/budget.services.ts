import apiAxiosInstance from "src/config/axios.config"
import { Budget, CreateBudget } from "src/interfaces/budget.interfaces";

export const getCurrentBudget = async (): Promise<Budget[]> => {
    const {data} = await apiAxiosInstance.get('budgets/user?current=true');
    
    return data.data;
}

export const createBudget = async (budgetData: CreateBudget) => {
    const {data} = await apiAxiosInstance.post('budgets', budgetData);
    return data;
}