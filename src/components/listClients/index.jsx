import { Overlay } from '@rneui/themed';
import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import OverlaySeller from '../overlaySellers';
import * as C from './../../screens/Clients/clients/styles'

// import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';
import { contextAuth } from '../../context';

export default function RenderClients({ item, type, name,
    setName,
    password,
    setPassword,
    ativo,
    setAtivo,
    inativo,
    setInativo,
    itemSelected,
    type2
}) {
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState('')
    const { clientSelected, setClientSelected } = useContext(contextAuth)
    const navigation = useNavigation()
    return (
        type === 'sellers' ?

            <C.ListSellers
                onPress={
                    () => {
                        setVisible(true)
                        setSelected(item)
                    }
                }
            >
                <C.ItemText>00{item.codigo}</C.ItemText>
                <C.ItemText>{item.nome}</C.ItemText>

                <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                    <OverlaySeller
                        name={name}
                        setName={setName}
                        password={password}
                        setPassword={setPassword}
                        ativo={ativo}
                        setAtivo={setAtivo}
                        inativo={inativo}
                        setInativo={setInativo}

                        itemSelected={selected} />
                </Overlay>
            </C.ListSellers> :
            <C.List

                onPress={() => {
                    if (type2) {
                        setClientSelected(item);
                        navigation.navigate('confirm');
                    } else {
                        navigation.navigate('addclient', { item });
                    }
                }}
            >
                <C.ItemText>00{item.codigo}</C.ItemText>
                <C.ItemText>{item.nome}</C.ItemText>
                <C.ItemText>{item.cnpj}</C.ItemText>

            </C.List>




    )
}