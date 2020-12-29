import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Button } from '@ui-kitten/components';

const WelcomeScreen = ({navigation}) => {
    return (
        <Layout>
            <Button
            size='large' 
            onPress={() => {
                navigation.navigate('Login')
            }}>
                Login
            </Button>
            <Button
            size='large'
            onPress={() => {
                navigation.navigate('Register')
            }}>
                Register
            </Button>
        </Layout>
    )
}

export default WelcomeScreen;