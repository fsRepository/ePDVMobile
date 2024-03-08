import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Dimensions } from 'react-native';
import Header from '../../components/header';
import ListMenu from '../../../assets/menuList.json'
import * as C from './../styles/globalStyles'
import Icon from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import Icon5 from 'react-native-vector-icons/Foundation'
import Colors from '../../../assets/colors.json'
import { Overlay, Input, Button } from '@rneui/themed';
// import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
export default function Home() {

    //quando for clicado em configurações abre o modal com autenticação
    const [open, setOpen] = useState(false)
    const [use, setUser] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    const toast = useToast()

    function Authentication() {
        setOpen(true)
        if (open === true) {
            if (use === '' && password === '') {
                toast.show('Preencha os campos vazios')
                console.log('')
            } else {

                navigation.navigate('settings')
                setOpen(false)
            }
        }

    }

    //pega a largura do celular , se a largura for maior ou igual a 700, siginifa que e um tablet, entao ele ira  mostrar 4 itens do menu em uma linha
    const width = Dimensions.get("window").width;
    console.log('width tablet', width)
    //função que renderiza o menu
    function RenderMenu({ item }) {

        return (
            <C.contentMenu
                onPress={() => {

                    if (item.title === 'Configurações') {
                        setOpen(true)
                    } else {
                        navigation.navigate(item.route)
                    }
                }
                }

            >
                {item.icon === 'shopping-cart' || item.icon === 'settings' || item.icon === 'users' ?
                    <Icon name={item.icon} size={40} color="#4A4F54" /> : item.icon === 'cash-register' ?
                        <Icon2 name={item.icon} size={40} color="#4A4F54" /> : item.icon === 'shop' ?
                            <Icon3 name={item.icon} size={40} color="#4A4F54" /> : item.icon === 'users' ?
                                <Icon4 name={item.icon} size={40} color="#4A4F54" /> : item.icon === 'clipboard-notes' ?
                                    <Icon5 name={item.icon} size={40} color="#4A4F54" /> : ''

                }

                <C.labelMenu>{item.title}</C.labelMenu>
            </C.contentMenu>
        )
    }
    return (


        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <FlatList

                numColumns={width >= 700 ? 4 : 2}
                data={ListMenu}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => <RenderMenu item={item} />}
            />

            <Overlay
                isVisible={open}
                onBackdropPress={() => setOpen(!open)}
            >
                <View style={{ width: 300, height: 150 }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', textAlign: 'center' }}>Acesso Restrito</Text>

                    <Input
                        placeholder='Senha de acesso'
                        value={password}
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Button
                        onPress={Authentication}
                        title='Autenticar'
                    />
                </View>
            </Overlay>
        </SafeAreaView>

    )
}