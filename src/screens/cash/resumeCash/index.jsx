import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import * as C from './../styles'
import Header from '../../../components/headerDate';
import { useRoute } from '@react-navigation/native';
import MoneyIcon2 from 'react-native-vector-icons/FontAwesome6'
import MoneyIcon from 'react-native-vector-icons/FontAwesome5'
import CardIcon from 'react-native-vector-icons/Entypo'
import RealIcon from 'react-native-vector-icons/FontAwesome6'
import PixIcon from 'react-native-vector-icons/MaterialIcons'
// import { Container } from './styles';

export default function ResumeCash() {
    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())
    const route = useRoute()
    const { caixaState } = route.params
    console.log(caixaState)

    function Render({ item }) {
        return (
            <View style={{
                alignItems: 'center', marginTop: 10, gap: 5, backgroundColor: 'white', padding: 6, marginRight: 10, flexDirection: 'row',
                justifyContent: 'space-between'
            }}>


                <Text style={{ fontSize: 18, fontWeight: '500', color: 'grey' }}>{item.nome}</Text>
                <C.MoneyText >R${item.valor}</C.MoneyText>
            </View>

        )
    }
    return (
        <C.ResumeContainer>
            <C.Header>
                <Header dateStart={dateStart}
                    dateEnd={dateEnd}
                    setDateStart={setDateStart}
                    setDateEnd={setDateEnd}
                />

                <View style={{ width: 150 }}>

                    <C.Cashier>Operador: Joanderson</C.Cashier>


                </View>

            </C.Header>
            <View>
                <C.Title style={{ marginTop: 10 }}>Vendas</C.Title>
                <FlatList


                    data={caixaState}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) => <Render item={item} />}

                />

            </View>
        </C.ResumeContainer>
    )
}