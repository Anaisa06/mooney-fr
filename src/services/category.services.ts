import apiAxiosInstance from "src/config/axios.config";
import { Category } from "src/interfaces/category.interfaces";

export const getCategories = async (): Promise<Category[]> => {
    const {data} = await apiAxiosInstance.get('categories/user');
    
    return data.data;
}