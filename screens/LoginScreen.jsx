import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { loginUser } from '../services/firebase';
import PopUpMessage from '../components/PopUpMessage';
import { Layout, Text, Input, Button } from '@ui-kitten/components';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('jajaja113');
    const [message, setMessage] = useState('');

    return (
        <Layout style={ styles.container }>
            {message == '' ? null : <PopUpMessage message={message} />}
            <Text style={{ padding: 16, fontFamily: 'Quicksand-Regular' }}>Email</Text>
            <Input
                onChangeText={value => setEmail(value)}
                placeholder='Email'
                style={{ paddingHorizontal: 16}}
            />
            <Text style={{ padding: 16, fontFamily: 'Quicksand-Regular' }}>Password</Text>
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
                Submit
            </Button>
            <Text category='h5' style={{
                textAlign: 'center',
            }}>
                OR
            </Text>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    }
})
export default LoginScreen;