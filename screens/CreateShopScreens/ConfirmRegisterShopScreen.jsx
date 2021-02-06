import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Layout, Text, Button, Icon, Divider, Avatar, Tab, TabBar, List } from '@ui-kitten/components';


function ConfirmRegisterShopScreen ({navigation}) {

    return (
        <Layout style={styles.container}>
            <Layout style={styles.inner}>
                <Layout style={{alignSelf: 'center', alignContent: 'center'}}>
                    <Image 
                        style={styles.emptyImage}
                        source={require('../../assets/myshop/check-text.png')}
                    />
                    <Text category='h6' style={{alignSelf: 'center', alignContent: 'center'}}>
                        Submission Sent!
                    </Text>
                    <Text style={{alignSelf: 'center', alignContent: 'center', marginVertical: 12, marginBottom: 24, maxWidth:200}}>
                        You’ll be notified via text once processed. This feature will be unlocked once verified.
                    </Text>
                    <Button appearance='primary' size='large'
                    onPress={() => {
                    }}>
                        Back to Home
                    </Button>
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
    emptyImage: {
        flex: 4,
        alignSelf: 'center',
        height: 30,
        resizeMode: 'contain'
    },
    daInner: {
        marginHorizontal: 20,
        backgroundColor: 'transparent',
    },
    inner: {
        padding:80,
    }
})

export default ConfirmRegisterShopScreen;