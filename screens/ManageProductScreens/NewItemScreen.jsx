import React, { useState, useEffect } from 'react';
import { Layout, Input, Text, Button, Card } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { postMyProduct, checkAuthenticated } from '../../services/firebase';

const NewItemScreen = ({navigation}) => {

    const [title, setTitle] = useState('Title');
    const [description, setDescription] = useState('Description');
    const [price, setPrice] = useState(0);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        checkAuthenticated(setUser, navigation)
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Layout style={styles.inner}>
                <PreviewComponent title={title} description={description} price={price} image={image} />
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
                <Layout styles={styles.field}>
                    <Text category='label'>
                        Stock Quantity
                    </Text>
                    <Input keyboardType='decimal-pad' />
                </Layout>
                <Layout style={styles.field}>
                    <ImagePickerComponent setImage={setImage} />
                    <Button onPress={() => {
                        const productData = {
                            title,
                            description,
                            price,
                            vendor: user.uid
                        }

                        postMyProduct(productData, setMessage);
                    }}>
                        Add New Product
                    </Button>
                </Layout>
                {message ? <MessageComponent message={message} /> : null}
            </Layout>
        </ScrollView>
    )
}

const MessageComponent = ({message}) => {
    return (
        <Layout style={styles.field}>
            <Card>
                <Text category="h4">
                    {message}
                </Text>
            </Card>
        </Layout>
    )
}

const PreviewComponent = ({title, description, price, image}) => {
    return (
        <Layout style={styles.field}>
            <Card>
                <Text category='label'>
                    PREVIEW
                </Text>
                <Image source={{ uri: image }} style={{width: 280, height: 210, resizeMode: 'contain', marginVertical: 10, alignSelf: 'center', borderWidth: 1, borderColor: '#BDBDBD'}} />
                <Text category='h4'>
                    {title ? title : ''}
                </Text>
                <Text>
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

function ImagePickerComponent ({setImage}) {
    
  
    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to add images');
          }
        }
      })();
    }, []);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', marginVertical: 10 }}>
          <Button onPress={pickImage}>
              Set Feature Image
          </Button>
        </Layout>
    );
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