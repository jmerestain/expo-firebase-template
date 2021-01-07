import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Button, ButtonGroup, List, Card } from '@ui-kitten/components';
import { checkAuthenticated } from '../services/firebase';
import * as firebase from 'firebase';
import 'firebase/firestore';

const data = [
    {title: 'Title 1', description: 'This is the description of my shit'},
    {title: 'Title 2', description: 'This is the description of my shit'},
]

const HomeComponent = ({user, db}) => {

    const [homeProducts, setHomeProducts] = useState([]);

    const refreshItems = useEffect(() => {
        setHomeProducts([]);
        db.collection('products').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                setHomeProducts(oldArray => [...oldArray, doc.data()]);
                console.log(doc.data())
            });
        });
    }, []);

    return (
        <Layout style={{flex: 1, flexDirection: 'column'}}>
            <Layout style={styles.userMessage}>
                <Text style={{textAlign: 'center'}}>
                    Welcome to FoodEye {user ? user.email : 'loading...'}!
                </Text>
            </Layout>
            <Text style={{padding: 20, fontWeight: 'bold'}} category='label'>
                Catalogue
            </Text>
            {homeProducts.length != 0 ?
            <List data={homeProducts} renderItem={renderItem} extraData={homeProducts} /> : 
            <Text>Loading!</Text>}
        </Layout>
    )
}

const renderItem = ({item}) => {
    const {title, description, price} = item;
    return (
        <Card>
            <Text>
                {title}
            </Text>
            <Text>
                {description}
            </Text>
            <Text>
                {price} Pesos
            </Text>
        </Card>
    )
}

const SampleAuthenticated = ({navigation}) => {

    const [user, setUser] = useState(null);
    const [isHome, setIsHome] = useState(true);
    const db = firebase.firestore();

    useEffect(() => {
        checkAuthenticated(setUser, navigation);
    }, []);
    
    return(
        <Layout style={styles.container}>
            <ButtonGroup
            style={styles.buttonGroup}
            appearance='filled'
            size='small'
            status='basic'>
                <Button onPress={() => {
                    setIsHome(true);
                }}>
                    Home
                </Button>
                <Button onPress={() => {
                    setIsHome(false);
                }}>
                    Discover
                </Button>
            </ButtonGroup>

            {isHome ? <HomeComponent user={user} db={db} /> : null}
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
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
    }
})

export default SampleAuthenticated;
