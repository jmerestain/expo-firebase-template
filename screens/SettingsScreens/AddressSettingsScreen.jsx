import React, { useState } from 'react';
import { StyleSheet, Modal, TouchableOpacity, Image, SectionList } from 'react-native';
import { Layout, Text, Button, Icon, Divider, Toggle } from '@ui-kitten/components';
import { createUser, createUserProfile } from "../../services/users";
import PopUpMessage from "../../components/PopUpMessage";
import { Input } from "@ui-kitten/components";

function AddressSettingsScreen ({navigation}) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");

    return (
        <Layout style={styles.container}>
            <Text style={{ fontFamily:'NunitoSans-Bold', fontSize: 16, paddingHorizontal:16, paddingVertical: 8}}>Contact Details</Text>
            <Divider style={{ marginHorizontal:16, marginBottom: 12 }} />
            <Text
                category="s1"
                style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
                >
                First Name
                </Text>
                <Input
                onChangeText={(value) => setFirstName(value)}
                placeholder="First Name"
                style={{ paddingHorizontal: 16 }}
                />
                <Text
                category="s1"
                style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
                >
                Last Name
                </Text>
                <Input
                onChangeText={(value) => setLastName(value)}
                placeholder="Last Name"
                style={{ paddingHorizontal: 16 }}
                />
                <Text
                category="s1"
                style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
                >
                Contact Number
                </Text>
                <Input
                onChangeText={(value) => setContactNumber(value)}
                placeholder="+63 *** *** **** "
                keyboardType="phone-pad"
                style={{ paddingHorizontal: 16 }}
                />

            <Text style={{ fontFamily:'NunitoSans-Bold', fontSize: 16, paddingHorizontal:16, paddingVertical: 8, marginTop: 8}}>Shipping Information</Text>
            <Divider style={{ marginHorizontal:16, marginBottom: 12 }} />

                <Text
                category="s1"
                style={{ paddingHorizontal: 16, paddingVertical: 6, fontFamily: "NunitoSans-Regular" }}
                >
                Delivery Address
                </Text>
                <Input
                onChangeText={(value) => setAddress(value)}
                placeholder="Delivery Address"
                style={{ paddingHorizontal: 16 }}
                />
            <Button
            size="large"
            onPress={() => {
                if (
                firstName != "" &&
                lastName != "" &&
                contactNumber != "" &&
                address != ""
                ) {
                createUser(email, password, setMessage, (uid) => {
                    createUserProfile(
                    {
                        firstName,
                        lastName,
                        contactNumber,
                        address,
                    },
                    navigation
                    );
                });
                } else {
                setMessage("Credentials provided is not valid");
                }
            }}
            style={{
                marginLeft: 16,
                marginRight: 16,
                marginTop: 24,
                marginBottom: 24,
            }}
            >
            Submit
            </Button>
            {message == "" ? null : <PopUpMessage message={message} />}
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

export default AddressSettingsScreen;