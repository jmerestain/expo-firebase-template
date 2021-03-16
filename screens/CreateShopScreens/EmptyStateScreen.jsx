import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Layout, Text, Button, Icon, Divider, Avatar, Tab, TabBar, List } from '@ui-kitten/components';


function EmptyStateScreen ({navigation}) {

    return (
        <Layout style={styles.container}>
            <Layout style={styles.inner}>
                <Layout style={{alignSelf: 'center', alignContent: 'center'}}>
                    <Image 
                        style={styles.emptyImage}
                        source={require('../../assets/myshop/storefront-colour.png')}
                    />
                    <Text category='h6' style={{alignSelf: 'center', alignContent: 'center'}}>
                        You don’t have a shop!
                    </Text>
                    <Text style={{alignSelf: 'center', alignContent: 'center', marginVertical: 12, marginBottom: 24}}>
                        Let’s set it up.
                    </Text>
                    <Button appearance='primary' size='large'
                    onPress={() => {
                        navigation.navigate('Register Shop');
                    }}>
                        Send DTI Registration
                    </Button>
                    <Button appearance='ghost' size='medium'
                    onPress={() => {
                        navigation.navigate('About DTI Registration');
                    }}>
                        <Text category='s2' style={{alignSelf: 'center', color: 'rgb(186,186,186)', alignContent: 'center', marginVertical: 12}}>
                            How do I get certified?
                        </Text>
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

export default EmptyStateScreen;