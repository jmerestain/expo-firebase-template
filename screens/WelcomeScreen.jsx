import React from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Button } from '@ui-kitten/components';
import { default as theme } from './theme.json';

const WelcomeScreen = ({navigation}) => {
    return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
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
    </ApplicationProvider>
    )
}

export default WelcomeScreen;