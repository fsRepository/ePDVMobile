import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from "../splashScreen"
import Login from "../screens/login"
import Home from "../screens/home"
import Colors from '../../assets/colors.json'
import Sell from "../screens/sell"
import Cash from "../screens/cash"
import Checkout from "../screens/checkout"

import CheckoutConfirm from "../screens/checkout confirm"
import AddClient from "../screens/Clients/addClients"
import TabRoute from './tab';
import Clients from "../screens/Clients/clients"
import Products from "../screens/products"
import AddProducts from "../screens/products/addProducts"
import Sellers from "../screens/sellers"
import TesteImpressao from "../screens/impressao teste"
import ResumeCash from "../screens/cash/resumeCash"

export default function StackRoute() {
    const stack = createNativeStackNavigator()
    return (

        <stack.Navigator >

            <stack.Screen component={SplashScreen} name='splash'
                options={{
                    headerShown: false
                }}
            />
            <stack.Screen component={Login} name='login'
                options={{
                    headerShown: false
                }}
            />
            <stack.Screen component={Home} name='home'
                options={{
                    title: 'ePDV Smart',
                    headerTintColor: 'white',
                    headerStyle: ({ backgroundColor: Colors.orange })
                }}
            />
            <stack.Screen component={Cash} name='cash'
                options={{
                    title: 'Caixa',
                    headerTintColor: 'white',
                    headerStyle: ({ backgroundColor: Colors.orange })
                }}
            />
            <stack.Screen component={Sell} name='sell'
                options={{
                    title: 'Vender',
                    headerTintColor: 'white',
                    headerStyle: ({ backgroundColor: Colors.orange })

                }}
            />
            <stack.Screen component={Checkout} name='checkout'
                options={{
                    title: 'Venda',
                    headerTintColor: 'white',
                    headerStyle: ({ backgroundColor: Colors.orange })

                }}
            />
            <stack.Screen component={CheckoutConfirm} name='confirm'
                options={{
                    title: 'Pagamento',
                    headerTintColor: 'white',
                    headerStyle: ({ backgroundColor: Colors.orange })

                }}
            />
            <stack.Screen component={AddClient} name='addclient'
                options={{
                    headerShown: false,
                    title: 'Adicionar Cliente',
                    headerTintColor: 'white',
                    headerStyle: ({ backgroundColor: Colors.orange })

                }}
            />
            <stack.Screen component={Clients} name='clients'
                options={{
                    title: 'Clientes',
                    headerTintColor: 'white',
                    headerStyle: ({ backgroundColor: Colors.orange })

                }}
            />

            <stack.Screen component={TabRoute} name='settings'
                options={{
                    title: 'Configurações',
                    headerTintColor: 'white',
                    headerStyle: ({ backgroundColor: Colors.orange })

                }}
            />
            <stack.Screen component={Products} name='products'
                options={{
                    title: 'Produtos',
                    headerTintColor: 'white',
                    headerStyle: ({ backgroundColor: Colors.orange })

                }}
            />
            <stack.Screen component={AddProducts} name='addProducts'
                options={{
                    headerShown: false,
                    title: 'Novo produto',
                    headerTintColor: 'white',
                    headerStyle: ({ backgroundColor: Colors.orange })

                }}
            />
            <stack.Screen component={Sellers} name='sellers'
                options={{
                    title: 'Vendedores',
                    headerTintColor: 'white',
                    headerStyle: ({ backgroundColor: Colors.orange })

                }}
            />
            <stack.Screen component={TesteImpressao} name='impressao'
                options={{
                    title: 'impressao',
                    headerTintColor: 'white',
                    headerStyle: ({ backgroundColor: Colors.orange })

                }}
            />
            <stack.Screen component={ResumeCash} name='resume'
                options={{
                    title: 'Resumo',
                    headerTintColor: 'white',
                    headerStyle: ({ backgroundColor: Colors.orange })

                }}
            />
        </stack.Navigator>
    )
}