import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QrCodePix({ valor }) {
    const chavePix = 'joanderson2572@gmail.com';
    const nomeBeneficiario = 'Joandeson Luan Santos';
    const cidadeBeneficiario = 'Penedo Alagoas';
    const valorTransferencia = '25,00';

    // Função para gerar o Payload
    const generatePayload = () => {
        const payload = `00020126580014br.gov.bcb.pix0136${chavePix}520400005303986540510.005802BR5914${nomeBeneficiario}6019${cidadeBeneficiario}62180514Um-Id-Qualquer6304${valorEmCentavos}`;
        return payload;
    }

    // Removendo a vírgula do valor e convertendo para ponto decimal
    const valorFormatado = parseFloat(valorTransferencia.replace(',', '.'));

    // Convertendo o valor para centavos
    const valorEmCentavos = (valorFormatado * 100).toFixed(0);

    // Obtendo o Payload
    const payload = generatePayload();

    return (
        <View>
            <QRCode
                value={payload}
                size={250}
                color={'black'}
                backgroundColor='white'
            />
        </View>
    );
}
