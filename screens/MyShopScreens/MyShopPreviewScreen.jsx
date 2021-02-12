import React from 'react';
import { StyleSheet, TouchableOpacity, Image, SectionList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Rating } from 'react-native-elements';
import { Layout, Text, Button, Icon, Divider, Avatar, Tab, TabBar, List, Input, StatusTab } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrdersScreen from '../OrdersScreen';
import OrderProcess from './OrderProcessScreen';
import { ScrollView } from 'react-native-gesture-handler';

const MyShopPreviewTab = createMaterialTopTabNavigator();
const MyShopStack = createStackNavigator();

const MyShopStackNavigation = () => (
    <MyShopStack.Navigator screenOptions={{
        headerStyle: {backgroundColor: 'rgb(138,18,20)'}
    }}>
        <MyShopStack.Screen name="View My Shop" component={OrdersScreen} />
        <MyShopStack.Screen name="View DTI Certificate" component={OrdersScreen} />
        <MyShopStack.Screen name="Contact Support" component={OrdersScreen} />
        <MyShopStack.Screen name="Shop Settings" component={OrdersScreen} />
        <MyShopStack.Screen name="OrderProcess" component={OrderProcess} />
    </MyShopStack.Navigator>
)

const data = new Array(8).fill({
    name: 'Bea\'s Bakery',
    location: 'Cabanatuan, Nueva Ecija',
    shopRating: '3.5',
    totalProducts: '12',
    totalFollowers: '234',
    product: 'Cheeseburger',
    price: 'P150',
    rating: 5,
    review: 'Very responsive, good service. Carrot cake came just in time for my sister’s birthday.',
    ratedBy: 'Nelly Cruz',
    dateReviewed: '01/11/21'
  });

  const SearchIcon = (props) => (
    <Icon name='search-outline' {...props} />
  );

function PreviewMyShopScreen ({navigation}) {

    const renderItem = ({ item, index }) => (
        <Layout style={styles.container}>
            <Layout style={styles.inner}>
                    <Text category='h6' style={{alignSelf: 'center', alignContent: 'center', marginBottom: 8, marginTop: 16}}>
                        {item.name}
                    </Text>
                    <Text style={{alignSelf: 'center', alignContent: 'center', marginVertical: 2, color: 'rgb(180,180,180)'}}>
                        {item.location}
                    </Text>
            </Layout>
        </Layout>
    );
    const renderItem2 = ({ item, index }) => (
        <Layout style={styles.container}>
            <Layout style={styles.inner}>
                <Layout style={{flexDirection:'row', justifyContent: 'space-around', marginTop: 24}}>
                    <Layout style={{marginHorizontal: 16}}>
                    <Text category='h6' style={{alignSelf: 'center', alignContent: 'center', marginVertical: 8}}>
                        {item.shopRating}
                    </Text>
                    <Text style={{alignSelf: 'center', alignContent: 'center', marginVertical: 2, color: 'rgb(180,180,180)'}}>
                        Rating
                    </Text>
                    </Layout>
                    <Layout style={{marginHorizontal: 16}}>
                    <Text category='h6' style={{alignSelf: 'center', alignContent: 'center', marginVertical: 8}}>
                        {item.totalProducts}
                    </Text>
                    <Text style={{alignSelf: 'center', alignContent: 'center', marginVertical: 2, color: 'rgb(180,180,180)'}}>
                        Products
                    </Text>
                    </Layout>
                    <Layout style={{marginHorizontal: 16}}>
                    <Text category='h6' style={{alignSelf: 'center', alignContent: 'center', marginVertical: 8}}>
                        {item.totalFollowers}
                    </Text>
                    <Text style={{alignSelf: 'center', alignContent: 'center', marginVertical: 2, color: 'rgb(180,180,180)'}}>
                        Followers
                    </Text>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>
    );
    
    return (
        <Layout style={styles.container}>
            <Layout style={styles.inner}>
                <Layout style={{alignSelf: 'center', alignContent: 'center'}}>
                    <Avatar
                        rounded
                        size="giant"
                        shape='round'
                        source={require('../../screens/avatar-icon.png')}
                        style={{ marginHorizontal: 50, marginTop: 24, alignItems: 'center', alignSelf: 'center', alignContent: 'center'}}
                    /> 
                    {/*<List
                        data={data}
                        renderItem={renderItem}/>
                    <List
                        data={data}
                    renderItem={renderItem2}/>*/}
                    <Text category='h6' style={{alignSelf: 'center', alignContent: 'center', marginBottom: 8, marginTop: 16}}>
                        Bea's Bakery
                    </Text>
                    <Text style={{alignSelf: 'center', alignContent: 'center', marginVertical: 2, color: 'rgb(180,180,180)'}}>
                        Cabanatuan, Nueva Ecija
                    </Text>
                    <Divider style={{marginTop: 12}}/>
                    <Layout style={{flexDirection:'row', justifyContent: 'space-around', marginTop: 16}}>
                        <Layout style={{marginHorizontal: 12}}>
                        <Text category='h6' style={{alignSelf: 'center', alignContent: 'center', marginVertical: 2}}>
                            3.5
                        </Text>
                        <Text style={{alignSelf: 'center', alignContent: 'center', marginVertical: 2, color: 'rgb(180,180,180)'}}>
                            Rating
                        </Text>
                        </Layout>
                        <Layout style={{marginHorizontal: 16}}>
                        <Text category='h6' style={{alignSelf: 'center', alignContent: 'center', marginVertical: 2}}>
                            12
                        </Text>
                        <Text style={{alignSelf: 'center', alignContent: 'center', marginVertical: 2, color: 'rgb(180,180,180)'}}>
                            Products
                        </Text>
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
        <MyShopPreviewNavigation/>
    </Layout>
    )
}

const MyShopPreviewNavigation = () => {
    return (
    <MyShopPreviewTab.Navigator tabBar={props => <TopTabBar {...props} />}>
        <MyShopPreviewTab.Screen name="Products" component={ProductsNav} />
        <MyShopPreviewTab.Screen name="Reviews" component={RatingNav} />
    </MyShopPreviewTab.Navigator>
    )
}

const TopTabBar = ({ navigation, state }) => (
    <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
      <Tab title='Products'/>
      <Tab title='Reviews'/>
    </TabBar>
)
const renderItemProducts = ({ item, index }) => (
    <Layout style={styles.item}>
        <Image
        style={{resizeMode: 'contain'}}
        source={require('../Rectangle_164.png')}/>
        <Layout style={{alignSelf: 'flex-start'}}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8, marginBottom: 4 }} >
            {item.product}
        </Text>
        <Text>
            {item.price}
        </Text>
        </Layout>
    </Layout>
);

const renderItemRatings = ({ item, index }) => (
    <Layout style={styles.item2}>
        <Layout style={{flexDirection: 'row', alignSelf: 'stretch', justifyContent:'space-between' }}>
            <Layout style={{flexDirection: 'row', alignSelf: 'flex-start', marginTop: 12 }}>
                <Avatar
                    rounded
                    size="small"
                    shape='round'
                    source={require('../../screens/avatar-icon.png')}
                    style={{ marginRight: 12, marginLeft: 2,  marginBottom: 8, alignItems: 'center', alignSelf: 'center', alignContent: 'center'}}
                /> 
                <Layout>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }} >
                    {item.ratedBy}
                </Text>
                <Text style={{fontSize: 10, color: 'rgb(186,186,186)'}} >
                    {item.dateReviewed}
                </Text>
                </Layout>
            </Layout>
            <Layout style={{marginLeft: '25%'}}>
            <Rating
                type='custom'
                rating={item.rating}
                style={{ paddingVertical: 16 }}
                ratingColor='rgb(210,145,91)'
                imageSize={20}
            />
            </Layout>
            <Layout>
        </Layout>
    </Layout>
        <Text style={{marginBottom: 16}}>
            {item.review}
        </Text>
        <Divider/>
    </Layout>
);


const ProductsNav = () => {
    return ( 
        <Layout style={styles.container}>
             <Input
                        onChangeText={value => setSearch(value)}
                        placeholder='Search here'
                        style={{ paddingHorizontal: 16, paddingVertical: 12}}
                        accessoryLeft={SearchIcon}
            />
            <List
            data={data}
            numColumns={2}
            renderItem={renderItemProducts}
            style={{marginHorizontal:12}}
            columnWrapperStyle={{
              justifyContent: 'space-between'
            }}
            />
        </Layout>
    )
}

const RatingNav = () => {
    return ( 
        <Layout style={styles.container}>
            <List
            data={data}
            renderItem={renderItemRatings}
            style={{marginHorizontal:12}}
            />
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    containerList: {
    },
    item: {
      width: '48%',
      marginBottom: 10,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    item2: {
        paddingBottom: 10,
        paddingHorizontal: 16,
        alignItems: 'stretch',
        flexDirection: 'column'
      },
    daInner: {
        marginHorizontal: 20,
        backgroundColor: 'transparent',
    },
    inner: {
        padding: 20,
    },
    field: {
        marginVertical: 10,
    },
    buttonGroup: {
        alignSelf: 'center',
    },
    button: {
        width: 55,
        height: 55,
        borderWidth: 1,
        borderColor: '#BDBDBD',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 999,
    }
})

export default PreviewMyShopScreen;