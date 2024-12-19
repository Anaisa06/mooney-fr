import { useState, useEffect } from 'react';
import { useForm, useWatch, SubmitHandler } from 'react-hook-form';
import { BugdetType, BudgetFrecuency, CreateBudget } from 'src/interfaces/budget.interfaces';
import { Category } from 'src/interfaces/category.interfaces';
import { createBudget } from 'src/services/budget.services';
import { getCategories } from 'src/services/category.services';

interface IFormInput {
    categoryId: number;
    type: BugdetType;
    startDate?: Date;
    endDate?: Date;
    frequency?: BudgetFrecuency;
    total: number;
}

export const useBudgetForm = (reRender: () => void, closeModal: () => void) => {
     const [categories, setCategories] = useState<Category[]>([]);
        const [fetchCategories, setFetchCategories] = useState(false);
        const [openModal, setOpenModal] = useState(false);

        useEffect(() => {
            const fetchCategories = async () => {
                try {
                    const data = await getCategories();
                    setCategories(data);
                } catch (error) {
                    console.error('Error fetching categories in budget form', error);
                }
            };
            fetchCategories();
        }, [fetchCategories]);

        const { control, handleSubmit, formState: { errors },
        } = useForm<IFormInput>();



        const categoriesForPicker = categories.map(category => { return { name: category.name, id: category.id }; });

        const typesForPicker = [
            { name: BugdetType.FREQUENT, id: 'freq' },
            { name: BugdetType.OCASSIONAL, id: 'ocas' },
        ];

        const frequencyForPicker = [
            { name: BudgetFrecuency.MONTHLY, id: 'month' },
            { name: BudgetFrecuency.BIWEEKLY, id: 'biweek' },
            { name: BudgetFrecuency.WEEKLY, id: 'week' },
        ];

        const type = useWatch({ control, name: 'type' });
        const startDate = useWatch({ control, name: 'startDate'});

        const handleCategoryModalClose = () => {
            setFetchCategories(!fetchCategories);
            setOpenModal(false);
        };

        const onSubmit: SubmitHandler<IFormInput> = async (data) => {

            const toSave: CreateBudget = {
                categoryId: +data.categoryId,
                startDate: data.startDate,
                endDate: data.endDate,
                total: +data.total,
                type: data.type,
                frequency: data.frequency,
            };

            try {
                const response = await createBudget(toSave);
                if(response.statusCode === 201) {
                    reRender();
                    closeModal();
                }

            } catch (error) {
                console.error('Error saving budget in form', error);
            }
        };

        return {
            control,
            categoriesForPicker,
            errors,
            setOpenModal,
            typesForPicker,
            type,
            frequencyForPicker,
            startDate,
            handleSubmit,
            handleCategoryModalClose,
            openModal,
            onSubmit,
        };
};
