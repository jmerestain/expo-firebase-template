import React, {useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Input, Button, Text } from '@ui-kitten/components';

const VendorApplication = () => {
    return (
        <Layout>
            <Button>
                Upload DTI Certificate
            </Button>
            <Input
            placeholder='Vendor Name'
            />
            <Input
            placeholder='Vendor Description'
            />
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    }
})

export default VendorApplication;
