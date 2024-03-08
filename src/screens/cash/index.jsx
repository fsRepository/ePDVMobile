import React, { useState } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import Header from '../../components/headerDate';
import * as C from './styles'
import * as A from '../sell/styles'
// import { Container } from './styles';
import Menu from 'react-native-vector-icons/AntDesign'
import RenderHistoric from './../../components/renderHistoric/index';
import { Button, Input, Overlay } from '@rneui/themed';
import { format } from 'date-fns';
import { TextInputMask } from 'react-native-masked-text';
import Setting from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../../../assets/colors.json'
import { useNavigation } from '@react-navigation/native';


export default function Cash({ handleMenu }) {

    const historicoDoCaixa = [
        { data: '2024-02-16', hora: '10:30', tipo: 'entrada', entrada: 1500, venda: 1001 },
        { data: '2024-02-16', hora: '14:15', tipo: 'saida', saida: 200 },
        { data: '2024-02-16', hora: '17:45', tipo: 'entrada', entrada: 800, venda: 1002 },
        { data: '2024-02-17', hora: '09:00', tipo: 'saida', saida: 350 },
        { data: '2024-02-17', hora: '12:20', tipo: 'entrada', entrada: 1200, venda: 1003 },
        { data: '2024-02-17', hora: '15:40', tipo: 'saida', saida: 500 },
        { data: '2024-02-18', hora: '11:10', tipo: 'entrada', entrada: 1800, venda: 1004 },
        { data: '2024-02-18', hora: '14:30', tipo: 'saida', saida: 700 },
        { data: '2024-02-19', hora: '10:00', tipo: 'entrada', entrada: 1000, venda: 1005 },
        { data: '2024-02-19', hora: '16:15', tipo: 'saida', saida: 300 }
    ];

    //resumo de caixa
    const caixaState = [
        {
            id: 1,
            nome: "Vendas em Dinheiro",
            valor: 500.00,
        },
        {
            id: 2,
            nome: "Cheque à Vista",
            valor: 300.00,
        },
        {
            id: 3,
            nome: "Cheque a Prazo",
            valor: 200.00,
        },
        {
            id: 4,
            nome: "Crediário",
            valor: 400.00,
        },
        {
            id: 5,
            nome: "Cartão de Crédito",
            valor: 600.00,
        },
        {
            id: 6,
            nome: "Cartão de Débito",
            valor: 350.00,
        },
        {
            id: 7,
            nome: "Convênio",
            valor: 150.00,
        },
        {
            id: 8,
            nome: "Financeira",
            valor: 200.00,
        },
        {
            id: 9,
            nome: "Saídas",
            valor: 1000.00
        }
    ];



    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())
    const [supp, setSupp] = useState('')
    const navigation = useNavigation()

    //abre o modal de opções
    const [modalOptions, setModalOptions] = useState(false)
    const date = new Date()

    const [openModal, setOpenModal] = useState(false)

    function FormatData(value) {
        const forma = format(value, 'dd/MM/yyyy')
        return forma;
    }

    //função menu presente no header da stack

    return (
        <C.Container>
            <C.Header>
                <Header dateStart={dateStart}
                    dateEnd={dateEnd}
                    setDateStart={setDateStart}
                    setDateEnd={setDateEnd}
                />

                <View style={{ width: 150 }}>
                    <TouchableOpacity
                        onPress={() => setOpenModal(true)}
                    >
                        <C.Status>
                            Aberto
                        </C.Status>
                    </TouchableOpacity>
                    <C.Cashier>Operador: Joanderson</C.Cashier>


                </View>

            </C.Header>
            <FlatList
                data={historicoDoCaixa}
                keyExtractor={(item, index) => item}
                renderItem={({ item }) =>
                    <RenderHistoric item={item} />
                }
                refreshControl={
                    <RefreshControl

                    />
                }
            />
            <View style={{ alignItems: 'center' }}>
                <A.ChekValue style={{ flexDirection: 'row' }}
                    onPress={() => setModalOptions(true)}
                >
                    <A.ChekText>
                        Saldo atual: R$450,00
                    </A.ChekText>

                </A.ChekValue>


            </View>

            {/*modalde opções*/}

            <Overlay overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)', borderWidth: 0 }} isVisible={modalOptions} onBackdropPress={() => setModalOptions(!modalOptions)}>
                <View style={{ width: 300, height: 100, gap: 10, justifyContent: 'center', }}>
                    <TouchableOpacity style={{ backgroundColor: "#e6e6e6", padding: 6, borderRadius: 6 }}>
                        <Text style={{ fontSize: 18, fontWeight: '500' }}>Relatório</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#e6e6e6", padding: 6, borderRadius: 6 }}
                        onPress={() => {
                            navigation.navigate('resume', { caixaState })
                            setModalOptions(false)
                        }}

                    >
                        <Text style={{ fontSize: 18, fontWeight: '500' }}>Resumo</Text>
                    </TouchableOpacity>
                </View>
            </Overlay>

            <Overlay
                isVisible={openModal}
                onBackdropPress={() => setOpenModal(!openModal)}
            >
                <C.ModalCash>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, justifyContent: 'center' }}>
                        <C.Title>Fechar Caixa</C.Title>
                        <C.Title>{FormatData(date)}</C.Title>
                    </View>


                    <Text style={{ fontSize: 16, marginTop: 10 }}>Valor disponivel no caixa: </Text>
                    <Text style={{ fontSize: 25, fontWeight: '700' }}>R$135,50</Text>
                    <Text style={{ fontSize: 18, marginTop: 10 }}>Sangria</Text>

                    <TextInputMask
                        style={{ width: 200, borderBottomColor: 'grey', borderBottomWidth: 1, fontSize: 20, textAlign: 'center', marginTop: 15 }}
                        type={'money'}
                        options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: 'R$',
                            suffixUnit: '',
                        }}
                        value={supp}
                        onChangeText={(text) => setSupp(text)}

                    />
                    <Button
                        title='Fechar Caixa'
                        buttonStyle={{ backgroundColor: Colors.orange, width: 200, marginTop: 20 }}
                    />
                </C.ModalCash>
            </Overlay>
        </C.Container>
    )
}