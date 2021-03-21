import React, { useState, useEffect } from 'react';
import { Layout, Button, Text, List, Card, Avatar, Divider, Input, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { checkAuthenticated } from '../../services/auth';
import { getMyStore } from '../../services/products';

const SearchIcon = (props) => (
    <Icon name='search-outline' {...props} />
);

const myProducts1 = new Array(8).fill({
    product: 'Maybelline Lipstick',
    price: 'P150',
    inventory: '150 left',
  });


  const RenderItem = ({ item, index }) => (
    <Layout style={styles.containerTop}>
        <Layout style={styles.inner}>
            <Layout style={styles.containerList}>
                <Layout style={styles.innerList}>
                <Avatar
                        rounded
                        size="giant"
                        source={require('../../screens/avatar-icon.png')}
                        style={{ marginHorizontal: 20,  alignSelf: 'center'}}
                 /> 
                <Layout style={styles.textList}>
                    <Text style={{ alignContent: 'center', marginTop: 8, marginBottom: 2, fontSize: 16, fontFamily:'NunitoSans-Bold'}}>
                        {item.product}
                    </Text>
                    <Text category='s2' style={{ alignContent: 'center', marginVertical: 2, color: '#000000'}}>
                        {item.price}
                    </Text>
                    <Text style={{ alignContent: 'center', marginVertical: 2, color: '#00000060', fontFamily:'NunitoSans-Regular', fontSize: 12}}>
                        {item.inventory}
                    </Text>
                </Layout>
                </Layout>
                <Layout style={{alignContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Button size='small' appearance='outline' style={{alignSelf: 'flex-end', marginVertical: 8, marginRight: 16}}>
                        Edit Product
                    </Button>
                </Layout>
            </Layout>
         </Layout>
         <Divider/>
    </Layout>
);

const ManageProductsScreen = ({navigation}) => {
    
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
            <Layout style={styles.field}>
            <Input
            onChangeText={value => setSearch(value)}
            placeholder='Search here'
            accessoryLeft={SearchIcon}
            style={{
              marginHorizontal: 20, marginTop: 12, marginBottom:8
            }}
            />
            <Divider/>
            <List data={myProducts1} renderItem={RenderItem} style={{marginBottom:145}} />
            </Layout>
            <Layout>
            
            </Layout>
            <Layout style={{flex: 1, minWidth:'100%', elevation:3, borderColor: 'rgb(250,250,250)', position: 'absolute', left:0, bottom:0}}>
            <Divider/>
            <Button size='large'
                onPress={() => {
                    navigation.navigate('Add New Item');
                }}
                style={{ marginHorizontal: 20, marginVertical: 16}}>
                    + Add New Product
            </Button>
            </Layout>
        </Layout>
    )
}

{/*const RenderItem = ({item}) => {
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
}*/}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
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
    },
    containerTop: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    containerList: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginVertical:8
    },
    innerList: {
        flexDirection: 'row',
    },
    textList: {
        flexDirection: 'column',
        marginBottom: 12,
    },
    buttonContain: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 80,
        justifyContent: 'space-around',
        marginBottom: 32
    },
    settingsCard: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginVertical: 8,
    },
})

export default ManageProductsScreen;