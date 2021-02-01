import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Button, Text } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('firstTime')
        if (value == null) {
            return true;
        }
        return value;
    } catch (e) {
        console.log(e);
    }
}

const setData = async () => {
    try {
        const value = await AsyncStorage.setItem('firstTime', false)
        return value;
    } catch (e) {
        console.log(e);
    }
}

const WelcomeScreen = ({navigation}) => {
    const [firstTime, setFirstTime] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const value = await getData();
            setFirstTime(value);
        }
        fetchData();
    }, []);

    return (
        <Layout style={styles.container}>
            {firstTime ? <OnboardingScreen setFirstTime={setFirstTime} /> : <AuthOptions />}
        </Layout>
    )
}

const OnboardingScreen = ({ setFirstTime }) => {
    const [screen, setScreen] = useState(1);

    return (
        <Layout>
            { screen == 1 ? <OScreen1 setScreen={setScreen} /> : null }
            { screen == 2 ? <OScreen2 setScreen={setScreen} /> : null }
            { screen == 3 ? <OScreen3 setScreen={setScreen} /> : null }
            { screen == 4 ? <OScreen4 setScreen={setScreen} /> : null }
            { screen == 5 ? <OScreen5 setScreen={setScreen} /> : null }
            { screen == 6 ? <OScreen6 setFirstTime={setFirstTime} /> : null }
        </Layout>
    )
}

const OScreen1 = ({setScreen}) => {
    return (
        <Layout>
            <Text>Screen 1</Text>
            <Button onPress={() => {
                setScreen(2);
            }}>
                Press Me
            </Button>
        </Layout>
    )
}

const OScreen2 = ({setScreen}) => {
    return (
        <Layout>
            <Text>Screen 2</Text>
            <Button onPress={() => {
                setScreen(3);
            }}>
                Press Me
            </Button>
        </Layout>
    )
}

const OScreen3 = ({setScreen}) => {
    return (
        <Layout>
            <Text>Screen 3</Text>
            <Button onPress={() => {
                setScreen(4);
            }}>
                Press Me
            </Button>
        </Layout>
    )
}

const OScreen4 = ({setScreen}) => {
    return (
        <Layout>
            <Text>Screen 4</Text>
            <Button onPress={() => {
                setScreen(5);
            }}>
                Press Me
            </Button>
        </Layout>
    )
}

const OScreen5 = ({setScreen}) => {
    return (
        <Layout>
            <Text>Screen 5</Text>
            <Button onPress={() => {
                setScreen(6);
            }}>
                Press Me
            </Button>
        </Layout>
    )
}

const OScreen6 = ({setFirstTime}) => {
    return (
        <Layout>
            <Text>Screen 6</Text>
            <Button onPress={() => {
                setFirstTime(false);
            }}>
                Press Me
            </Button>
        </Layout>
    )
}

const AuthOptions = () => {
    return (
        <Layout style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    }
})

export default WelcomeScreen;