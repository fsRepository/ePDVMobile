import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import Logo from '../../assets/logo.png'
import * as C from './styles'
import LottieView from 'lottie-react-native';
import Loading from '../../assets/loading.json'
import { useNavigation } from '@react-navigation/native'
// import { Container } from './styles';

export default function SplashScreen() {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('login')
        }, 2000)

    }, [])



    return (
        <C.ContainerSplash>

            <C.Logo source={Logo} />
            <C.TextLogo >ePDV Smart</C.TextLogo>


            <LottieView
                style={{ width: 100, height: 100, }}
                source={Loading}
                autoPlay
                loop
            />




        </C.ContainerSplash>
    )
}