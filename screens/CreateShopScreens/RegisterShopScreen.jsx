import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { createShop } from '../../services/firebase';
import PopUpMessage from '../../components/PopUpMessage';

const RegisterShopScreen = ({navigation}) => {
    const [businessName, setBusinessName] = useState('');
    const [fullName, setFullName] = useState('');
    const [ID, setID] = useState('');
    const [DTIcert, setDTIcert] = useState('');
    const [message, setMessage] = useState('');

    return (
        <Layout style={styles.container}>
            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular' }}>Business Name</Text>
            <Input
                onChangeText={value => setBusinessName(value)}
                placeholder='Registered Business Name'
                style={{ paddingHorizontal: 16}}
            />
            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular' }}>Owner Full Name</Text>
            <Input
                onChangeText={value => setFullName(value)}
                placeholder='Registered Full Name'
                style={{ paddingHorizontal: 16}}
            />
            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular' }}>Valid ID</Text>

            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular' }}>DTI Certification</Text>
            
            <Button size='large'
            onPress={() => { 
                if(businessName != '' && fullName != '' && ID != '' && DTIcert != '') {
                    createShop(businessName, fullName, ID, DTIcert);
                    navigation.navigate('Confirm Register Shop');
                } else {
                    setMessage('Some parts may not have been filled up.');
                }
            }}
            style={{ marginLeft: 16, marginRight: 16, marginTop: 24}}>
                Register Shop
            </Button>
            {message == '' ? null : <PopUpMessage message={message} />}
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
})

export default RegisterShopScreen;