import React, { useState } from 'react';
import { Button } from '../../components/Forms/Button';
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsType
} from './styles';

import *  as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../../components/Forms/InputForm';
import { useForm } from 'react-hook-form';

interface FormData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number().typeError('Informe um valor numerico').positive('O valor não pode ser negativo').required('O valor é obrigatório')
})

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
    }

    function handleRegister(form: FormData) {
        if (!transactionType)
            return Alert.alert('Selecione o tipo da transação');

        if (category.key === 'category')
            return Alert.alert('Selecione a categoria');

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            name={'name'}
                            control={control}
                            placeholder={'name'}
                            autoCapitalize={'words'}
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name={'amount'}
                            control={control}
                            placeholder={'Preço'}
                            keyboardType={'numeric'}
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionsType>
                            <TransactionTypeButton type={'up'} title={'Income'} onPress={() => handleTransactionsTypeSelect('up')} isActive={transactionType === 'up'} />
                            <TransactionTypeButton type={'down'} title={'Outcome'} onPress={() => handleTransactionsTypeSelect('down')} isActive={transactionType === 'down'} />
                        </TransactionsType>
                        <CategorySelectButton title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>

                    <Button title={'Enviar'}
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={handleCloseSelectCategoryModal} />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}