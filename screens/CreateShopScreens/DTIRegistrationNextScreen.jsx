import React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Layout, Text, Button, Icon, Divider, Avatar, Tab, TabBar, List } from '@ui-kitten/components';


function DTIRegistrationNextScreen ({navigation}) {
    return (
        <Layout style={styles.container}>
            <ScrollView>
            <Layout style={styles.inner}>
                <Layout style={{alignSelf: 'center', alignContent: 'center'}}>
                    <Text category='h6' style={{ marginTop: 32}}>
                        How to Apply?
                    </Text>

                    <Layout style={styles.redBorder}>
                        <Text style={{marginVertical: 12, fontWeight:'bold', color:'rgb(253,253,253)'}}>
                            Online Application
                        </Text>
                    </Layout>
                    <Layout style={styles.row}>
                        <Text category='h6' style={styles.redText}>
                            1
                        </Text>
                        <Layout>
                        <Text style={styles.rowTextBold}>
                            Check if your propsective business name is available
                        </Text>
                        <Text style={styles.rowText}>
                            Go to the Business Name Search page of the BNRS website and type the keywords of your preferred trade name.
                        </Text>
                        </Layout>
                    </Layout>
                    <Layout style={styles.row}>
                        <Text category='h6' style={styles.redText}>
                            2
                        </Text>
                        <Layout>
                        <Text style={styles.rowTextBold}>
                            Proceed with your DTI business registration online
                        </Text>
                        <Text style={styles.rowText}>
                        Once confirmed that your target business is still availabkem acess the New Registration page of the BNRS site and read the Terms and Conditions. When done, click the I Agree button at the bottom of the page.
                        </Text>
                        </Layout>
                    </Layout>
                    <Layout style={styles.row}>
                        <Text category='h6' style={styles.redText}>
                            3
                        </Text>
                        <Layout>
                        <Text style={styles.rowTextBold}>
                            Fill out the online registration form
                        </Text>
                        <Text style={styles.rowText}>
                            Fields marked with a red asterisk must not be left blank. Your tax identification number (TIN) must also be provided on the online form. 
                        </Text>
                        </Layout>
                    </Layout>
                    <Layout style={styles.row}>
                        <Text category='h6' style={styles.redText}>
                            4
                        </Text>
                        <Layout>
                        <Text style={styles.rowTextBold}>
                            Pay this within five calendar days from the online application date. 
                        </Text>
                        <Text style={styles.rowText}>
                            You can pay at the DTI officer or Negosyo Center indicated in your Transaction Reference Number (TRN) acknowledgement form. 
                            For convenience, make your online payment immediately during your DTI business registration via GCash. If you have a [GCash account](https://www.moneymax.ph/personal-finance/articles/gcash-app-guide), just enter your mobile number in the Payment Details section.
                        </Text>
                        </Layout>
                    </Layout>
                    <Layout style={styles.row}>
                        <Text category='h6' style={styles.redText}>
                            5
                        </Text>
                        <Layout>
                        <Text style={styles.rowTextBold}>
                            Claim your Certificate of Business Name Registration at the nearest DTI office or download it for printing
                        </Text>
                        </Layout>
                    </Layout>
                    
                </Layout>
                    <Button appearance='outline' size='large'
                    onPress={() => {
                        navigation.navigate('Register Shop');
                    }}
                    style={{marginVertical:24}}>
                        Back to Registration Page
                    </Button>
            </Layout>
            </ScrollView>
        </Layout>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '90%',
    },
    rowText: {
        fontFamily: 'NunitoSans-Regular',
        marginBottom: 24
    },
    rowTextBold: {
        marginBottom: 8,
        fontWeight: 'bold'
    },
    daInner: {
        marginHorizontal: 20,
        backgroundColor: 'transparent',
    },
    inner: {
        marginHorizontal: 28
    },
    redBorder: {
        marginBottom: 16,
        marginTop: 16,
        backgroundColor: 'rgb(138,18,20)',
        paddingHorizontal: 12,
    },
    redText: {
        color:'rgb(138,18,20)',
        height: 26, 
        width: 26, 
        marginHorizontal: 16
    }
})

export default DTIRegistrationNextScreen;