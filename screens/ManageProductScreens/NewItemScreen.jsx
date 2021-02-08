import React, { useState, useEffect } from 'react';
import { Layout, Input, Text, Button, Card, Modal, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { postMyProduct, checkAuthenticated } from '../../services/firebase';

const NewItemScreen = ({navigation}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [weight, setWeight] = useState('');

    const [image, setImage] = useState(null);
    const [blob, setBlob] = useState(null);

    const [visible, setVisible] = useState(false);
    const [disabled, setDisabled] = useState(true);
    
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        checkAuthenticated(setUser, navigation)
    }, []);

    useEffect(() => {
        if (message) {
            setVisible(true);
        }
    }, [message]);

    const clearFields = () => {
        setTitle('');
        setDescription('');
        setPrice('');
        setImage(null);
        setStock('');
        setCategory([]);
        setBlob(null)
        setWeight('');
    }

    useEffect(() => {
        if (title != '' && description != '' && price != '' && image != null && stock != '' && category != [] && blob != null && weight != '') {
            setDisabled(false);
        } 
        else {
            setDisabled(true);
        }
        console.log(disabled);
    }, [title, description, price, image, blob, stock, category]);

    return (
        <ScrollView style={styles.container}>
            <Layout style={styles.inner}>
                <PreviewComponent title={title} description={description} price={price} image={image} setImage={setImage} setBlob={setBlob} />
                <Layout styles={styles.field}>
                    <Text category='label'>
                        Product Title
                    </Text>
                    <Input onChangeText={value => setTitle(value)} placeholder='Set Product Title' />
                </Layout>
                <Layout styles={styles.field}>
                    <Text category='label'>
                        Description
                    </Text>
                    <Input
                        multiline={true}
                        textStyle={{ minHeight: 64 }}
                        onChangeText={value => setDescription(value)}
                        placeholder='Describe your product here'
                    />
                </Layout>
                <Layout style={styles.field}>
                    <Text category='label'>
                        Categories
                    </Text>
                    <CategoryComponent category={category} setCategory={setCategory} />
                </Layout>
                <Layout styles={styles.field}>
                    <Text category='label'>
                        Price
                    </Text>
                    <Input 
                        keyboardType='decimal-pad'
                        onChangeText={value => setPrice(value)}
                        accessoryLeft={() => <Text category='label'>PHP</Text>} />
                </Layout>
                <Layout styles={styles.field}>
                    <Text category='label'>
                        Weight
                    </Text>
                    <Input 
                        keyboardType='decimal-pad'
                        onChangeText={value => setWeight(value)}
                        accessoryLeft={() => <Text category='label'>kg/pc</Text>}
                        placeholder='20'
                    />
                </Layout>
                <Layout styles={styles.field}>
                    <Text category='label'>
                        Stock Quantity
                    </Text>
                    <Input
                        keyboardType='decimal-pad'
                        onChangeText={value => setStock(value)}
                        placeholder='10'
                        accessoryLeft={() => <Text category='label'>pc(s)</Text>} />
                </Layout>
                <Layout style={styles.field}>
                    <Button 
                        disabled={disabled}
                        onPress={() => {
                            const productData = {
                                title,
                                description,
                                price,
                                stock,
                                weight,
                                vendor: user.uid
                            }
                            postMyProduct(productData, blob, setMessage, setVisible);
                            clearFields();
                        }}
                    >
                        Add New Product
                    </Button>
                </Layout>
                <MessageComponent visible={visible} setVisible={setVisible} message={message} />
            </Layout>
        </ScrollView>
    )
}

const CategoryComponent = ({category, setCategory}) => {

    const [selectedIndex, setSelectedIndex] = useState([])

    const categories = [
        'Food & Drinks',
        'Home Essentials',
        'Arts & Crafts',
        'Fashion & Wearables',
        'Beauty & Personal Care',
        'Health & Wellness',
        'Farm & Gardening'
    ];

    const groupDisplayValues = selectedIndex.map(index => {
        return categories[index.row];
    });

    const renderOption = (title) => (
        <SelectItem title={title}/>
    );

    useEffect(() => {
        setCategory(groupDisplayValues);
    }, [selectedIndex])
    
    return (
        <Select
            style={styles.select}
            size='medium'
            placeholder='Add Categories'
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
            multiSelect={true}
            value={groupDisplayValues.join(', ')}
        >
            {categories.map(renderOption)}
        </Select>
    )
}

const MessageComponent = ({message, visible, setVisible}) => {
    return (
        <Modal visible={visible}>
            <Card disabled={true}>
            <Text>{message}</Text>
            <Button onPress={() => {
                console.log(visible)
                setVisible(false)
            }}>
                Dismiss
            </Button>
            </Card>
        </Modal>
    )
}

const PreviewComponent = ({setImage, setBlob, image}) => {
    return (
        <Layout style={styles.field}>
            <Card>
                <Image source={{ uri: image }} style={{width: 200, height: 150, resizeMode: 'contain', marginVertical: 10, alignSelf: 'center', borderWidth: 1, borderColor: '#BDBDBD'}} />
                <ImagePickerComponent setImage={setImage} setBlob={setBlob} image={image} />
            </Card>
        </Layout>
    )
}

function ImagePickerComponent ({setImage, setBlob, image}) {
    
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
        const response = await fetch(result.uri);
        const blob = await response.blob();
        setBlob(blob);
      }
    };

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', marginVertical: 10 }}>
          <Button onPress={pickImage} size='small' appearance='outline'>
              {image != null ? 'Change Image' : 'Set Feature Image'}
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