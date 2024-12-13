import apiAxiosInstance from "src/config/axios.config";
import { Transaction } from "src/interfaces/transaction.interfaces";

export const getCurrentTransactions = async (): Promise<Transaction[]> => {
    const {data} = await apiAxiosInstance.get('transactions/user?current=true');
    return data.data;
};
