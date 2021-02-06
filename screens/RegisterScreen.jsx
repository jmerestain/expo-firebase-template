import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { createUser } from '../services/firebase';
import PopUpMessage from '../components/PopUpMessage';

const RegisterScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [message, setMessage] = useState('');

    return (
        <Layout style={styles.container}>
            {message == '' ? null : <PopUpMessage message={message} />}
            <Input
                onChangeText={value => setEmail(value)}
                placeholder='Email'
            />
            <Input
                onChangeText={value => setPassword(value)}
                placeholder='Password'
                secureTextEntry={true}
            />
            <Input
                onChangeText={value => setConfirmPass(value)}
                placeholder='Confirm Password'
                secureTextEntry={true}
            />
            <Button size='large'
            onPress={() => {
                if(confirmPass == password && email != '' && password != '') {
                    createUser(email, password, setMessage, navigation);
                } else {
                    setMessage('Credentials provided is not valid');
                }
            }}>
                Register
            </Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
    },
})

export default RegisterScreen;