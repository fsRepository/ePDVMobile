import React, { Component, useState } from 'react';
import { View, Text, Image } from 'react-native';
import * as C from '../styles/globalStyles'
import Background from './../../../assets/Background.jpg'
import { Button, Input, CheckBox } from '@rneui/themed'
import Colors from './../../../assets/colors.json'
// import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';
import UserIcon from 'react-native-vector-icons/AntDesign'
import Logo from './../../../assets/logo.png'
import * as Animatable from 'react-native-animatable'

export default function Login() {


    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [remenber, setRemenber] = useState(false)
    const navigation = useNavigation()
    return (



        <C.ContainerLogin>
            <Animatable.Image
                animation="zoomInDown"
                duration={1000}
                source={Logo} style={{ width: 80, height: 80 }} />
            <Animatable.Text
                animation='zoomInUp'
                duration={1000}
                style={{ color: 'white', marginBottom: 10, fontSize: 16 }}>ePDV Smart</Animatable.Text>
            <C.TitleLogin>Login</C.TitleLogin>
            <C.ContentLogin>
                <C.Inputs>


                    <Input
                        placeholder="Usuário"
                        value={user}
                        rightIcon={
                            <UserIcon
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                        onChangeText={(text) => setUser(text)}
                        inputContainerStyle={{ borderBottomWidth: 0, width: 300, height: 40, backgroundColor: 'white', borderRadius: 10 }}
                    />
                    <Input
                        placeholder="Senha"
                        value={password}
                        rightIcon={
                            <UserIcon
                                name='lock'
                                size={24}
                                color='black'
                            />
                        }
                        onChangeText={(text) => setPassword(text)}
                        inputContainerStyle={{ borderBottomWidth: 0, width: 300, height: 40, backgroundColor: 'white', borderRadius: 10 }}

                        secureTextEntry={true}
                    />
                    <Button
                        onPress={() => { navigation.navigate('home') }}
                        title='Acessar'
                        titleStyle={{ color: Colors.orange }}
                        buttonStyle={{ width: 200, backgroundColor: 'white', }}
                    />
                </C.Inputs>



                <CheckBox
                    checked={remenber}
                    title='Lembrar meu usuário'
                    center
                    checkedColor='white'
                    onPress={() => setRemenber(!remenber)}
                    containerStyle={{ backgroundColor: 'transparent' }}
                    textStyle={{ color: 'white' }}

                />



            </C.ContentLogin>

        </C.ContainerLogin>
    )
}    