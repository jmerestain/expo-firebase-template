import React, { useState } from 'react';
import { StyleSheet, Modal, TouchableOpacity, Image, SectionList } from 'react-native';
import { Layout, Text, Button, Icon, Divider, Toggle } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

function PrivacyPolicyScreen ({navigation}) {

    return (
    <ScrollView>
        <Layout style={styles.container}>
            <Text style={{ fontFamily:'NunitoSans-Bold', fontSize: 16, paddingHorizontal:16, paddingVertical: 8}}>Privacy Policy</Text>
            <Divider style={{ marginHorizontal:16, marginBottom: 12 }} />
            <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
            >
            Bili NE built the Bili NE Mobile App app as a Free app. This SERVICE is provided by Bili NE at no cost and is intended for use as is.
            This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.
            If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
            The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Bili NE Mobile App unless otherwise defined in this Privacy Policy.
            </Text>
            <Text style={{ fontFamily:'NunitoSans-Bold', fontSize: 16, paddingHorizontal:16, paddingVertical: 8}}>Information Collection and Use</Text>
            <Divider style={{ marginHorizontal:16, marginBottom: 12 }} />
            <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
            >
            For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Username, Account Email, Account Full Name, Delivery Address, Account Contact Number, Shop Name, Shop Owner Full Name, Shop Location, Business Email, Sop Contact Number, Owner's Valid ID, DTI Registration. The information that we request will be retained by us and used as described in this privacy policy.
            The app does use third party services that may collect information used to identify you.

            Link to privacy policy of third party service providers used by the app

            Google Play Services, Google Analytics for Firebase, Firebase Crashlytics, Expo, Log Data

            We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
            </Text>
            <Text style={{ fontFamily:'NunitoSans-Bold', fontSize: 16, paddingHorizontal:16, paddingVertical: 8}}>Cookies</Text>
            <Divider style={{ marginHorizontal:16, marginBottom: 12 }} />
            <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
            >
            Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.

            This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.

            </Text>
            <Text style={{ fontFamily:'NunitoSans-Bold', fontSize: 16, paddingHorizontal:16, paddingVertical: 8}}>Service Providers</Text>
            <Divider style={{ marginHorizontal:16, marginBottom: 12 }} />
            <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
            >
            We may employ third-party companies and individuals due to the following reasons:

            To facilitate our Service;
            To provide the Service on our behalf;
            To perform Service-related services; or
            To assist us in analyzing how our Service is used.
            We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.

            </Text>
            <Text style={{ fontFamily:'NunitoSans-Bold', fontSize: 16, paddingHorizontal:16, paddingVertical: 8}}>Security</Text>
            <Divider style={{ marginHorizontal:16 }} />
            <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular", marginBottom: 12 }}
            >
            We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
            </Text>
            <Text style={{ fontFamily:'NunitoSans-Bold', fontSize: 16, paddingHorizontal:16, paddingVertical: 8}}>Links to Other Sites</Text>
            <Divider style={{ marginHorizontal:16 }} />
            <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular", marginBottom: 12 }}
            >
            This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </Text>
            
            <Text style={{ fontFamily:'NunitoSans-Bold', fontSize: 16, paddingHorizontal:16, paddingVertical: 8}}>Children’s Privacy</Text>
            <Divider style={{ marginHorizontal:16 }} />
            <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular", marginBottom: 12 }}
            >
            These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.
            </Text>

            <Text style={{ fontFamily:'NunitoSans-Bold', fontSize: 16, paddingHorizontal:16, paddingVertical: 8}}>Changes to This Privacy Policy</Text>
            <Divider style={{ marginHorizontal:16 }} />
            <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular", marginBottom: 12 }}
            >
            We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.
            
            This policy is effective as of 2021-03-24

            </Text>

            <Text style={{ fontFamily:'NunitoSans-Bold', fontSize: 16, paddingHorizontal:16, paddingVertical: 8}}>Contact Us</Text>
            <Divider style={{ marginHorizontal:16 }} />
            <Text
            category="s1"
            style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular", marginBottom: 12 }}
            >
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at biline.app@gmail.com.
            </Text>
        </Layout>
        </ScrollView>
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

export default PrivacyPolicyScreen;