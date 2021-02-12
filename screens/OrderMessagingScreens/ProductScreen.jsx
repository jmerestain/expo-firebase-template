import React from 'react';
import { StyleSheet, TouchableOpacity, Image, SectionList } from 'react-native';
import { Rating } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { Layout, Text, Button, Icon, Divider, Input, Avatar, Tab, TabBar, List } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView } from 'react-native-gesture-handler';


const data = new Array(8).fill({
    product: 'Banana Bread',
    shop: 'Bea’s Bakery',
    rating: 4,
    price: 'P200',
    productDetails: 'Our banana bread will surely leave you drooling and craving for more! Made from bananas and flour, this bread is one of the best here in Nueva Ecija! Grab your loaf today!',
    quantity: '120',
    review: 'Very responsive, good service. Carrot cake came just in time for my sister’s birthday.',
    ratedBy: 'Nelly Cruz',
    dateReviewed: '01/11/21'
  });

  const renderItem = ({ item, index }) => (
    <Layout style={styles.container}>
        <Image
            style={{resizeMode: 'contain'}}
            source={require('../../assets/Product.png')}/>
            <Rating
                type='custom'
                rating={item.rating}
                style={{ paddingVertical: 12, position: 'absolute', right: 10  }}
                ratingColor='rgb(210,145,91)'
                tintColor='rgb(0, 0, 0)'
                imageSize={20}
            />
        <Layout style={styles.inner}>
            <Layout style={styles.containerList}>
                <Layout style={styles.innerList}>

                <Layout style={styles.textList}>
                    <Text category='h6' style={{ alignContent: 'center', marginVertical: 6, marginLeft: 16}}>
                        {item.product}
                    </Text>
                    <Text style={{ alignContent: 'center', marginVertical: 1, marginLeft: 16, color: 'rgb(128, 128, 128)'}}>
                        {item.shop}
                    </Text>
                </Layout>
                </Layout>
                <Layout>
                <Text category='h6' style={{ alignContent: 'center', marginVertical: 6, marginRight: 16}}>
                        {item.price}
                    </Text>
                    
                </Layout>
            </Layout>
            <Divider/>
            <Text category='s1' style={{ alignContent: 'center', marginTop: 12, marginLeft: 16}}>
                    Product Details
            </Text>
            <Text style={{ alignContent: 'center', marginVertical: 6, marginHorizontal: 16}}>
                    Stock: {item.quantity}
            </Text>
            <Text style={{ alignContent: 'center', marginVertical: 2, marginBottom: 16, marginHorizontal: 16}}>
                    {item.productDetails}
            </Text>
            <Divider/>
         </Layout>
    </Layout>
);

const renderItemMore = ({ item, index }) => (
    <Layout style={styles.item}>
      <Image
      style={{resizeMode: 'contain'}}
      source={require('../../screens/Rectangle_164.png')}/>
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

function OrderStatusScreen ({navigation}) {
    return (
        <ScrollView>
        <Layout style={styles.container}>
            <Image
            style={{resizeMode: 'contain'}}
            source={require('../../assets/Product.png')}/>
            <Rating
                type='custom'
                rating={3}
                style={{ paddingVertical: 12, position: 'absolute', right: 10  }}
                ratingColor='rgb(210,145,91)'
                tintColor='rgb(0, 0, 0)'
                imageSize={20}
            />
        <Layout style={styles.inner}>
            <Layout style={styles.containerList}>
                <Layout style={styles.innerList}>

                <Layout style={styles.textList}>
                    <Text category='h6' style={{ alignContent: 'center', marginVertical: 6, marginLeft: 16}}>
                        Banana Bread
                    </Text>
                    <Text style={{ alignContent: 'center', marginVertical: 1, marginLeft: 16, color: 'rgb(128, 128, 128)'}}>
                        Bea’s Bakery
                    </Text>
                </Layout>
            </Layout>
            <Layout>
                <Text category='h6' style={{ alignContent: 'center', marginVertical: 6, marginRight: 16}}>
                        P200
                    </Text>
                    
                </Layout>
            </Layout>
            <Divider/>
            <Text category='s1' style={{ alignContent: 'center', marginTop: 12, marginLeft: 16}}>
                    Product Details
            </Text>
            <Text style={{ alignContent: 'center', marginVertical: 6, marginHorizontal: 16}}>
                    Stock: 120
            </Text>
            <Text style={{ alignContent: 'center', marginVertical: 2, marginBottom: 16, marginHorizontal: 16}}>
            Our banana bread will surely leave you drooling and craving for more! Made from bananas and flour, this bread is one of the best here in Nueva Ecija! Grab your loaf today!
            </Text>
            <Divider/>
            <Layout style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text category='h6' style={{marginTop: 10}}>
                More from Bea’s Bakery
            </Text>
            <Button appearance='ghost' size='medium' style={{marginLeft: 10}}>
                View Shop ></Button>
            </Layout>
            <List
            data={data}
            numColumns={2}
            renderItem={renderItemMore}
            />
            <Divider/>
            <Layout style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text category='h6' style={{marginTop: 10, marginHorizontal: 12}}>
            Product Reviews
            </Text>
            <Button appearance='ghost' size='medium' style={{marginLeft: 10}}>
                See All ></Button>
            </Layout>
            <List
                data={data}
                renderItem={renderItemRatings}
            />
        </Layout> 
    </Layout>
    <Layout style={{position:'relative', flex: 1}}>
        <Layout style={{position:'absolute', bottom: 0, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'rgb(250,250,250)', paddingVertical: 8}}>
            <Button size='large' style={{width: '48%', marginHorizontal: 4, backgroundColor: 'rgb(87,11,13)'}}>
                Contact Seller
            </Button>
            <Button size='large' style={{width: '48%', marginHorizontal: 4}}>
                Add to Cart
            </Button>
        </Layout>
    </Layout>
    </ScrollView>    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    containerList: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    innerList: {
        flexDirection: 'row',
        
    },
    textList: {
        marginBottom: 12,
        width: '60%'
    },
    inner: {
        paddingVertical: 12,
    },
    item2: {
        paddingBottom: 10,
        paddingHorizontal: 16,
        alignItems: 'stretch',
        flexDirection: 'column'
      },
    item: {
      width: '49%',
      paddingVertical: 8,
      paddingHorizontal: 6,
      marginLeft: 3,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    button: {
        margin: 2,
        elevation: 5,
        shadowColor: 'rgb(255,255,255)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        borderColor: 'rgb(220,220,220)'
    }
})

export default OrderStatusScreen;