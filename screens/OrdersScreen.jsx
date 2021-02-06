import React from 'react';
import { StyleSheet, TouchableOpacity, Image, SectionList } from 'react-native';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';

const OStack = createStackNavigator();

const OrdersScreenNavigator = () => (
    <OStack.Navigator screenOptions={{
        headerStyle: {backgroundColor: 'rgb(138,18,20)'}
    }}>
        <OStack.Screen name="Orders" component={OrdersScreen} />
    </OStack.Navigator>
)

function OrdersScreen ({navigation}) {
    return (
        <Layout style={styles.container}>
            <DeliverAddress navigation={navigation} />
            <Layout style={styles.inner}>
                <Layout style={styles.field}>
                    <Text category='label'>
                        
                    </Text>
                </Layout>
            </Layout>
        </Layout>
    )
}

const DeliverAddress = ({navigation}) => {
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Settings')
        }}>
            <Layout style={[styles.deliverAddress]}>
                <Layout style={styles.daInner}>
                    <Layout style={{flexDirection: 'row', backgroundColor: 'transparent', paddingVertical: 10, justifyContent: 'space-between'}}>
                        <Layout style={{flex: 1, flexDirection: 'row', backgroundColor: 'transparent'}}>
                            <Icon name='map-outline' fill='#8A1214' style={{height: 32, width: 32, marginRight: 10,}} />
                            <Layout style={{backgroundColor: 'transparent', flexDirection: 'column', flexShrink: 1}}>
                                <Text category='h6' style={{fontWeight: 'bold'}}>
                                    Delivery Address
                                </Text>
                                <Text category='p2'>
                                    Jong Ong | 0998 186 7756
                                </Text>
                                <Text category='label' style={{alignSelf: 'baseline', marginTop: 10, flexWrap: 'wrap'}}>
                                    15 Round Robin Drive a daijwfioa jiowjfoa jifaiowf joiawjf ioawiofj
                                </Text>
                            </Layout>
                        </Layout>
                        <Icon name='chevron-right' fill='#8A1214' style={{height: 26, width: 26}} />
                    </Layout>
                </Layout>
            </Layout>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    deliverAddress: {
        marginVertical: 10,
        backgroundColor: '#EEEEEE',
        height: 120,
        flexDirection: 'column',
        justifyContent: 'flex-start',
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

export default OrdersScreenNavigator;