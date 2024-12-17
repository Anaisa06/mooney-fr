import apiAxiosInstance from "src/config/axios.config";
import { Category, CreateCategory } from "src/interfaces/category.interfaces";

export const getCategories = async (): Promise<Category[]> => {
    const {data} = await apiAxiosInstance.get('categories/user');
    
    return data.data;
}

export const createCategory = async (categoryData: CreateCategory) => {
    const {data} = await apiAxiosInstance.post('categories', categoryData);
    return data; 
}