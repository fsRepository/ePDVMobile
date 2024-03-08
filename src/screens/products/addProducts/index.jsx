import { Button, FAB, Input, Tab, TabView } from '@rneui/themed';
import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/Fontisto'
import * as C from './../styles'
import Colors from '../../../../assets/colors.json'
import DropDownPicker from 'react-native-dropdown-picker';
import CamIcon from 'react-native-vector-icons/Entypo'
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ChekIcon from 'react-native-vector-icons/AntDesign'
import { useToast } from 'react-native-toast-notifications';

import { CameraView } from 'expo-camera/next';

export default function AddProducts() {
    const [product, setProduct] = useState('')
    const [value, setValue] = useState('')
    const [valueSell, setValueSell] = useState('')
    const [code, setCode] = useState('')
    const [stock, setStock] = useState('')
    const [group, setGroup] = useState('')
    const [index, setIndex] = useState(0)
    const groups = ['Limpeza', 'Doces', 'Fitness', 'Eletrônicos', 'Roupas', 'Acessórios'];

    //controle do picker abertura
    const [opencst, setOpencst] = useState(false)
    const [openSt, setOpenSt] = useState(false)
    const [iat, setIat] = useState(false)
    const [ippt, setIppt] = useState(false)
    const [csosn, setCsosn] = useState(false)
    const [ncm, setNcm] = useState(false)
    const [openIcms, setOpenIcms] = useState(false)

    const [selectedCst, setSelectedCst] = useState('')
    const [selectedSt, setSelectedSt] = useState('')
    const [selectedIat, setSelectedIat] = useState('')
    const [selectedIppt, setSelectedIppt] = useState('')
    const [selectedIcms, setSelectedIcms] = useState('')
    const [selectedCsosn, setSelectedCsosn] = useState('')
    const [selectedNcm, setSelectedNcm] = useState('')

    //consts relacionadas ao uso da camera para ler codigo de barras
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [open, setOpen] = useState(false)
    const [scanned, setScanned] = useState(false)
    const toast = useToast()
    const CST = {
        ICMS: {
            INTERNA: '00',
            INTERESTADUAL_PARA_NORTE_NORDESTE: '10',
            INTERESTADUAL: '20',
            IMPORTACAO: '60',
            ISSENTO: '40',
            OUTRAS: '90',
            RECOLHIMENTO: '51',
            DIFERIMENTO: '60'
        },
        PIS: {
            OPERACAO_TRIBUTAVEL: '01',
            OPERACAO_COM_SUSPENSAO: '02',
            OPERACAO_ALIQUOTA_ZERO: '03',
            OPERACAO_NAO_INCIDENCIA: '04',
            OPERACAO_SUSPENSAO_CUMULATIVA: '05',
            OPERACAO_SUSPENSAO_NAO_CUMULATIVA: '06',
            OPERACAO_MONOFASICA_ALIQUOTA_ZERO: '07'
        },
        COFINS: {
            // Códigos de COFINS aqui
        }
        // Adicione outros tipos de impostos conforme necessário
    };

    const items = [];

    for (const tipoImposto in CST) {
        if (Object.hasOwnProperty.call(CST, tipoImposto)) {
            const subTiposImposto = CST[tipoImposto];
            for (const subTipo in subTiposImposto) {
                if (Object.hasOwnProperty.call(subTiposImposto, subTipo)) {
                    items.push({
                        label: `${tipoImposto} - ${subTipo}`,
                        value: subTiposImposto[subTipo]
                    });
                }
            }
        }
    }




    //função pra abrir a câmera e ler o código de barras
    async function OpenCam() {


        const { status } = await Camera.requestCameraPermissionsAsync()
        setHasPermission(status === "granted");

        setOpen(true)
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setCode(data)
        setOpen(false)
    };


    // função pra adicionar produto

    async function SaveProduct() {
        if (product !== '' && value !== '' && valueSell !== '' && code !== '' && stock !== '' && group !== '') {
            toast.show('Produto adicionado com sucesso', { type: 'success', placement: 'top' })
        } else {
            toast.show('Preencha os campos vazios', { placement: 'top' })
        }
    }

    return (


        <SafeAreaView style={{ flex: 1 }}>

            <SafeAreaView >
                {open ?
                    <View style={{ width: '100%', height: 1000 }}>
                        <CameraView

                            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                            barcodeScannerSettings={{
                                barcodeTypes: ['codabar', 'ean13', 'ean8'],
                            }}
                            style={{ width: 500, height: 600, justifyContent: 'center', }}
                        >


                            <Text style={{ color: 'white', left: 20, marginBottom: 200, fontSize: 18 }}>Posicione o código de barras na marcação</Text>

                            <View style={{
                                width: 350, height: 100, borderWidth: 1, borderColor: 'white', alignItems: 'center', justifyContent: 'center',
                                position: 'absolute', left: 20
                            }}>


                            </View>
                        </CameraView>
                        {scanned && (
                            <Button title={"Ler novamente"} onPress={() => setScanned(false)} />
                        )}
                    </View>
                    : ''
                }

            </SafeAreaView>



            <Tab
                containerStyle={{ backgroundColor: Colors.orange }}
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3
                }}
                variant='primary'
            >
                <Tab.Item

                    title='Novo Produto'
                />
                <Tab.Item
                    title='Tributação'
                />
            </Tab>
            <TabView value={index} onChange={setIndex}
                animationType='spring'
            >
                <TabView.Item style={{ width: '100%' }}>

                    <View>
                        <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                            <View style={{ alignItems: "center", marginBottom: 10, marginTop: 10, }}>
                                <Icon name='shopping-store' size={70} color='grey' />
                                <C.Text>Adicionar produto</C.Text>
                            </View>



                            <C.Content>

                                <Input
                                    placeholder='Produto'
                                    inputStyle={{ borderBottomColor: 'grey', fontSize: 20 }}
                                    containerStyle={{ width: 380, }}
                                    value={product}
                                    onChangeText={(text) => setProduct(text)}
                                />


                                <TextInputMask
                                    placeholder='Valor de custo'
                                    value={value}
                                    onChangeText={(text) => setValue(text)}
                                    style={{ width: 360, borderBottomColor: 'grey', borderBottomWidth: 1, fontSize: 20, alignItems: 'center' }}
                                    type={'money'}
                                    options={{
                                        precision: 2,
                                        separator: ',',
                                        delimiter: '.',
                                        unit: 'R$',
                                        suffixUnit: '',
                                    }}

                                />
                                <TextInputMask
                                    placeholder='Valor de venda'
                                    value={valueSell}
                                    onChangeText={(text) => setValueSell(text)}
                                    style={{ width: 360, borderBottomColor: 'grey', borderBottomWidth: 1, fontSize: 20, alignItems: 'center', marginTop: 20 }}
                                    type={'money'}
                                    options={{
                                        precision: 2,
                                        separator: ',',
                                        delimiter: '.',
                                        unit: 'R$',
                                        suffixUnit: '',
                                    }}

                                />

                                <Input
                                    placeholder='Código de barras'
                                    inputStyle={{ borderBottomColor: 'grey', fontSize: 20, marginTop: 10 }}
                                    containerStyle={{ width: 380, }}
                                    value={code}
                                    onChangeText={(text) => setCode(text)}
                                    rightIcon={
                                        <TouchableOpacity
                                            onPress={OpenCam}
                                        >
                                            <CamIcon name='camera' size={24} color='grey' />
                                        </TouchableOpacity>
                                    }
                                />
                                <Input
                                    placeholder='Estoque'
                                    inputStyle={{ borderBottomColor: 'grey', fontSize: 20, }}
                                    containerStyle={{ width: 380, }}
                                    keyboardType='numeric'
                                    value={stock}
                                    onChangeText={(text) => setStock(text)}
                                />
                                <C.Label>Selecionar grupo</C.Label>

                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                >


                                    {groups.map((item, index) => (



                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                setGroup(item);
                                                console.log(item); // Remova isso se não for necessário
                                            }}
                                            style={{
                                                backgroundColor: group === item ? 'grey' : '#e6e6e6',
                                                paddingVertical: 10,
                                                paddingHorizontal: 20,
                                                marginHorizontal: 5,
                                                borderRadius: 5,
                                            }}
                                        >

                                            <Text>{item}</Text>
                                        </TouchableOpacity>

                                    ))}

                                </ScrollView>


                            </C.Content>
                        </ScrollView>
                    </View>


                </TabView.Item>

                <TabView.Item style={{ flex: 1 }}>

                    <View style={{ marginTop: 10, marginStart: 10 }}>
                        <View style={{ flexDirection: 'row', gap: 20, zIndex: 500000 }}>


                            <View>
                                <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 5 }}>CST</Text>
                                <View style={{ zIndex: 10000 }}>
                                    <DropDownPicker
                                        containerStyle={{ width: 150, }}
                                        style={{ width: 150, marginTop: 10, }}
                                        items={items}
                                        setValue={setSelectedCst}
                                        value={selectedCst}
                                        open={opencst}
                                        setOpen={setOpencst}
                                    />
                                </View>
                            </View>

                            <View>
                                <Text style={{ fontSize: 16, marginBottom: 5, marginTop: 10 }}>ST</Text>
                                <View style={{ zIndex: 10000 }}>
                                    <DropDownPicker
                                        containerStyle={{ width: 200, }}
                                        style={{ width: 200, marginTop: 10, }}
                                        items={items}
                                        setValue={setSelectedSt}
                                        value={selectedSt}
                                        open={openSt}
                                        setOpen={setOpenSt}
                                    />
                                </View>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', gap: 20 }}>



                            <View>

                                <Text style={{ fontSize: 16, marginBottom: 5, marginTop: 10 }}>IAT</Text>
                                <View style={{ zIndex: 50000 }}>
                                    <DropDownPicker
                                        containerStyle={{ width: 150, }}
                                        style={{ width: 150, marginTop: 10, }}
                                        items={items}
                                        setValue={setSelectedIat}
                                        value={selectedIat}
                                        open={iat}
                                        setOpen={setIat}
                                    /></View>
                            </View>

                            <View>
                                <Text style={{ fontSize: 16, marginBottom: 5, marginTop: 10 }}>IPPT</Text>
                                <View style={{ zIndex: 50000 }}>
                                    <DropDownPicker
                                        containerStyle={{ width: 150, }}
                                        style={{ width: 150, marginTop: 10, }}
                                        items={items}
                                        setValue={setSelectedIppt}
                                        value={selectedIppt}
                                        open={ippt}
                                        setOpen={setIppt}
                                    />
                                </View>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', gap: 20 }}>
                            <View>
                                <Text style={{ fontSize: 16, marginBottom: 5, marginTop: 10 }}>ICMS</Text>
                                <View style={{ zIndex: 5000 }}>
                                    <DropDownPicker
                                        containerStyle={{ width: 150, }}
                                        style={{ width: 150, marginTop: 10, }}
                                        items={items}
                                        setValue={setSelectedIcms}
                                        value={selectedIcms}
                                        open={openIcms}
                                        setOpen={setOpenIcms}
                                    />
                                </View>
                            </View>

                            <View>



                                <Text style={{ fontSize: 16, marginBottom: 5, marginTop: 10 }}>CSOSN</Text>
                                <View style={{ zIndex: 5000 }}>
                                    <DropDownPicker
                                        containerStyle={{ width: 150, }}
                                        style={{ width: 150, marginTop: 10, }}
                                        items={items}
                                        setValue={setSelectedCsosn}
                                        value={selectedCsosn}
                                        open={csosn}
                                        setOpen={setCsosn}
                                    />
                                </View>
                            </View>

                        </View>
                        <Text style={{ fontSize: 16, marginBottom: 5, marginTop: 10 }}>NCM</Text>
                        <View style={{ zIndex: 3000 }}>
                            <DropDownPicker
                                containerStyle={{ width: 200, }}
                                style={{ width: 200, marginTop: 10, }}
                                items={items}
                                setValue={setSelectedNcm}
                                value={selectedNcm}
                                open={ncm}
                                setOpen={setNcm}
                            />
                        </View>




                        <View style={{ position: 'absolute', left: 0, right: 0, bottom: -150 }}>
                            <FAB
                                onPress={SaveProduct}
                                color={Colors.orange}
                                icon={<ChekIcon name='check' color='white' size={24} />}
                            />

                        </View>


                    </View>








                </TabView.Item>
            </TabView>


        </SafeAreaView >
    )
}