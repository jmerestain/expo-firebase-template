import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { createUser } from '../services/users';
import PopUpMessage from '../components/PopUpMessage';

const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [message, setMessage] = useState('');

    return (
        <Layout style={styles.container}>
            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular' }}>Username</Text>
            <Input
                onChangeText={value => setUsername(value)}
                placeholder='Username'
                style={{ paddingHorizontal: 16}}
            />
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
                style={{ paddingHorizontal: 16}}
            />
            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular' }}>Retype Password</Text>
            <Input
                onChangeText={value => setConfirmPass(value)}
                placeholder='Retype Password'
                secureTextEntry={true}
                style={{ paddingHorizontal: 16}}
            />
            <Button size='large'
            onPress={() => {
                if(confirmPass == password && email != '' && username != '' && password != '') {
                    createUser(email, password, setMessage, navigation);
                    navigation.navigate('Registration Details')
                } else {
                    setMessage('Credentials provided is not valid');
                }
            }}
            style={{ marginLeft: 16, marginRight: 16, marginTop: 24, marginBottom:24}}>
                Submit
            </Button>
            {message == '' ? null : <PopUpMessage message={message} />}
            <Text category='h6' style={{ textAlign: 'center', marginBottom: 8, fontFamily: 'Quicksand-Regular' }}>
                OR
            </Text>
            <Button size='large'
            onPress={() => {
            }}
            style={{ marginTop: 8, marginLeft: 16, marginRight: 16, backgroundColor: 'rgb(255,255,255)', borderColor: 'rgb(210,145,91)' }}>
                <Text style={{color: 'rgb(210,145,91)', fontWeight:'bold'}}>Signup with Facebook</Text>
            </Button>
            <Button size='large'
            onPress={() => {
            }}
            style={{ marginTop: 8, marginLeft: 16, marginRight: 16, backgroundColor: 'rgb(210,145,91)', borderColor: 'rgb(210,145,91)' }}>
                Signup with Google
            </Button>
            <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Text category='h6' style={{
                textAlign: 'center', marginTop: 32, fontFamily: 'Quicksand-Regular', fontWeight:'bold'}}>
                Already have an account? 
            </Text>
            <Layout>
            <Button appearance='ghost' size='small'
            style={{ textAlign: 'center', marginTop: 23 }}
            onPress={() => {
                navigation.navigate('Login')
            }}>
            <Text category='h6' style={{
                 marginLeft: 4, fontFamily: 'Quicksand-Regular', color:'rgb(138,18,20)' }}>
                Login
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

export default RegisterScreen;