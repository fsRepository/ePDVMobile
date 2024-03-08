import { CheckBox, FAB, Input } from '@rneui/themed';
import React, { useState, useContext } from 'react';
import { contextAuth } from '../../../context';
import { View, Text } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import IconChek from 'react-native-vector-icons/AntDesign'
import * as C from '../styles'
import Colors from '../../../../assets/colors.json'
import { useToast } from "react-native-toast-notifications";

// import { Container } from './styles';
export default function PixScreen() {

    const [name, setName] = useState('')
    const [pix, setPix] = useState('')
    const [typePix, setTypePix] = useState(false)
    const [email, setEmail] = useState(false)
    const [cnpj, setCNPJ] = useState(false)
    const toast = useToast()
    const { serie,
        setSerie,
        idToken,
        setIdToken,
        tokenCSC,
        setTokenCSC,
        password,
        setPassword,
        dateValid,
        setDateValid,
        uf, setUf,
        df,
        setDf,
        http,
        setHttp,
        xml,
        setXml,
        ssLib,
        setSsLib,
        cript,
        setCript,
        sslType,
        setSslType,
        producao,
        setProducao,
        setHomologacao,
        homologacao } = useContext(contextAuth)

    //essa screen vai verificar se todos os campos das ´paginas anteriores foram preenchidos, e so vai deixar o usuario salvar
    //as configurações se tiver prrenchido tudo


    function setConfigure() {
        if (serie !== '' && idToken !== '' &&
            tokenCSC !== '' && password !== '' &&
            dateValid !== '' && df !== '' &&
            setDf !== '' && http !== '' && xml !== '' && ssLib !== '' && cript !== '' && sslType !== '' &&
            producao !== '' && homologacao !== '') {
            console.log('pegou')

        } else {
            console.log('preencha os campos vazios')
            toast.show('Preencha os campos vazios')

        }
    }

    return (
        <C.ContainerView>
            <Input
                label='Nome'
                value={name}
                onChangeText={text => setName(text)}

            />

            <C.Label>Chave Pix</C.Label>

            <C.ContainerChekBox>
                <CheckBox
                    title='CNPJ'
                    checked={cnpj}
                    onPress={() => {
                        setCNPJ(true)
                        setEmail(false)
                        setTypePix(true)
                    }



                    }
                />
                <CheckBox
                    title='Email'
                    checked={email}
                    onPress={() => {
                        setCNPJ(false)
                        setEmail(true)
                        setTypePix(true)
                    }}
                />


            </C.ContainerChekBox>

            {
                cnpj === true ?
                    <TextInputMask
                        type='cnpj'
                        value={pix}
                        onChangeText={(text) => setPix(text)}
                        style={{ width: 380, borderBottomWidth: 1, fontSize: 16, marginTop: 10, marginStart: 10, marginEnd: 10 }}
                    />
                    :
                    <Input
                        value={pix}
                        onChangeText={(text) => setPix(text)}
                        containerStyle={{ width: 400 }}
                        inputStyle={{ fontSize: 1, borderBottomWidth: 0, width: 400 }}
                    />



            }

            {/**
            * 
            * {
                serie !== '' && idToken !== '' &&
                    tokenCSC !== '' && password !== '' &&
                    dateValid !== '' && destiny !== '' && df !== '' &&
                    setDf !== '' && http !== '' && xml !== '' && ssLib !== '' && cript !== '' && sslType !== '' &&
                    producao !== '' && homologacao !== '' ?
                   
                    : ''
            */}

            <View style={{ position: 'absolute', right: 0, left: 0, bottom: 30 }}>
                <FAB
                    onPress={setConfigure}
                    icon={<IconChek name='check' size={26} color='white' />}
                    color={Colors.orange}
                />

            </View>

        </C.ContainerView>
    )
}