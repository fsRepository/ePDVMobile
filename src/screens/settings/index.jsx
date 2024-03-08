import { Button, Input, Overlay } from '@rneui/themed';
import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import * as C from './styles'
import { contextAuth } from '../../context';
// import { Container } from './styles';

export default function Settings() {
    const { serie,
        setSerie,
        idToken,
        setIdToken,
        tokenCSC,
        setTokenCSC,
        password,
        setPassword,
        dateValid,
        setDateValid } = useContext(contextAuth)

    const [openModal, setOpenModal] = useState(false)
    return (
        <C.Container>
            <Input
                label='Número de Série'
                value={serie}
                onChangeText={(text) => setSerie(text)}
            />
            <Input
                label='ID Token'
                value={idToken}
                onChangeText={(text) => setIdToken(text)}
            />
            <Input
                label='Token/CSC'
                value={tokenCSC}
                onChangeText={(text) => setTokenCSC(text)}
            />
            <Input
                label='Senha'
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Input
                label='Data de Validade'
                value={dateValid}
                onChangeText={(text) => setDateValid(text)}
            />

        </C.Container>
    )
}