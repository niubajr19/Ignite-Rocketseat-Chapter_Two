import React from "react";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { HighlightCard } from "../../components/HighlightCard";
import {
    TransactionCard,
    TransactionCardProps,
} from "../../components/TransactionCard";

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
} from "./styles";
export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const data: DataListProps[] = [
        {
            id: "1",
            type: "positive",
            title: "Desenvolvimento de Site",
            amount: "R$ 12.000,00",
            category: {
                name: "Vendas",
                icon: "dollar-sign",
            },
            date: "13/04/2022",
        },
        {
            id: "2",
            type: "negative",
            title: "FDC Hamburgueria",
            amount: "R$ 41,00",
            category: {
                name: "Alimentação",
                icon: "coffee",
            },
            date: "13/04/2022",
        },
        {
            id: "3",
            type: "negative",
            title: "Aluguel do Apartamento",
            amount: "R$ 6.000,00",
            category: {
                name: "Casa",
                icon: "home",
            },
            date: "13/04/2022",
        },
    ];

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{
                                uri: "https://avatars.githubusercontent.com/u/30278242?v=4",
                            }}
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Lucas</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => { }}>
                        <Icon name={"power"} />
                    </LogoutButton>
                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard
                    type={"up"}
                    title={"Entradas"}
                    amount={"R$ 17.400,00"}
                    lastTransaction={"Última entrada dia 10 de Julho"}
                />
                <HighlightCard
                    type={"down"}
                    title={"Saídas"}
                    amount={"R$ 1.259,00"}
                    lastTransaction={"Última saída dia 03 de Julho"}
                />
                <HighlightCard
                    type={"total"}
                    title={"Total"}
                    amount={"R$ 16.141,00"}
                    lastTransaction={"01 à 05 de Julho"}
                />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>
        </Container>
    );
}
