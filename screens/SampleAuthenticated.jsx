import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { signOutUser } from '../services/firebase';

const SampleAuthenticated = ({navigation}) => {
    return(
        <Layout style={styles.container}>
            <Text style={styles.text}>Logged In!</Text>
            <Button onPress={() => {
                signOutUser(navigation);
            }}>
                Sign Out
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