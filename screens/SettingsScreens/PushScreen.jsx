import React, { useState } from 'react';
import { StyleSheet, Modal, TouchableOpacity, Image, SectionList } from 'react-native';
import { Layout, Text, Button, Icon, Divider, Toggle } from '@ui-kitten/components';

function PushScreen ({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <Layout style={styles.container}>
            <Text style={{ fontFamily:'NunitoSans-Bold', fontSize: 17, paddingHorizontal:16, paddingVertical: 12}}>Notifications</Text>
            <Divider style={{ marginBottom: 12 }} />
            <Layout style={{flexDirection:'row', paddingHorizontal:16, alignItems: 'flex-end', justifyContent: 'space-between', borderColor: 'rgb(186,186,186)'}}>
                <Text>Turn on Notifications</Text>
                <Layout>
                <SettingsOptions />
                </Layout>
            </Layout>
            <Divider style={{ marginVertical: 18, marginBottom: 12 }} />
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

export default PushScreen;