import React, { useContext, createContext, useState } from 'react';
import { View } from 'react-native';

// import { Container } from './styles';
export const contextAuth = createContext({})
export default function Context({ children }) {

    const [selectedProduct, setSelected] = useState('')
    const [checkout, setCheckout] = useState([])
    const [totalValue, setTotalValue] = useState('')
    const [totalItems, setTotalItems] = useState('')
    const [total, setTotal] = useState('')
    const [name, setName] = useState('JoANDERSOFK')

    //consts usadas nas confiugurações
    const [serie, setSerie] = useState('')
    const [idToken, setIdToken] = useState('')
    const [tokenCSC, setTokenCSC] = useState('')
    const [password, setPassword] = useState('')
    const [dateValid, setDateValid] = useState('')

    const [uf, setUf] = useState('Alagoas')
    const [df, setDf] = useState('')
    const [cript, setCript] = useState('')
    const [http, setHttp] = useState('')
    const [ssLib, setSsLib] = useState('')
    const [xml, setXml] = useState('')
    const [sslType, setSslType] = useState('')

    const [producao, setProducao] = useState(false)
    const [homologacao, setHomologacao] = useState(false)

    //
    const [clientSelected, setClientSelected] = useState('')

    return (

        <contextAuth.Provider value={{
            selectedProduct,
            setSelected,
            checkout,
            setCheckout,
            totalValue,
            setTotalValue,
            totalItems,
            setTotalItems,
            total,
            setTotal,
            name,
            serie,
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
            homologacao,
            clientSelected,
            setClientSelected

        }}>
            {children}
        </contextAuth.Provider>
    )
}