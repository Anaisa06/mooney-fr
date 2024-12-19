import { Category } from 'src/interfaces/category.interfaces';
import { Transaction } from 'src/interfaces/transaction.interfaces';
import { generateRandomColor } from './randomColor';

interface GroupedTransactions {
    category: Category;
    total: number;
}

export function groupTransactionsByCategory(transactions: Transaction[]) {
    const grouped = transactions.reduce((acc, transaction) => {
        const categoryId = transaction.budget.category.id;

        if (!acc[categoryId]) {
            acc[categoryId] = {
                category: transaction.budget.category,
                total: 0,
            };
        }

        acc[categoryId].total += transaction.total;

        return acc;
    }, {} as Record<number, GroupedTransactions>);

    return Object.values(grouped);
}

export function formatForChart(groupedData: any[], title: string): { id: string; title: string; data: { value: number; label: string; color: string }[] } {
    return {
        id: title,
        title: title,
        data: groupedData.map(group => ({
            value: group.total,
            label: group.category?.name || group.description,
            color: generateRandomColor(),
        })),
    };
}
