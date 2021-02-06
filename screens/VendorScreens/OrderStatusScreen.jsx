import React from 'react';
import { StyleSheet, TouchableOpacity, Image, SectionList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Layout, Text, Button, Icon, Divider, Input, Avatar, Tab, TabBar, List } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const StatusTab = createMaterialTopTabNavigator();

const data = new Array(8).fill({
    product: 'Maybelline Lipstick',
    price: 'P150',
    quantity: 'x3',
    shop: 'Mary’s Makeup',
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
                        {item.product}
                    </Text>
                    <Text category='s2' style={{ alignContent: 'center', marginVertical: 1, color: 'rgb(128, 128, 128)'}}>
                        {item.price}
                    </Text>
                    <Text category='s2' style={{ alignContent: 'center', marginVertical: 1, color: 'rgb(128, 128, 128)'}}>
                        {item.quantity}
                    </Text>
                    <Text category='s2' style={{ alignContent: 'center', marginVertical: 1, color: 'rgb(128, 128, 128)'}}>
                        {item.shop}
                    </Text>
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
                <StatusTabNavigation/>
            </NavigationContainer>
        </Layout>
    )
}

const StatusTabNavigation = () => {
    return (
    <StatusTab.Navigator tabBar={props => <TopTabBar {...props} />}>
        <StatusTab.Screen name="To Process" component={ToProcessNav} />
        <StatusTab.Screen name="To Deliver" component={ToProcessNav} />
        <StatusTab.Screen name="To Receive" component={ToProcessNav} />
        <StatusTab.Screen name="To Review" component={ToProcessNav} />
    </StatusTab.Navigator>
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

const TopTabBar = ({ navigation, state }) => (
      <TabBar
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
        <Tab title='To Process'/>
        <Tab title='To Deliver'/>
        <Tab title='To Receive'/>
        <Tab title='To Review'/>
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