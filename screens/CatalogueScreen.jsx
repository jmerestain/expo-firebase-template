import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Button, ButtonGroup, List, Card, Spinner } from '@ui-kitten/components';
import { checkAuthenticated, getCatalogue } from '../services/firebase';

const HomeComponent = ({user, navigation}) => {

    const [homeProducts, setHomeProducts] = useState([]);

    const refreshItems = useEffect(() => {
        getCatalogue(setHomeProducts);
    }, []);

    return (
        <Layout style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{padding: 20, fontWeight: 'bold'}} category='label'>
                Catalogue
            </Text>
            {homeProducts.length != 0 ?
            <List data={homeProducts} renderItem={renderItem} extraData={homeProducts} /> : 
            <Spinner style={styles.loading} size='giant'/>}
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

const CatalogueScreen = ({navigation}) => {

    const [user, setUser] = useState(null);
    const [isHome, setIsHome] = useState(true);

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

            {isHome ? <HomeComponent user={user} navigation={navigation} /> : null}
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
    },
    loading: {
        alignSelf: 'center',
    }
})

export default CatalogueScreen;
