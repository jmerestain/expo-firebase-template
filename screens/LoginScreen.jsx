import React, { useState } from 'react';
import { Layout, Input, Button } from '@ui-kitten/components';
import { loginUser } from '../services/firebase';
import PopUpMessage from '../components/PopUpMessage';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    return (
        <Layout>
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
            <Button size='large'
            onPress={() => {
                if(email != '' && password != '') {
                    loginUser(email, password, setMessage, navigation);
                } else {
                    setMessage('Credentials provided is not valid');
                }
            }}>
                Login
            </Button>
        </Layout>
    )
}

export default LoginScreen;