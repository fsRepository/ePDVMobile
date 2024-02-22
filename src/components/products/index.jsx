import React from 'react';
import { View, Text } from 'react-native';
import * as C from './../../screens/sell/styles'

// import { Container } from './styles';

export default function ProductsList({ item, setSelected, type }) {
    return (
        <C.Products
            onPress={() => setSelected(item)}
        >
            <View>
                <C.ProductText>{item.nome}</C.ProductText>
                <C.Codigo>{item.codigoDeBarras}</C.Codigo>

            </View>
            <View>
                <C.Value>R${item.valor}</C.Value>
            </View>
        </C.Products>
    )
}