import React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Layout, Text, Button, Icon, Divider, Avatar, Tab, TabBar, List } from '@ui-kitten/components';


function DTIRegistrationInfoScreen ({navigation}) {
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
                            Benefits
                        </Text>
                    </Layout>
                    <Layout style={styles.row}>
                        <Icon name='checkmark' fill='rgb(160,160,160)' style={{height: 26, width: 26, marginHorizontal: 16}} />
                        <Text style={styles.rowText}>
                            Business registration assistance for those who are just starting out.
                        </Text>
                    </Layout>
                    <Layout style={styles.row}>
                        <Icon name='checkmark' fill='rgb(160,160,160)' style={{height: 26, width: 26, marginHorizontal: 16}} />
                        <Text style={styles.rowText}>
                            Business advisory services for propper guidance on compliance and license requirement submission
                        </Text>
                    </Layout>
                    <Layout style={styles.row}>
                        <Icon name='checkmark' fill='rgb(160,160,160)' style={{height: 26, width: 26, marginHorizontal: 16}} />
                        <Text style={styles.rowText}>
                            Business information and advocacy for training
                        </Text>
                    </Layout>
                    <Layout style={styles.row}>
                        <Icon name='checkmark' fill='rgb(160,160,160)' style={{height: 26, width: 26, marginHorizontal: 16}} />
                        <Text style={styles.rowText}>
                            Monitoring and evaluation for feedback and improvement
                        </Text>
                    </Layout>
                    <Text category='h6' style={{ marginTop: 8}}>
                        Who can apply?
                    </Text>
                    <Layout style={styles.redBorder}>
                        <Text style={{marginVertical: 12, fontWeight:'bold', color:'rgb(253,253,253)'}}>
                        Eligibility Criteria
                        </Text>
                    </Layout>
                    <Layout style={styles.row}>
                        <Icon name='checkmark' fill='rgb(160,160,160)' style={{height: 26, width: 26, marginHorizontal: 16}} />
                        <Text style={styles.rowText}>
                        At least 18 years old (Foreign nationals below 18 must submit proof that they come from a country where the legal age is lower than 18
                        </Text>
                    </Layout>
                    <Layout style={styles.row}>
                        <Icon name='checkmark' fill='rgb(160,160,160)' style={{height: 26, width: 26, marginHorizontal: 16}} />
                        <Text style={styles.rowText}>
                        Filipino Citizen
                        </Text>
                    </Layout>
                    <Layout style={styles.row}>
                        <Icon name='checkmark' fill='rgb(160,160,160)' style={{height: 26, width: 26, marginHorizontal: 16}} />
                        <Text style={styles.rowText}>
                            Business information and advocacy for training
                        </Text>
                    </Layout>
                    <Layout style={styles.row}>
                        <Icon name='checkmark' fill='rgb(160,160,160)' style={{height: 26, width: 26, marginHorizontal: 16}} />
                        <Text style={styles.rowText}>
                            Foreign national with a Certificate of Registration of Sole Proprietorship / Certificate of Authority to Engage in Business in the Philippines
                        </Text>
                    </Layout>
                    <Layout style={styles.row}>
                        <Icon name='checkmark' fill='rgb(160,160,160)' style={{height: 26, width: 26, marginHorizontal: 16}} />
                        <Text style={styles.rowText}>
                            Refugee or stateless person
                        </Text>
                    </Layout>
                    <Layout style={styles.redBorder}>
                        <Text style={{marginVertical: 12, fontWeight:'bold', color:'rgb(253,253,253)'}}>
                            Requirements
                        </Text>
                    </Layout>
                    <Layout style={styles.row}>
                        <Icon name='checkmark' fill='rgb(160,160,160)' style={{height: 26, width: 26, marginHorizontal: 16}} />
                        <Text style={styles.rowText}>
                            Business Name
                        </Text>
                    </Layout>
                    <Layout style={styles.row}>
                        <Icon name='checkmark' fill='rgb(160,160,160)' style={{height: 26, width: 26, marginHorizontal: 16}} />
                        <Text style={styles.rowText}>
                            Owner is a sole proprietor
                        </Text>
                    </Layout>

                </Layout>
                    <Button appearance='primary' size='large'
                    onPress={() => {
                        navigation.navigate('How to File Registration');
                    }}
                    style={{marginVertical:24}}>
                        How to Apply
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
        marginBottom: 12
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
    }
})

export default DTIRegistrationInfoScreen;