import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { signOutUser, checkAuthenticated } from '../services/firebase';



const SampleAuthenticated = ({navigation}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        checkAuthenticated(setUser, navigation);
    }, []);
    
    return(
        <Layout style={styles.container}>
            <Text style={styles.text}>Logged In!</Text>
            <Text>
                Hello {user ? user.email : 'loading...'}
            </Text>
            <Button onPress={() => {
                signOutUser(navigation);
            }}>
                Sign Out
            </Button>
            <Button onPress={() => {
                navigation.navigate('Other');
            }}>
                Go To Other Screen
            </Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 35,
        marginVertical: 20,
    }
})

export default SampleAuthenticated;