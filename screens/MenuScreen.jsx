import { useState } from "react";
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';

const MenuScreen = ({ navigation }) => {
    return (
        <Layout style={styles.container}>
            <Button>
                My Account
            </Button>
            <Button>
                My Shop
            </Button>
            <Button>
                Favorites
            </Button>
            <Button>
                Settings
            </Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    button: {
        backgroundColor: '#8A1214',
    }
})

export default MenuScreen;
