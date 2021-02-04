import React, { useState, useEffect } from 'react';
import { Layout, Button, Text, List, Card, Avatar } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { checkAuthenticated, getMyStore } from '../../services/firebase';

const VendorScreen = ({navigation}) => {
    
    const [user, setUser] = useState(null);
    const [myProducts, setProducts] = useState([]);
    const [vendorApproved, setVendorApproved] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthenticated(setUser, navigation);
        //checkVendorApproved(setVendorApproved, setLoading, navigation);
    }, [])
    useEffect(() => {
        getMyStore(user, setProducts);
    }, [user])

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
            <Layout style={styles.field}>
                <List data={myProducts} renderItem={RenderItem} />
            </Layout>

            <Layout>
            <Layout style={styles.avatar}>
            <Avatar
                rounded
                size="giant"
                shape='round'
                source={require('../../screens/avatar-icon.png')}
                style={{ marginHorizontal: 50, alignItems: 'center'}}
            /> 
            </Layout>
            <Button size='large'
                onPress={() => {}}
                style={{ marginHorizontal: 32, marginVertical: 8}}>
                    My Account
            </Button>
            <Button size='large'
                onPress={() => {}}
                style={{ marginHorizontal: 32, marginVertical: 8}}>
                    My Shop
            </Button>
            <Button size='large'
                onPress={() => {
                    navigation.navigate('Favorites');
                }}
                style={{ marginHorizontal: 32, marginVertical: 8}}>
                    Favorites
            </Button>
            <Button size='large'
                onPress={() => {
                    navigation.navigate('Settings');
                }}
                style={{ marginHorizontal: 32, marginVertical: 8}}>
                    Settings
            </Button>
            </Layout>
        </Layout>
    )
}

const RenderItem = ({item}) => {
    const {title, description, price} = item;
    return (
     <Card>
         <Text category='h4'>
            {title}
         </Text>
         <Text>
            {description}
         </Text>
         <Text>
            {price}
         </Text>
     </Card>  
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    avatar: {
        alignItems: 'center',
        margin: 16
    },
    text: {
        textAlign: 'center',
        fontSize: 35,
        marginVertical: 20,
    },
    buttonGroup: {
        alignSelf: 'center',
        marginVertical: 20,
    },
    userMessage: {
        padding: 30,
        elevation: 2,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    loading: {
        alignSelf: 'center',
    }
})

export default VendorScreen;