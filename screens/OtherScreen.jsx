import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';

function KiannaScreen ({navigation}) {
    return(
        <Layout style={styles.container}>
            <Text category="h2">
                This is some large text
            </Text>
            <Button onPress={() => {
                navigation.navigate('Sample');
            }} size='medium'>
                Return to Main Page
            </Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
    }
})

export default KiannaScreen;