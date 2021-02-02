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
            {firstTime ? <OnboardingScreen setFirstTime={setFirstTime} /> : <AuthOptions navigation={navigation} />}
        </Layout>
    )
}

const OnboardingScreen = ({ setFirstTime }) => {
    const [screen, setScreen] = useState(1);

    return (
        <Layout style={styles.container}>
            { screen == 1 ? <OScreen1 setScreen={setScreen} /> : null }
            { screen == 2 ? <OScreen2 setScreen={setScreen} /> : null }
            { screen == 3 ? <OScreen3 setScreen={setScreen} /> : null }
            { screen == 4 ? <OScreen4 setScreen={setScreen} /> : null }
            { screen == 5 ? <OScreen5 setScreen={setScreen} /> : null }
            { screen == 6 ? <OScreen6 setScreen={setScreen} setFirstTime={setFirstTime} /> : null }
        </Layout>
    )
}

const OScreen1 = ({setScreen}) => {
    return (
        <Layout style={styles.onBoardScreen}>
            <Image 
                style={styles.onBoardImage}
                source={require('../assets/welcome/onboard1.png')}
            />
            <Layout style={styles.onBoardText}>
                <Text>
                    <Text style={{fontWeight: 'bold'}} category="h6">Bagong Inspirasyon at Likhang Nueva Ecija (BILI NE!) </Text>
                    <Text category="h6">is an organization of micro-, small- and medium enterprises in Nueva Ecija, Philippines.</Text>
                </Text>
            </Layout>
            <Button style={[styles.onBoardButton, {marginBottom: 10}]}
            onPress={() => {
                setScreen(2);
            }}>
                Next
            </Button>
        </Layout>
    )
}

const OScreen2 = ({setScreen}) => {
    return (
        <Layout style={styles.onBoardScreen}>
            <Image 
                style={styles.onBoardImage}
                source={require('../assets/welcome/onboard2.png')}
            />
            <Layout style={styles.onBoardText}>
                <Text category="h6">
                This community of MSMEs have been sustaining their respective operations, families, and communities by participating in trade fairs organized by the Department of Trade and Industry (DTI) – Nueva Ecija. 
                </Text>
            </Layout>
            <Button style={styles.onBoardButton}
            onPress={() => {
                setScreen(3);
            }}>
                Next
            </Button>
            <Button style={[styles.onBoardButton, {
                marginVertical: 10,
            }]}
            size='small'
            appearance='outline'
            onPress={() => {
                setScreen(value => value-1)
            }}>
                Back
            </Button>
        </Layout>
    )
}

const OScreen3 = ({setScreen}) => {
    return (
        <Layout style={styles.onBoardScreen}>
            <Image 
                style={styles.onBoardImage}
                source={require('../assets/welcome/onboard3.png')}
            />
            <Layout style={styles.onBoardText}>
                <Text category="h6">
                    Nueva Ecija boasts to be the only province in Central Luzon that produces a 
                    diverse range of products – agricultural produce, manufactured food, household essentials, etc.
                </Text>
            </Layout>
            <Button style={styles.onBoardButton}
            onPress={() => {
                setScreen(4);
            }}>
                Next
            </Button>
            <Button style={[styles.onBoardButton, {
                marginVertical: 10,
            }]}
            size='small'
            appearance='outline'
            onPress={() => {
                setScreen(value => value-1)
            }}>
                Back
            </Button>
        </Layout>
    )
}

const OScreen4 = ({setScreen}) => {
    return (
        <Layout style={styles.onBoardScreen}>
            <Image 
                style={styles.onBoardImage}
                source={require('../assets/welcome/onboard4.png')}
            />
            <Layout style={styles.onBoardText}>
                <Text>
                    <Text category="h6" style={{fontWeight: 'bold'}}>BILI NE! </Text>
                    <Text category="h6">is an app that seeks to connects the whole Nueva Ecijan community and beyond. </Text>
                </Text>
            </Layout>
            <Button style={styles.onBoardButton}
            onPress={() => {
                setScreen(5);
            }}>
                Next
            </Button>
            <Button style={[styles.onBoardButton, {
                marginVertical: 10,
            }]}
            size='small'
            appearance='outline'
            onPress={() => {
                setScreen(value => value-1)
            }}>
                Back
            </Button>
        </Layout>
    )
}

const OScreen5 = ({setScreen}) => {
    return (
        <Layout style={styles.onBoardScreen}>
            <Image 
                style={styles.onBoardImage}
                source={require('../assets/welcome/onboard5.png')}
            />
            <Layout style={styles.onBoardText}>
                <Text category="h6">
                    The online e-commerce platform envisions to bridge its local farmers,
                    craftsmen, manufacturers, couriers, and consumers, to cultivate a sustainable, self-sufficient lifestyle inside the province’s eco-system.
                </Text>
            </Layout>
            <Button style={styles.onBoardButton}
            onPress={() => {
                setScreen(6);
            }}>
                Next
            </Button>
            <Button style={[styles.onBoardButton, {
                marginVertical: 10,
            }]}
            size='small'
            appearance='outline'
            onPress={() => {
                setScreen(value => value-1)
            }}>
                Back
            </Button>
        </Layout>
    )
}

const OScreen6 = ({setFirstTime, setScreen}) => {
    return (
        <Layout style={styles.onBoardScreen}>
            <Image 
                style={styles.onBoardImage}
                source={require('../assets/welcome/onboard6.png')}
            />
            <Layout style={styles.onBoardText}>
                <Text category="h6">
                    The app demonstrates the power of the local community – that if people work together, “kayang mabuhay”.
                </Text>
            </Layout>
            <Button style={styles.onBoardButton}
            onPress={() => {
                setFirstTime(false);
            }}>
                Next
            </Button>
            <Button style={[styles.onBoardButton, {
                marginVertical: 10,
            }]}
            size='small'
            appearance='outline'
            onPress={() => {
                setScreen(value => value-1)
            }}>
                Back
            </Button>
        </Layout>
    )
}

const AuthOptions = ({navigation}) => {
    return (
        <Layout style={styles.container}>
            <Image 
                style={styles.onBoardImage}
                source={require('../assets/welcome/logo.png')}
            />
            <Layout style={styles.authInner}>
                <Button
                style={styles.authButton}
                size='large' 
                onPress={() => {
                    navigation.navigate('Login')
                }}>
                    Login
                </Button>
                <Button
                appearance='outline'
                style={styles.authButton}
                size='large'
                onPress={() => {
                    navigation.navigate('Register')
                }}>
                    Register
                </Button>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    authInner: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 20,
        justifyContent: 'center',
    },
    onBoardScreen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    onBoardText: {
        flex: 2,
        marginVertical: 30,
    },
    onBoardImage: {
        flex: 4,
        alignSelf: 'center',
        height: 30,
        resizeMode: 'contain'
    },
    onBoardButton: {
        alignSelf: 'center',
        width: 224,
    },
    authButton: {
        marginBottom: 10,
    }
})

export default WelcomeScreen;