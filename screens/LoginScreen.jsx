import React, { useState } from 'react';
import { loginUser } from '../services/firebase';
import PopUpMessage from '../components/PopUpMessage';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Input, Button } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { default as mapping } from './mapping.json';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('jajaja113');
    const [message, setMessage] = useState('');

    return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} customMapping={mapping}>
        <Layout>
            {message == '' ? null : <PopUpMessage message={message} />}
            <Text style={{ padding: 16, fontFamily: 'Quicksand-Regular' }}>Email</Text>
            <Input
                onChangeText={value => setEmail(value)}
                placeholder='Email'
                style={{ paddingLeft: 16, paddingRight: 16}}
            />
            <Text style={{ padding: 16}}>Password</Text>
            <Input
                onChangeText={value => setPassword(value)}
                placeholder='Password'
                secureTextEntry={true}
                style={{ paddingLeft: 16, paddingRight: 16}}
            />
            <Button size='large'
            onPress={() => {
                if(email != '' && password != '') {
                    loginUser(email, password, setMessage, navigation);
                } else {
                    setMessage('Credentials provided is not valid');
                }
            }}
            style={{ margin: 16}}>
                Login
            </Button>
        </Layout>
        </ApplicationProvider>
    )
}

export default LoginScreen;