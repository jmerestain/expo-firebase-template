import React, { useState } from 'react';
import { StyleSheet, Modal, TouchableOpacity, Image, SectionList } from 'react-native';
import { Layout, Text, Button, Icon, Divider, Toggle } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import OrdersScreen from '../OrdersScreen';

const SettingsStack = createStackNavigator();

const SettingsScreenNavigation = () => (
    <SettingsStack.Navigator screenOptions={{
        headerStyle: {backgroundColor: 'rgb(138,18,20)'}
    }}>
        <SettingsStack.Screen name="Profile Information" component={OrdersScreen} />
        <SettingsStack.Screen name="Change Password" component={OrdersScreen} />
        <SettingsStack.Screen name="Push Notification" component={OrdersScreen} />
        <SettingsStack.Screen name="Push Information" component={OrdersScreen} />
        <SettingsStack.Screen name="Privacy Policy" component={OrdersScreen} />
    </SettingsStack.Navigator>
)

function ShopSettingsScreen ({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <Layout style={styles.container}>
            <Text category='h6' style={{paddingHorizontal:16, paddingVertical: 24}}>Notifications</Text>
            <Layout style={{flexDirection:'row', paddingHorizontal:16, alignItems: 'center', justifyContent: 'space-between', borderColor: 'rgb(186,186,186)'}}>
                <Text>Turn on Notifications</Text>
                <Layout>
                <SettingsOptions />
                </Layout>
            </Layout>
        <Text category='h6' style={{paddingHorizontal:16, paddingVertical: 16, marginTop: 30}}>Danger Zone</Text>
        <Layout style={{flexDirection:'row', paddingHorizontal:16, alignItems: 'center', justifyContent: 'space-between', borderColor: 'rgb(186,186,186)'}}>
            <Text>Delete Shop Account</Text>
            <Layout>
            <Button style={{marginRight: 8}}
            onPress={() => setModalVisible(true)}>
                Delete Now
            </Button>
            </Layout>
        </Layout>
        <Layout style={styles.centeredView}>
        <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
            <Layout style={styles.centeredView}>
                <Layout style={styles.modalView}>
                <Layout style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Icon name='alert-triangle-outline' fill='#8A1214' style={{height: 26, width: 26, justifyContent: 'center'}} />
                </Layout>
                <Text category='h6' style={{color: '#8A1214', paddingVertical: 12}}>You are about to delete your shop</Text>
                <Text>Are you sure about this? You will not be able to recover your account after deleting.</Text>
                <Button appearance='primary'
                    onPress={() => setModalVisible(!modalVisible)}
                    style={{marginTop: 20}}>
                        Back to Settings
                    </Button>
                    <Button appearance='outline'
                    onPress={() => setModalVisible(!modalVisible)}
                    style={{marginTop: 12}}>
                        Delete Now
                    </Button>
                </Layout>
            </Layout>
        </Modal>
        </Layout>
    </Layout>
    )
}

const SettingsOptions = () => {
    const [activeChecked, setActiveChecked] = React.useState(true);
  
    const onActiveCheckedChange = (isChecked) => {
      setActiveChecked(isChecked);
    };

    return (
        <Layout style={styles.container} level='1'>
            <Toggle
                style={styles.toggle}
                checked={activeChecked}
                onChange={onActiveCheckedChange}>
            </Toggle>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 24,
        paddingHorizontal: 12,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "stretch",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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

export default ShopSettingsScreen;