import apiAxiosInstance from "src/config/axios.config"
import { Budget } from "src/interfaces/budget.interfaces";

export const getCurrentBudget = async (): Promise<Budget[]> => {
    const {data} = await apiAxiosInstance.get('/budgets/user?current=true');
    
    return data.data;
}