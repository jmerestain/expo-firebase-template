import React from 'react';
import { StyleSheet, TouchableOpacity, Image, SectionList } from 'react-native';
import { Layout, Text, Button, Icon, Divider } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
//import SettingsDeliveryAddress from './SettingsDeliveryAddress';
import OrdersScreen from '../OrdersScreen';

const SettingsStack = createStackNavigator();

const SettingsScreenNavigation = () => (
    <SettingsStack.Navigator screenOptions={{
        headerStyle: {backgroundColor: 'rgb(138,18,20)'}
    }}>
        <SettingsStack.Screen name="Profile Information" component={OrdersScreen} />
        <SettingsStack.Screen name="Change Password" component={OrdersScreen} />
        <SettingsStack.Screen name="Push Notfication" component={OrdersScreen} />
        <SettingsStack.Screen name="Push Information" component={OrdersScreen} />
        <SettingsStack.Screen name="Privacy Policy" component={OrdersScreen} />
    </SettingsStack.Navigator>
)

function SettingsScreen ({navigation}) {
    return (
        <Layout style={styles.container}>
            <SettingsOptions />
            <Layout style={styles.inner}>
                <Layout style={styles.field}>
                    <Text category='label'>
                        
                    </Text>
                </Layout>
            </Layout>
        </Layout>
    )
}

const SettingsOptions = () => {
    return (
        
            <Layout style={[styles.settingsCard]}>
                <Layout style={styles.daInner}>
                <Text category='h6' style={{fontWeight: 'bold', marginBottom: 12, marginTop: 20}}>
                  Account Settings
                </Text>
                <Divider/>
                <TouchableOpacity
                onPress={() => navigate('Profile Information')}>
                    <Layout style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'space-between', marginVertical: 8}}>
                        <Text style={{paddingTop: 2}}>
                          Delivery Address
                        </Text>
                        <Icon name='chevron-right' fill='#8A1214' style={{height: 26, width: 26}} />
                    </Layout>
                </TouchableOpacity>
                <Divider/>
                <TouchableOpacity>
                    <Layout style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'space-between', marginVertical: 8}}>
                        <Text style={{paddingTop: 2}}>
                            Change Password
                        </Text>
                        <Icon name='chevron-right' fill='#8A1214' style={{height: 26, width: 26}} />
                    </Layout>
                </TouchableOpacity>
                <Divider/>
                </Layout>

                <Layout style={styles.daInner}>
                <Text category='h6' style={{fontWeight: 'bold', marginBottom: 12, marginTop: 20}}>
                  Notifications settings
                </Text>
                <Divider/>
                <TouchableOpacity>
                    <Layout style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'space-between', marginVertical: 8}}>
                        <Text style={{paddingTop: 2}}>
                          Push Notifications
                        </Text>
                        <Icon name='chevron-right' fill='#8A1214' style={{height: 26, width: 26}} />
                    </Layout>
                </TouchableOpacity>
                <Divider/>
                </Layout>

                <Layout style={styles.daInner}>
                <Text category='h6' style={{fontWeight: 'bold', marginBottom: 12, marginTop: 20}}>
                  General
                </Text>
                <Divider/>
                <TouchableOpacity>
                    <Layout style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'space-between', marginVertical: 8}}>
                        <Text style={{paddingTop: 2}}>
                          Profile Information
                        </Text>
                        <Icon name='chevron-right' fill='#8A1214' style={{height: 26, width: 26}} />
                    </Layout>
                </TouchableOpacity>
                <Divider/>
                <TouchableOpacity>
                    <Layout style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'space-between', marginVertical: 8}}>
                        <Text style={{paddingTop: 2}}>
                          Privacy Policy
                        </Text>
                        <Icon name='chevron-right' fill='#8A1214' style={{height: 26, width: 26}} />
                    </Layout>
                </TouchableOpacity>
                <Divider/>
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
    }
})

export default SettingsScreen;