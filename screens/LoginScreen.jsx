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
            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular' }}>Email</Text>
            <Input
                onChangeText={value => setEmail(value)}
                placeholder='Email'
                style={{ paddingHorizontal: 16}}
            />
            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular' }}>Password</Text>
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
            <Text category='h6' style={{ textAlign: 'center', marginBottom: 8, fontFamily: 'Quicksand-Regular' }}>
            {message == '' ? null : <PopUpMessage message={message} />}

                OR
            </Text>
            <Button size='large'
            onPress={() => {
            }}
            style={{ marginTop: 8, marginLeft: 16, marginRight: 16, backgroundColor: 'rgb(255,255,255)', borderColor: 'rgb(210,145,91)' }}>
                <Text style={{color: 'rgb(210,145,91)', fontWeight:'bold'}}>Login with Facebook</Text>
            </Button>
            <Button size='large'
            onPress={() => {
            }}
            style={{ marginTop: 8, marginLeft: 16, marginRight: 16, backgroundColor: 'rgb(210,145,91)', borderColor: 'rgb(210,145,91)' }}>
                Login with Google
            </Button>
            <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Text category='h6' style={{
                textAlign: 'center', marginTop: 32, fontFamily: 'Quicksand-Regular', fontWeight:'bold'}}>
                Don't have an account? 
            </Text>
            <Layout>
            <Button appearance='ghost' size='small'
            style={{ textAlign: 'center', marginTop: 23 }}
            onPress={() => {
                navigation.navigate('Register')
            }}>
            <Text category='h6' style={{
                 marginLeft: 4, fontFamily: 'Quicksand-Regular', color:'rgb(138,18,20)' }}>
                Register
            </Text>
            </Button>
            </Layout>
            </Layout>
            
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
export default LoginScreen;