import apiAxiosInstance from "src/config/axios.config";
import { CreateTransaction, Transaction } from "src/interfaces/transaction.interfaces";

export const getCurrentTransactions = async (query?: string): Promise<Transaction[]> => {
    const {data} = await apiAxiosInstance.get(`transactions/user?current=true&${query}`);
    return data.data;
};

export const createTransaction = async (transactionData: CreateTransaction) => {
    const {data} = await apiAxiosInstance.post('transactions', transactionData);
    return data;
}
