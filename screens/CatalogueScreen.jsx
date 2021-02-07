import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Layout, Text, List, Card, Spinner, Icon } from '@ui-kitten/components';
import { checkAuthenticated, getCatalogue } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';
// Components
import Category from './Category';
import DashHeader from '../components/headers/DashHeader';

const artscrafts = require('../assets/categories/artscrafts.png');
const beautypersonalcare = require('../assets/categories/beautypersonalcare.png');
const farmgardening = require('../assets/categories/farmgardening.png');
const fashionwearables = require('../assets/categories/fashionwearables.png');
const fooddrinks = require('../assets/categories/fooddrinks.png');
const healthwellness = require('../assets/categories/healthwellness.png');
const homeessentials = require('../assets/categories/homeessentials.png');

const CatalogueNavigator = () => {
    const CStack = createStackNavigator();
    return (
        <CStack.Navigator screenOptions={{
            headerStyle: {backgroundColor: 'rgb(138,18,20)'},
        }}>
            <CStack.Screen name="CatalogueMain" component={CatalogueScreen} options={{headerShown: true, header: (props) => {return(<DashHeader />)}}} />
            <CStack.Screen name="Category" component={Category} options={({route}) => (
                {
                    headerTitle: route.params.category,
                }
            )} />
        </CStack.Navigator>
    )
}

const HomeComponent = ({user, navigation}) => {

    const [homeProducts, setHomeProducts] = useState([]);

    const refreshItems = useEffect(() => {
        getCatalogue(setHomeProducts); 
    }, []);

    return (
        <Layout style={[styles.container]}>
            <Layout style={styles.inner}>
                <Layout>
                    <Image source={require('../assets/dashboardHeader.png')} style={styles.categoryImage} />
                </Layout>
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
                        data={homeProducts} 
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
    let imageSource;

    if (icon === 'fooddrinks') {
        imageSource = fooddrinks;
    } else if (icon === 'artscrafts') {
        imageSource = artscrafts;
    } else if (icon === 'beautypersonalcare') {
        imageSource = beautypersonalcare;
    } else if (icon === 'farmgardening') {
        imageSource = farmgardening;
    } else if (icon === 'fashionwearables') {
        imageSource = fashionwearables;
    } else if (icon === 'healthwellness') {
        imageSource = healthwellness;
    } else if (icon === 'homeessentials') {
        imageSource = homeessentials;
    } else {
        iamgeSource = fooddrinks;
    }

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Category', {category: title});
        }}>
            <Layout style={styles.categoryEntry}>
                <Image source={imageSource} style={styles.icon} />
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
            <CategoryEntry title='Food & Drinks' icon='fooddrinks' />
            <CategoryEntry title='Home Essentials' icon='homeessentials' />
            <CategoryEntry title='Arts & Crafts' icon='artscrafts' />
            <CategoryEntry title='Fashion & Wearables' icon='fashionwearables' />
            <CategoryEntry title='Beauty & Personal Care' icon='beautypersonalcare' />
            <CategoryEntry title='Health & Wellness' icon='healthwellness' />
            <CategoryEntry title='Farm & Gardening' icon='farmgardening' />
        </Layout>
    )
}

const renderItem = ({item}) => {
    const {title, description, price, imageUrl} = item;
    console.log(imageUrl)
    return (
        <TouchableOpacity>
            <Layout style={styles.pickForYou}>
                <Image source={{uri: imageUrl}} style={{width: 120, height: 90}}/>
                <Text>
                    {title}
                </Text>
                <Text numberOfLines={1}>
                    {description}
                </Text>
                <Text>
                    {price} Pesos
                </Text>
            </Layout>
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
        backgroundColor: '#BDBDBD',
        height: 120,
        alignSelf: 'center',
        paddingHorizontal: 20,
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
        maxWidth: 120,
    }
})

export default CatalogueNavigator;
