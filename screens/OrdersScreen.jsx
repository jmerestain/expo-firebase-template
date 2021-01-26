import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Button, List, ButtonGroup } from '@ui-kitten/components';

function OrdersScreen ({navigation}) {
    return(
        <Layout style={styles.container}>
            <Layout style={styles.inner}>
                <Layout style={styles.field}>
                <ButtonGroup style={styles.buttonGroup} appearance='filled' status='basic'>
                    <Button>To Pay</Button>
                    <Button>Delivering</Button>
                    <Button>Completed</Button>
                </ButtonGroup>
                </Layout>
                <Layout style={styles.field}>
                    <Text category='label'>
                        
                    </Text>
                </Layout>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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

export default OrdersScreen;