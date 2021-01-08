import React, { useState, useEffect } from 'react';
import { Layout, Button, Text, List, Card } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { checkAuthenticated, getMyStore } from '../../services/firebase';

const VendorScreen = ({navigation}) => {
    
    const [user, setUser] = useState(null);
    const [myProducts, setProducts] = useState([]);

    useEffect(() => {
        checkAuthenticated(setUser, navigation)
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
        flexDirection: 'column'
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