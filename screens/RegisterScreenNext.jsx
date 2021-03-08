import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { createUser } from '../services/users';
import PopUpMessage from '../components/PopUpMessage';

const RegisterScreenNext = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');

    return (
        <Layout style={styles.container}>
            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular' }}>First Name</Text>
            <Input
                onChangeText={value => setFirstName(value)}
                placeholder='First Name'
                style={{ paddingHorizontal: 16}}
            />
            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular' }}>Last Name</Text>
            <Input
                onChangeText={value => setLastName(value)}
                placeholder='Last Name'
                style={{ paddingHorizontal: 16}}
            />
            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular' }}>Contact Number</Text>
            <Input
                onChangeText={value => setContactNumber(value)}
                placeholder='+63 *** *** **** '
                keyboardType='phone-pad'
                style={{ paddingHorizontal: 16}}
            />
            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular' }}>Address</Text>
            <Input
                onChangeText={value => setAddress(value)}
                placeholder='Shipping Address'
                style={{ paddingHorizontal: 16}}
            />
            <Button size='large'
            onPress={() => {
                if(email != '' && contactNumber != '' && name != '' && address != '') {
                    createUser(email, contactNumber,name, address, setMessage, navigation);
                } else {
                    setMessage('Credentials provided is not valid');
                }
            }}
            style={{ marginLeft: 16, marginRight: 16, marginTop: 24}}>
                Register
            </Button>
            <Button size='large'
            onPress={() => {
                navigation.navigate('Register')
            }}
            style={{ marginLeft: 16, marginRight: 16, marginTop: 8, backgroundColor: 'rgb(255,255,255)', borderColor: 'rgb(138,18,20)'}}>
                <Text style={{color: 'rgb(138,18,20)', fontWeight:'bold'}}>Back to Setup</Text>
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

export default RegisterScreenNext;