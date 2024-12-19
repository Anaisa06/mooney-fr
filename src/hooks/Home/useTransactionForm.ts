import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Budget } from 'src/interfaces/budget.interfaces';
import { TransactionType, CreateTransaction } from 'src/interfaces/transaction.interfaces';
import { getCurrentBudget } from 'src/services/budget.services';
import { createTransaction } from 'src/services/transaction.services';

interface IFormInput {
    description: string;
    type: TransactionType;
    total: number;
    budgetId: number;
}

export const useTransactionForm = (reRender: () => void, closeModal: () => void) => {
     const [budgets, setBudgets] = useState<Budget[]>([]);

        useEffect(() => {
            const fetchBudgets = async () => {
                try {
                    const data = await getCurrentBudget();
                    setBudgets(data);
                } catch (error) {
                    console.error('Error fetching categories in budget form', error);
                }
            };
            fetchBudgets();
        }, []);


        const { control, handleSubmit, formState: { errors },
        } = useForm<IFormInput>();

        const typesForSelect = [
            { name: TransactionType.BUDGET, id: 'budget' },
            { name: TransactionType.EXPENSE, id: 'expense' },
        ];

        const budgetsforSelect = budgets.map(budget => {

            return {
                name: `${budget.category.name}: ${budget.startDate.split('T')[0]} / ${budget.endDate.split('T')[0]}`,
                id: budget.id,
            };
        });

        const onSubmit: SubmitHandler<IFormInput> = async (data) => {
            const toSave: CreateTransaction = {
                ...data,
                total: +data.total,
                budgetId: +data.budgetId,
            };

            try {
                const response = await createTransaction(toSave);

                if(response.statusCode === 201) {
                    reRender();
                    closeModal();
                }
            } catch (error) {
                console.error('Error saving transaction from form', error);

            }
        };

        return {
            control,
            typesForSelect,
            budgetsforSelect,
            errors,
            handleSubmit,
            onSubmit,
        };
};
