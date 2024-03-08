import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated } from 'react-native';
import { Overlay, Input, Button } from '@rneui/themed';
import * as C from '../sell/styles'
import BagIcon from 'react-native-vector-icons/Entypo'
import { contextAuth } from '../../context/index';
import CarIcon from 'react-native-vector-icons/Fontisto'
// import { Container } from './styles';
import Colors from '../../../assets/colors.json'
import { useToast } from 'react-native-toast-notifications';
export default function Checkout() {


    const [itemSelected, setItemSelected] = useState([])
    const [visible, setVisible] = useState(false);
    const [openOverlay, setOpenOverlay] = useState(false)
    const [quant, setQuant] = useState('')
    const [update, setUpdate] = useState(false)
    const [width, setWidth] = useState(new Animated.Value(350));
    const [height, setHeight] = useState(new Animated.Value(45));
    const [ok, setOk] = useState(false)
    const navigation = useNavigation()
    const { checkout, totalValue, setCheckout, setTotalItems, setTotalValue, totalItems } = useContext(contextAuth);


    //const toast para messages
    const toast = useToast()

    //função para animar o tab
    useEffect(() => {
        const animateIn = Animated.timing(
            width,
            {
                toValue: 380,
                duration: 50,
                delay: 50,
                useNativeDriver: false
            }
        );

        const animateOut = Animated.timing(
            width,
            {
                toValue: 350,
                duration: 50,
                delay: 50,
                useNativeDriver: false
            }
        );

        const animateInHei = Animated.timing(
            height,
            {
                toValue: 50,
                duration: 50,
                delay: 50,
                useNativeDriver: false
            }
        );

        const animateOutHei = Animated.timing(
            height,
            {
                toValue: 45,
                duration: 50,
                delay: 50,
                useNativeDriver: false
            }
        );

        const sequenceWidth = Animated.sequence([animateIn, animateOut]);
        const sequenceHeight = Animated.sequence([animateInHei, animateOutHei]);

        sequenceWidth.start(() => {
            // Após a conclusão da animação de largura, inicie a animação de altura
            sequenceHeight.start(() => {
                // Função de callback chamada após a conclusão da sequência de animação de altura
                console.log('Animação de altura concluída');
            });
        });
    }, [checkout, ok]);


    /// altera  qauntidade e valor no item
    function AlterData() {
        if (quant !== '' && itemSelected) {
            const index1 = checkout.findIndex(item => item.codigoDeBarras === itemSelected.codigoDeBarras);
            if (index1 !== -1) {
                setCheckout(prevCheckout => {
                    const newCheckout = [...prevCheckout];
                    newCheckout[index1].quantidade = parseInt(quant);
                    newCheckout[index1].valor = newCheckout[index1].quantidade * newCheckout[index1].valorUnitario;
                    setUpdate(!update)
                    return newCheckout;

                });
            }
            setOpenOverlay(false);


        }
    }

    //função para excluir um item do carrinho
    function DeleteItemData() {

        //recebe o codigodeBarras ou id daquele produto adicionado no carrinho, e exclui do carrinho
        const remove = checkout.findIndex((item) => item.codigoDeBarras === itemSelected.codigoDeBarras);
        console.log(remove)
        if (remove !== -1) {
            checkout.splice(remove, 1);
            console.log('item removido', itemSelected)
            console.log(checkout)
            setItemSelected('')
            setUpdate(!update)

        } else {
            console.log('item não encontrado no carrinho')
        }
    }


    //sempre que remove um item do carrinho, essa funcao e acionada, para calcular o valor total e quantidade de itens

    function UpdateValues() {
        console.log('atualizando valor')
        const totalValue = checkout.reduce((acc, currenty) => {
            return acc + currenty.valor;
        }, 0)
        console.log('valor atualizado', totalValue)
        setTotalValue(totalValue.toFixed(2))
    }

    // function Update() // altera a quantidade de itens
    function Update() {
        const totalItems = checkout.reduce((acc, currentItens) => {
            return acc + currentItens.quantidade;
        }, 0)
        setTotalItems(totalItems)
    }


    useEffect(() => {
        UpdateValues()
        Update()

    }, [update,])

    function RenderList({ item }) {




        return (
            <View >


                <C.ProductCheckout

                    onPress={() => {
                        setItemSelected(item)
                        setVisible(!visible)
                        setQuant(item.quantidade
                        )

                    }}
                >

                    <View>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <C.ProductText>{item.quantidade}x</C.ProductText>
                            <C.ProductText>{item.nome}</C.ProductText>


                        </View>
                        <Text> Valor Unitário: R${item.valorUnitario}</Text>
                    </View>
                    <View>
                        <C.Value>R${item.valor.toFixed(2)}</C.Value>
                    </View>

                </C.ProductCheckout>
                {
                    item === itemSelected && visible ?
                        <C.Review>
                            <TouchableOpacity
                                onPress={() => {
                                    setOpenOverlay(!openOverlay)

                                }}
                                style={{ alignItems: 'center' }}>
                                <BagIcon name='shopping-bag' size={24} color="grey" />
                                <Text style={{ fontSize: 16, fontWeight: '500' }}>{itemSelected.quantidade} itens</Text>
                            </TouchableOpacity>
                            <View style={{ backgroundColor: 'grey', width: 1, height: '100%' }}></View>
                            <TouchableOpacity style={{ alignItems: 'center' }}
                                onPress={DeleteItemData}
                            >
                                <BagIcon name='trash' size={24} color="grey" />
                                <Text style={{ fontSize: 16, fontWeight: '500', color: 'red' }}>Exluir</Text>
                            </TouchableOpacity>



                        </C.Review>
                        : ''
                }

            </View>

        )
    }
    return (
        <C.Container

        >

            <FlatList
                showsVerticalScrollIndicator={false}
                data={checkout}
                keyExtractor={(item, index) => item.codigoDeBarras}
                renderItem={({ item }) =>
                    <RenderList item={item} />
                }

            />

            <Overlay
                isVisible={openOverlay}
                onBackdropPress={() => setOpenOverlay(!openOverlay)}
            >

                <View style={{ alignItems: 'center' }}>
                    <C.Title>Alterar Quantidade</C.Title>
                    <Input
                        value={quant}
                        onChangeText={(text) => setQuant(text)}
                        keyboardType='numeric'
                        placeholder={`${itemSelected.quantidade}`}
                        inputStyle={{ width: 300, fontSize: 30, textAlign: 'center' }}
                        containerStyle={{ width: 300, marginTop: 20 }}
                    />
                    <View>
                        <Button
                            onPress={AlterData}
                            title='Confirmar'
                            buttonStyle={{ backgroundColor: 'green', width: 200, borderRadius: 6 }}
                        />
                    </View>
                </View>


            </Overlay>
            <TouchableOpacity style={{ marginBottom: 70, flexDirection: 'row', alignItems: 'center', gap: 10 }}
                onPress={() => {
                    setCheckout([])

                }}

            >
                <CarIcon name='shopping-basket-remove' size={24} color={Colors.orange} />
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Esvaziar carrinho</Text>
            </TouchableOpacity>


            <Animated.View
                style={{
                    backgroundColor: Colors.orange,
                    position: 'absolute',
                    height: height,
                    width: width,
                    bottom: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,

                }}

            >


                <TouchableOpacity

                    onPress={() => {
                        if (checkout.length === 0) {
                            console.log('Você ainda não tem nada no carrinho')
                            toast.show('Ainda não tem nada no carrinho')
                        } else {
                            navigation.navigate('confirm')
                        }

                    }}>
                    <C.ChekText>
                        {totalItems} itens = R${totalValue}
                    </C.ChekText>
                </TouchableOpacity>


            </Animated.View>


        </C.Container>
    )
}