import { styled } from "styled-components/native"
import Colors from '../../../assets/colors.json'
import { Animated } from 'react-native'
export const HeaderFilter = styled.View`
margin-top:10px;
margin-bottom: ${props => (props.checkout.length > 0 ? '60px' : '0')};

`
export const Container = styled.View`
flex:1;
align-items:center;
justify-content:center;



`
export const ChekValue = styled.TouchableOpacity`

background-color:${Colors.orange};
position:absolute;
bottom:10px;
height:50px;
width:80%;
align-items:center;
justify-content:center;
border-radius:6px;


`
export const ChekText = styled.Text`
color:white;
font-size:20px;
`

export const Groups = styled.TouchableOpacity`
padding-horizontal:6px;
background-color:'#e6e6e6';
margin-left:6px;
border-radius:6px;
height:30px;

`
export const GroupText = styled.Text`
font-size:16px;


`
export const Products = styled.TouchableOpacity`
flex-direction:row;
align-items:center;
margin-start:10px;
margin-top:10px;
justify-content:space-between;
margin-end:10px;
background-color:white;

padding:6px;


`
export const ProductText = styled.Text`
font-size:18px;
font-weight:500;



`
export const Value = styled.Text`
font-size:18px;
font-weight:bold;


`
export const Codigo = styled.Text`
font-size:16px;


`

export const ProductCheckout = styled.TouchableOpacity`
flex-direction:row;
align-items:center;
margin-start:10px;
margin-top:10px;
justify-content:space-between;
margin-end:10px;
background-color:white;
padding:6px;
gap:10px;
width:350px;
margin-end:10px;

`
export const Review = styled.View`
font-size:16px;
background-color:white;
margin-start:10px;
margin-end:10px;
flex-direction:row;
align-items:center;
justify-content:space-around;
margin-top:10px;
padding:6px;


`
export const Title = styled.Text`
font-size:20px;
font-weight:500;
`
