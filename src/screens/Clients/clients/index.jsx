import { Button, FAB, Input, SearchBar } from '@rneui/themed';
import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import HeaderFilter from '../../../components/headerFilter';
import IconFilter from 'react-native-vector-icons/AntDesign'
import * as C from './styles'
import RenderClients from '../../../components/listClients';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Add from 'react-native-vector-icons/Ionicons'
import Colors from '../../../../assets/colors.json'
import { useNavigation, useRoute } from '@react-navigation/native';
// import { Container } from './styles';

export default function Clients() {
    const [selectedFilter, setSelectedFilter] = useState('Nome')
    const [visible, setVisible] = useState(false)
    const navigation = useNavigation();
    const route = useRoute()
    const type = route.params ? route.params.type : null

    //banco de clientes producao 
    const clientes = [
        {
            nome: "Cliente 1",
            cnpj: "12345678901234",
            codigo: 1,
            tipoPessoa: "Jurídica",
            situacao: "Ativo",
            endereco: "Rua A, 123",
            bairro: "Centro",
            cep: "12345-678",
            complemento: "Sala 101",
            cidade: "Cidade A",
            uf: "UF1"
        },
        {
            nome: "Cliente 2",
            cnpj: "23456789012345",
            codigo: 2,
            tipoPessoa: "Física",
            situacao: "Inativo",
            endereco: "Avenida B, 456",
            bairro: "Bairro B",
            cep: "54321-876",
            complemento: "",
            cidade: "Cidade B",
            uf: "UF2"
        },
        {
            nome: "Cliente 3",
            cnpj: "34567890123456",
            codigo: 3,
            tipoPessoa: "Jurídica",
            situacao: "Ativo",
            endereco: "Rua C, 789",
            bairro: "Bairro C",
            cep: "98765-432",
            complemento: "Loja 02",
            cidade: "Cidade C",
            uf: "UF3"
        },
        {
            nome: "Cliente 4",
            cnpj: "45678901234567",
            codigo: 4,
            tipoPessoa: "Física",
            situacao: "Inativo",
            endereco: "Avenida D, 101",
            bairro: "Bairro D",
            cep: "13579-246",
            complemento: "Fundos",
            cidade: "Cidade D",
            uf: "UF4"
        },
        {
            nome: "Cliente 5",
            cnpj: "56789012345678",
            codigo: 5,
            tipoPessoa: "Jurídica",
            situacao: "Ativo",
            endereco: "Rua E, 111",
            bairro: "Bairro E",
            cep: "54321-987",
            complemento: "",
            cidade: "Cidade E",
            uf: "UF5"
        },
        {
            nome: "Cliente 6",
            cnpj: "67890123456789",
            codigo: 6,
            tipoPessoa: "Física",
            situacao: "Ativo",
            endereco: "Avenida F, 222",
            bairro: "Bairro F",
            cep: "76543-210",
            complemento: "Apto 301",
            cidade: "Cidade F",
            uf: "UF6"
        }
    ];


    return (
        <C.Container>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <Input
                    placeholder='Buscar Clientes'
                    inputStyle={{ width: 350, backgroundColor: 'white', borderRadius: 10 }}
                    inputContainerStyle={{ width: 350, height: 40, borderBottomWidth: 0 }}
                    rightIcon={
                        <IconFilter
                            onPress={() => setVisible(!visible)}
                            name='filter' size={24} style={{ marginLeft: 10 }} color={Colors.orange} />}

                />



            </View>

            {
                visible ?
                    <HeaderFilter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} /> : ''
            }

            <C.TopList>
                <Text style={{ fontSize: 16 }} >Código</Text>
                <Text style={{ fontSize: 16 }}>Nome</Text>
                <Text style={{ fontSize: 16 }}>CPF/CNPJ</Text>
            </C.TopList>

            <FlatList

                keyExtractor={(item, index) => item.codigo}
                data={clientes}
                renderItem={({ item }) =>
                    <RenderClients item={item} type2={type} />
                }
            />
            {type ?
                '' :

                <FAB
                    onPress={() => navigation.navigate('addclient')}
                    style={{ bottom: 20 }}
                    color={Colors.orange}
                    icon={<Add name='add' size={24} color='white' />}
                />
            }



        </C.Container>
    )
}