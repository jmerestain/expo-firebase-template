import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Layout, Text, List, Card, Spinner, Icon } from '@ui-kitten/components';
import { checkAuthenticated, getCatalogue } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';
// Components
import Category from './Category';


const CatalogueNavigator = () => {
    const CStack = createStackNavigator();
    return (
        <CStack.Navigator>
            <CStack.Screen name="CatalogueMain" component={CatalogueScreen} options={{headerShown: false}} />
            <CStack.Screen name="Category" component={Category} options={{headerShown: false}} />
        </CStack.Navigator>
    )
}

const HomeComponent = ({user, navigation}) => {

    const [homeProducts, setHomeProducts] = useState([]);

    const refreshItems = useEffect(() => {
        getCatalogue(setHomeProducts); 
    }, []);

    const data = new Array(8).fill({
        title: 'Shop Name',
        price: 'P100.00',
        product: 'Cheeseburger',
    });

    return (
        <Layout style={styles.container}>
            <Layout style={styles.inner}>
                <Layout style={styles.categoryImage} />
                <Text style={{paddingVertical: 20, fontWeight: 'bold'}} category='h6'>
                    Categories
                </Text>
                <CategorySection />
                <Text style={{paddingVertical: 20, fontWeight: 'bold'}} category='h6'>
                    Picks For You
                </Text>
                {
                    homeProducts.length != 0 ?
                    <List 
                        data={data} 
                        renderItem={renderItem}
                        extraData={homeProducts}
                        horizontal={true}
                        style={{backgroundColor: 'transparent'}}
                    /> : 
                    <Spinner style={styles.loading} size='giant'/>
                }
            </Layout>
        </Layout>
    )
}
const CategoryEntry = ({title, icon}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Category', {category: title});
        }}>
            <Layout style={styles.categoryEntry}>
                <Icon name={icon} fill='#8A1214' style={styles.icon} />
                <Text category='label' style={{textAlign: 'center', fontWeight: 'bold'}}>
                    {title}
                </Text>
            </Layout>
        </TouchableOpacity>
    )
}

const CategorySection = () => {
    return (
        <Layout style={styles.categorySection}>
            <CategoryEntry title='Food & Drinks' icon='gift-outline' />
            <CategoryEntry title='Home Essentials' icon='gift-outline' />
            <CategoryEntry title='Arts & Crafts' icon='gift-outline' />
            <CategoryEntry title='Fashion & Wearables' icon='gift-outline' />
            <CategoryEntry title='Health & Wellness' icon='gift-outline' />
            <CategoryEntry title='Farm & Gardening' icon='gift-outline' />
        </Layout>
    )
}

const renderItem = ({item}) => {
    const {title, description, price} = item;
    return (
        <TouchableOpacity>
            <Card style={styles.pickForYou}>
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
        </TouchableOpacity>
    )
}

const CatalogueScreen = ({navigation}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        checkAuthenticated(setUser, navigation);
    }, []);
    
    return(
        <Layout style={styles.container}>
            <HomeComponent user={user} navigation={navigation} />
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    inner: {
        flex: 1,
        margin: 20,
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
    },
    categoryImage: {
        backgroundColor: 'gray',
        resizeMode: 'contain',
        height: 140,
    },
    categoryEntry: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: 90,
        marginBottom: 10,
    },
    categorySection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    icon: {
        width: 44,
        height: 44,
    },
    pickForYou: {
        flex: 1,
        marginRight: 10,
        elevation: 2,
    }
})

export default CatalogueNavigator;
