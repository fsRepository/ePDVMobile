import { Button, Input, TabView, Tab } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Dimensions, Keyboard, TouchableWithoutFeedback, ActivityIndicator, ScrollView } from 'react-native';
import User from 'react-native-vector-icons/FontAwesome5'
import * as C from './styles'
import Colors from './../../../../assets/colors.json'
import IconLocation from 'react-native-vector-icons/Entypo'
// import { Container } from './styles';
import { TextInputMask } from 'react-native-masked-text';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import ChekIcon from 'react-native-vector-icons/AntDesign'

export default function AddClient() {
    const [name, setName] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [email, setEmail] = useState('')
    const [codigo, setCodigo] = useState('')
    const [type, setType] = useState("")
    const [situation, setSituation] = useState('')
    const [endereco, setEndereco] = useState("")
    const [district, setDistrict] = useState("")
    const [number, setNumber] = useState("")
    const [cep, setCep] = useState("")
    const [complement, setComplement] = useState("")
    const [city, setCity] = useState("")
    const [uf, setUf] = useState("")


    //const para controlar o carregamento da tela
    const [loading, setLoading] = useState(false)
    //pega os dados do cliente pela navegacao
    const rout = useRoute()


    //verifica se tem algum item

    useEffect(() => {

        if (rout && rout.params && rout.params.item) {

            const { item } = rout.params;
            console.log(item)
            setName(item.nome)
            setCnpj(item.cnpj)
            setType(item.tipoPessoa)
            setSituation(item.situacao)
            setEndereco(item.endereco)
            setDistrict(item.bairro)
            setCity(item.cidade)
            setUf(item.uf)


        } else {
            console.log('nao tem nenhum item selecionado')
        }

    }, [])


    //api pra buscar o estado e cidade atraves do cep

    //https://viacep.com.br/ws/57200000/json/

    function CloseTeclado() {
        Keyboard.dismiss()
    }

    //correção abertura do tabview no iphone 
    const [indicatorX, setIndicatorX] = useState(0);
    const windowWidth = Dimensions.get('window').width;
    const tabWidth = windowWidth / 2; // Specify your tabs amount

    const toast = useToast()
    //salva o cliente e envia pro banco de dados
    //quando realizar a função , preciso enviar pro contexto. pra poder recuperar o client na tela de pagamento

    //const que controla a tab view
    const [index, setIndex] = useState(0)

    //função para registrar um novo cliente

    async function RegisterClient() {
        if (name !== '' && email !== '' && cnpj !== '') {
            toast.show('Cliente cadastrado'), {
                type: "success"
            }

        } else {
            toast.show('Preencha os campos vazios')
            console.log('Preencha os campos vazios')
        }
    }



    //quando o usuario digita o cep,  ele pega as informações da api e preenche cidade e estado

    useEffect(() => {
        if (cep !== '') {
            const response = axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then((res) => {
                    console.log(res.data)
                    setCity(res.data.localidade)
                    setUf(res.data.uf)
                })
                .catch((error) => {
                    console.log(error)
                })

        }


    }, [cep])
    return (
        <C.Container>


            <Tab
                containerStyle={{ backgroundColor: Colors.orange }}
                value={index}
                onChange={e => {
                    setIndex(e); // Whatever you do here
                    setIndicatorX(e * tabWidth); // Setting the right translateX value
                }}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                    transform: [{ translateX: indicatorX }]
                }}
                variant="primary"
            >
                <Tab.Item

                    title='Dados'

                />
                <Tab.Item

                    title='Endereço'

                />
            </Tab>
            <TabView value={index} onChange={setIndex}
                animationType='spring'
            >
                <TabView.Item style={{ width: '100%', alignItems: "center" }}>

                    <TouchableWithoutFeedback onPress={CloseTeclado}>


                        <C.Page >

                            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                                <View >
                                    <User name='user-circle' size={80} color='grey' />
                                </View>
                                <C.Text>Adicionar Cliente</C.Text>
                                <Input
                                    inputStyle={{ width: 350, borderBottomWidth: 1, borderColor: 'grey' }}
                                    containerStyle={{ width: 350 }}
                                    placeholder='Nome'
                                    value={name}
                                    onChangeText={(text) => setName(text)}
                                />


                                <TextInputMask
                                    style={{ width: 330, borderBottomWidth: 1, borderColor: 'black', fontSize: 18, marginBottom: 10 }}
                                    type={'cnpj'}
                                    value={cnpj}
                                    onChangeText={(text) => setCnpj(text)}
                                    placeholder='CNPJ'


                                />
                                <Input
                                    containerStyle={{ width: 350 }}
                                    inputStyle={{ width: 350, borderBottomWidth: 1, borderColor: 'grey' }}
                                    placeholder='Email'
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                />
                                <Input
                                    containerStyle={{ width: 350 }}
                                    inputStyle={{ width: 350, borderBottomWidth: 1, borderColor: 'grey' }}
                                    placeholder='Tipo de Pessoa'
                                    value={type}
                                    onChangeText={(text) => setType(text)}
                                />
                                <Input
                                    containerStyle={{ width: 350 }}
                                    inputStyle={{ width: 350, borderBottomWidth: 1, borderColor: 'grey' }}
                                    placeholder='Situação'
                                    value={situation}
                                    onChangeText={(text) => setSituation(text)}
                                />

                            </ScrollView>
                        </C.Page>
                    </TouchableWithoutFeedback>
                </TabView.Item>
                <TabView.Item style={{ width: '100%', alignItems: "center" }}>



                    <C.Page >
                        <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>

                            <View >
                                <IconLocation name='location' size={80} color='grey' />
                            </View>
                            <C.Text>Adicionar Endereço</C.Text>
                            <Input
                                inputStyle={{ width: 350, borderBottomWidth: 1, borderColor: 'grey' }}
                                containerStyle={{ width: 350 }}
                                placeholder='Endereço'
                                value={endereco}
                                onChangeText={(text) => setEndereco(text)}
                            />



                            <Input
                                containerStyle={{ width: 350 }}
                                inputStyle={{ width: 350, borderBottomWidth: 1, borderColor: 'grey' }}
                                placeholder='Bairro'
                                value={district}
                                onChangeText={(text) => setDistrict(text)}
                            />
                            <Input
                                containerStyle={{ width: 350 }}
                                inputStyle={{ width: 350, borderBottomWidth: 1, borderColor: 'grey' }}
                                placeholder='Numero'
                                value={number}
                                onChangeText={(text) => setNumber(text)}
                            />
                            <Input
                                containerStyle={{ width: 350 }}
                                inputStyle={{ width: 350, borderBottomWidth: 1, borderColor: 'grey' }}
                                placeholder='Complemento'
                                value={complement}
                                onChangeText={(text) => setComplement(text)}
                            />
                            <Input
                                containerStyle={{ width: 350 }}
                                inputStyle={{ width: 350, borderBottomWidth: 1, borderColor: 'grey' }}
                                placeholder='CEP'
                                value={cep}
                                keyboardType='numeric'
                                onChangeText={(text) => setCep(text)}
                            />

                            <Input
                                containerStyle={{ width: 350 }}
                                inputStyle={{ width: 350, borderBottomWidth: 1, borderColor: 'grey' }}
                                placeholder='Cidade'
                                value={city}
                                onChangeText={(text) => setCity(text)}
                            />
                            <Input
                                containerStyle={{ width: 350 }}
                                inputStyle={{ width: 350, borderBottomWidth: 1, borderColor: 'grey' }}
                                placeholder='Estado'
                                value={uf}
                                onChangeText={(text) => setUf(text)}
                            />

                            <Button
                                onPress={RegisterClient}
                                title='Cadastrar Cliente'
                                style={{ width: 200, borderRadius: 6 }}
                                color={Colors.orange}
                            />
                        </ScrollView>
                        <View style={{ position: 'absolute', left: 0, right: 0, bottom: -150 }}>
                            <FAB
                                color={Colors.orange}
                                icon={<ChekIcon name='check' color='white' size={24} />}
                            />

                        </View>
                    </C.Page>

                </TabView.Item>
            </TabView>

        </C.Container>
    )
}