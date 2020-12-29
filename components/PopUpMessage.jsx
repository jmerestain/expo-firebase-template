import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

const PopUpMessage = (props) => {
    return (
        <Layout style={styles.popUpMessage}>
            <Text style={{
                textAlign: 'center',
            }}>
                { props.message }
            </Text>
        </Layout>
    )
}

const styles = StyleSheet.create({
    popUpMessage: {

    }
})

export default PopUpMessage;