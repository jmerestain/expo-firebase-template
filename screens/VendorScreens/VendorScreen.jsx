import React, { useState, useEffect } from 'react';
import { Layout, Button, Text, List } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { checkAuthenticated } from '../../services/firebase';

const VendorScreen = ({navigation}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        checkAuthenticated(setUser, navigation)
    }, [])

    return (
        <Layout style={styles.container}>
            <Layout>
                <Button
                status='basic'
                onPress={() => {
                    navigation.navigate('VendorNew');
                }} >
                    New Product
                </Button>
            </Layout>
            <Layout style={styles.container}>
                <Text>
                    
                </Text>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    }
})

export default VendorScreen;