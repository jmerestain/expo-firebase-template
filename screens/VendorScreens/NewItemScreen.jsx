import React, { useState, useEffect } from 'react';
import { Layout, Input, Text, Button, Card } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { postMyItem } from '../../services/firebase';

const NewItemScreen = ({navigation}) => {

    const [title, setTitle] = useState('Title');
    const [description, setDescription] = useState('Description');
    const [price, setPrice] = useState(0);

    return (
        <Layout style={styles.container}>
            <Layout style={styles.inner}>
                <PreviewComponent title={title} description={description} price={price} />
                <Layout styles={styles.field}>
                    <Text category='label'>
                        Title
                    </Text>
                    <Input onChangeText={value => setTitle(value)} />
                </Layout>
                <Layout styles={styles.field}>
                    <Text category='label'>
                        Description
                    </Text>
                    <Input
                    multiline={true}
                    textStyle={{ minHeight: 64 }}
                    onChangeText={value => setDescription(value)} />
                </Layout>
                <Layout styles={styles.field}>
                    <Text category='label'>
                        Price
                    </Text>
                    <Input keyboardType='decimal-pad' onChangeText={value => setPrice(value)} />
                </Layout>
                <Layout style={styles.field}>
                    <Button status='success'>
                        Add New Product
                    </Button>
                </Layout>
            </Layout>
        </Layout>
    )
}

const PreviewComponent = ({title, description, price}) => {
    return (
        <Layout style={styles.field}>
            <Card>
                <Text category='label'>
                    PREVIEW
                </Text>
                <Text category='h4'>
                    {title ? title : ''}
                </Text>
                <Text style={{
                    marginVertical: 5,
                }}>
                    {description ? description : ''}
                </Text>
                <Text style={{
                    marginTop: 10
                }}>
                    PHP {price}
                </Text>
            </Card>
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
    }
})

export default NewItemScreen;