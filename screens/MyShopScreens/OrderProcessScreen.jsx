import React from 'react';
import { StyleSheet, TouchableOpacity, Image, SectionList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Layout, Text, Button, Icon, Divider, Input, Avatar, Tab, TabBar, List } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const MyShopStatusTab = createMaterialTopTabNavigator();

const data = new Array(8).fill({
    customer: 'Juliana Jong',
    order: '1',
    shipOutDate: '01/11/21',
    deliverDate: '01/12/21',
    quantity: '8',
    modeOfPayment: 'Gcash',
    total: 'P1000'
  });

  const SearchIcon = (props) => (
    <Icon name='search-outline' {...props} />
  );


  const renderItem = ({ item, index }) => (
    <Layout style={styles.container}>
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
                    <Text category='h6' style={{ alignContent: 'center', marginVertical: 6}}>
                        {item.customer}
                    </Text>
                    <Text category='s2' style={{ alignContent: 'center', marginVertical: 1, color: 'rgb(128, 128, 128)'}}>
                        {item.order} order(s)
                    </Text>
                </Layout>
                </Layout>
                <Icon name='more-horizontal' fill='rgb(160,160,160)' style={{height: 26, width: 26, marginHorizontal: 16, marginVertical: 4}} />
            </Layout>

         </Layout>
         <Divider/>
    </Layout>
);

const renderItem2 = ({ item, index }) => (
    <Layout style={styles.container}>
        <Layout style={styles.inner}>
            <Layout style={styles.containerList}>
                <Layout style={styles.innerList}>
                <Layout style={styles.textList}>
                    <Layout style={{ paddingHorizontal: 20, shadowRadius: 1, borderColor: 'rgb(220,220,220)', }}>
                    <Text category='h6' style={{ alignContent: 'center', marginVertical: 6}}>
                        {item.customer}
                    </Text>
                    <Layout style={{flex: 1, flexDirection: 'row'}}>
                    <Layout style={{flex: 1, flexDirection: 'column', minWidth: 60, marginRight: 32}}>
                    <Text category='s2' style={{ alignContent: 'center', marginVertical: 3, color: 'rgb(128, 128, 128)'}}>
                        {item.shipOutDate}
                    </Text>
                    <Text category='s2' style={{ alignContent: 'center', marginVertical: 3, color: 'rgb(128, 128, 128)'}}>
                        {item.quantity} item(s)
                    </Text>
                    </Layout>
                    <Layout style={{flex: 1, flexDirection: 'column',  minWidth: 60}}>
                    <Text category='s2' style={{ alignContent: 'center', marginVertical: 3, color: 'rgb(128, 128, 128)'}}>
                        {item.modeOfPayment}
                    </Text>
                    <Text category='s2' style={{ alignContent: 'center', marginVertical: 3, color: 'rgb(128, 128, 128)'}}>
                        {item.total}
                    </Text>
                    </Layout>
                    </Layout>
                    </Layout>
                </Layout>
                </Layout>
                <Icon name='more-horizontal' fill='rgb(160,160,160)' style={{height: 26, width: 26, marginHorizontal: 16, marginVertical: 4}} />
            </Layout>

         </Layout>
         <Divider/>
    </Layout>
);

const renderItem3 = ({ item, index }) => (
    <Layout style={styles.container}>
        <Layout style={styles.inner}>
            <Layout style={styles.containerList}>
                <Layout style={styles.innerList}>
                <Layout style={styles.textList}>
                    <Layout style={{ paddingHorizontal: 20, shadowRadius: 1, borderColor: 'rgb(220,220,220)', }}>
                    <Text category='h6' style={{ alignContent: 'center', marginVertical: 6}}>
                        {item.customer}
                    </Text>
                    <Layout style={{flex: 1, flexDirection: 'row'}}>
                    <Layout style={{flex: 1, flexDirection: 'column', minWidth: 60, marginRight: 32}}>
                    <Text category='s2' style={{ alignContent: 'center', marginVertical: 3, color: 'rgb(128, 128, 128)'}}>
                        {item.deliverDate}
                    </Text>
                    <Text category='s2' style={{ alignContent: 'center', marginVertical: 3, color: 'rgb(128, 128, 128)'}}>
                        {item.quantity} item(s)
                    </Text>
                    </Layout>
                    <Layout style={{flex: 1, flexDirection: 'column',  minWidth: 60}}>
                    <Text category='s2' style={{ alignContent: 'center', marginVertical: 3, color: 'rgb(128, 128, 128)'}}>
                        {item.modeOfPayment}
                    </Text>
                    <Text category='s2' style={{ alignContent: 'center', marginVertical: 3, color: 'rgb(128, 128, 128)'}}>
                        {item.total}
                    </Text>
                    </Layout>
                    </Layout>
                    </Layout>
                </Layout>
                </Layout>
                <Icon name='more-horizontal' fill='rgb(160,160,160)' style={{height: 26, width: 26, marginHorizontal: 16, marginVertical: 4}} />
            </Layout>

         </Layout>
         <Divider/>
    </Layout>
);


function OrderStatusScreen ({navigation}) {
    return (
        <Layout style={styles.container}>
            <Input
                onChangeText={value => setSearch(value)}
                placeholder='Search here'
                style={{ paddingHorizontal: 16, paddingVertical: 12}}
                accessoryLeft={SearchIcon}
            />
            <NavigationContainer independent='true'>
                <MyShopStatusTabNavigation/>
            </NavigationContainer>
        </Layout>
    )
}

const MyShopStatusTabNavigation = () => {
    return (
    <MyShopStatusTab.Navigator tabBar={props => <TopTabBar {...props} />}>
        <MyShopStatusTab.Screen name="Pending" component={ToProcessNav} />
        <MyShopStatusTab.Screen name="To Deliver" component={ToDeliverNav} />
        <MyShopStatusTab.Screen name="Shipping" component={ShippingNav} />
    </MyShopStatusTab.Navigator>
    )
}

const ToProcessNav = () => {
    return ( 
        <Layout style={[styles.settingsCard]}>
            <Layout style={styles.inner}>
                <Layout style={{justifyContent: 'flex-start'}}>
                    <List
                        data={data}
                        renderItem={renderItem}
                    />
                </Layout>
            </Layout>
        </Layout>
    )
}

const ToDeliverNav = () => {
    return ( 
        <Layout style={[styles.settingsCard]}>
            <Layout style={styles.inner}>
                <Layout style={{justifyContent: 'flex-start'}}>
                    <List
                        data={data}
                        renderItem={renderItem2}
                    />
                </Layout>
            </Layout>
        </Layout>
    )
}

const ShippingNav = () => {
    return ( 
        <Layout style={[styles.settingsCard]}>
            <Layout style={styles.inner}>
                <Layout style={{justifyContent: 'flex-start'}}>
                    <List
                        data={data}
                        renderItem={renderItem3}
                    />
                </Layout>
            </Layout>
        </Layout>
    )
}

const TopTabBar = ({ navigation, state }) => (
      <TabBar
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
        <Tab title='Pending'/>
        <Tab title='To Deliver'/>
        <Tab title='Shipping'/>
      </TabBar>
)

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
    daInner: {
        marginHorizontal: 20,
        backgroundColor: 'transparent',
    },
    inner: {
        paddingVertical: 12,
    },
    field: {
        marginVertical: 10,
    },
    buttonGroup: {
        alignSelf: 'center',
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