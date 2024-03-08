import { styled } from "styled-components/native";


export const Container = styled.View`
margin-top:10px;
flex:1;


`

export const Header = styled.View`

flex-direction:row;
justify-content:space-around;
align-items:center;

`
export const Cashier = styled.Text`

font-size:18px;
background-color:#e6e6e6;
padding:6px;

`

export const Content = styled.TouchableOpacity`

margin-start:10px;
margin-end:10px;
margin-top:10px;
flex-direction:row;
background-color:white;
gap:10px;
justify-content:space-around;

`
export const Type = styled.Text`
color: ${props => (props.type === 'entrada' ? 'green' : 'red')};
font-size:18px;
font-weight:500;

`
export const NVenda = styled.Text`

font-size:18px;
font-weight:500;
color:grey;

`
export const MoneyText = styled.Text`

font-size:18px;
font-weight:500;


`
export const Status = styled.Text`

font-size:18px;
font-weight:400;
color:green;


`

export const ModalCash = styled.View`
width:300;
height:250;
align-items:center;


`
export const Title = styled.Text`
font-size:18px;
font-weight:500;



`
export const Date = styled.Text`
font-size:18px;
font-weight:500;
background-color:#e6e6e6;
margin-top:10;



`

export const ResumeContainer = styled.View`

margin-start:10;
margin-end:10;


`
