import React from 'react';
import { StyleSheet, TouchableOpacity, Image, SectionList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Layout, Text, Button, Icon, Divider, Avatar, Tab, TabBar, List } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrdersScreen from '../OrdersScreen';

const AccountStack = createStackNavigator();
const AccountTopTab1 = createMaterialTopTabNavigator();

const MyAccountStackNavigation = () => (
    <AccountStack.Navigator screenOptions={{
        headerStyle: {backgroundColor: 'rgb(138,18,20)'}
    }}>
        <AccountStack.Screen name="Payment Options" component={OrdersScreen} />
        <AccountStack.Screen name="Contact Support" component={OrdersScreen} />
    </AccountStack.Navigator>
)

const data = new Array(8).fill({
    name: 'Amelia Bryers',
    bio: 'P24, Live 🌿 Laugh 😂 Love ❤️',
  });

function MyAccountScreen ({navigation}) {

    const renderItem = ({ item, index }) => (
        <Layout style={styles.container}>
            <Layout style={styles.inner}>
                    <Text category='h6' style={{alignSelf: 'center', alignContent: 'center', marginVertical: 12}}>
                        {item.name}
                    </Text>
                    <Text category='s1'>
                        {item.bio}
                    </Text>
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
                        style={{ marginHorizontal: 50, alignItems: 'center', alignSelf: 'center', alignContent: 'center'}}
                    /> 
                    {/*<List
                        data={data}
                        renderItem={renderItem}
                    />*/}
                    <Text category='h6' style={{alignSelf: 'center', alignContent: 'center', marginVertical: 12}}>
                        Amelia Bryers
                    </Text>
                    <Text category='s1'>
                        24, Live 🌿 Laugh 😂 Love ❤️
                    </Text>
                </Layout>
            </Layout>
            <NavigationContainer independent='true'>
                <AccountTabNavigation/>
            </NavigationContainer>
        </Layout>
    )
}

const AccountTabNavigation = () => {
    return (
    <AccountTopTab1.Navigator tabBar={props => <TopTabBar {...props} />}>
        <AccountTopTab1.Screen name="Pending Orders" component={PendingOrdersNav} />
        <AccountTopTab1.Screen name="Past Orders" component={PastOrdersNav} />
    </AccountTopTab1.Navigator>
    )
}

const PastOrdersNav = () => {
    return ( 
        <Layout style={[styles.settingsCard]}></Layout>
    )
}

const TopTabBar = ({ navigation, state }) => (
      <TabBar
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
        <Tab title='Pending Orders'/>
        <Tab title='Past Orders'/>
      </TabBar>
)


const PendingOrdersNav = () => {
    return (
        <Layout style={styles.container}>
            <Layout style={[styles.settingsCard]}>
                <Layout style={styles.daInner}>
                <Layout style={styles.buttonContain}>
                    <Layout>
                        <Button
                            style={styles.button}
                            appearance='ghost'
                        >
                            <Icon name='flip-2' fill='#8A1214' style={{height: 26, width: 26}} />
                        </Button>
                        <Text category='s2' style={{fontWeight:'bold', color: 'rgb(138,18,20)', marginTop: 8, alignSelf: 'center'}}>
                            To Process
                        </Text>
                    </Layout>
                    <Layout>
                        <Button
                            style={styles.button}
                            appearance='ghost'
                        >
                            <Icon name='car-outline' fill='#8A1214' style={{height: 26, width: 26}} />
                        </Button>
                        <Text category='s2' style={{fontWeight:'bold', color: 'rgb(138,18,20)', marginTop: 8, alignSelf: 'center'}}>
                            To Deliver
                        </Text>
                    </Layout>
                    <Layout>
                        <Button
                            style={styles.button}
                            appearance='ghost'
                        >
                            <Icon name='archive-outline' fill='#8A1214' style={{height: 26, width: 26}} />
                        </Button>
                        <Text category='s2' style={{fontWeight:'bold', color: 'rgb(138,18,20)', marginTop: 8, alignSelf: 'center'}}>
                            To Receive
                        </Text>
                    </Layout>
                    <Layout>
                        <Button
                            style={styles.button}
                            appearance='ghost'
                        >
                            <Icon name='checkmark-square-outline' fill='#8A1214' style={{height: 26, width: 26}} />
                        </Button>
                        <Text category='s2' style={{fontWeight:'bold', color: 'rgb(138,18,20)', marginTop: 8, alignSelf: 'center'}}>
                            To Review
                        </Text>
                    </Layout>
                </Layout>
                <Divider/>
                <TouchableOpacity>
                    <Layout style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'space-between', marginVertical: 8}}>
                        <Text style={{paddingTop: 2}}>
                          Payment Options
                        </Text>
                        <Icon name='chevron-right' fill='#8A1214' style={{height: 26, width: 26}} />
                    </Layout>
                </TouchableOpacity>
                <Divider/>
                <TouchableOpacity>
                    <Layout style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'space-between', marginVertical: 8}}>
                        <Text style={{paddingTop: 2}}>
                            Contact Support
                        </Text>
                        <Icon name='chevron-right' fill='#8A1214' style={{height: 26, width: 26}} />
                    </Layout>
                </TouchableOpacity>
                <Divider/>
                </Layout>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    buttonContain: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 80,
        justifyContent: 'space-around',
        marginTop: 16,
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
        padding: 20,
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

export default MyAccountScreen;