import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Input, Button, Text, Card, Icon } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import { createShop } from '../../services/firebase';
import PopUpMessage from '../../components/PopUpMessage';

const RegisterShopScreen = ({navigation}) => {
    const [businessName, setBusinessName] = useState('');
    const [fullName, setFullName] = useState('');
    const [ID, setID] = useState('');
    const [blob1, setBlob1] = useState('');
    const [blob2, setBlob2] = useState('');
    const [DTIcert, setDTIcert] = useState('');
    const [message, setMessage] = useState('');

    return (
        <Layout style={styles.container}>
            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular' }}>Business Name</Text>
            <Input
                onChangeText={value => setBusinessName(value)}
                placeholder='Registered Business Name'
                style={{ paddingHorizontal: 16}}
            />
            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular' }}>Owner Full Name</Text>
            <Input
                onChangeText={value => setFullName(value)}
                placeholder='Registered Full Name'
                style={{ paddingHorizontal: 16}}
            />
            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular', marginBottom: 4 }}>Valid ID</Text>
            <ImagePickerComponent image={ID} setImage={setID} setBlob={setBlob1} />
            <Text category='h6' style={{ padding: 16, fontFamily: 'NunitoSans-Regular', marginBottom: 4, marginTop: 16 }}>DTI Certification</Text>
            <ImagePickerComponent image={DTIcert} setImage={setDTIcert} setBlob={setBlob2} />
            <Button size='large'
            onPress={() => { 
                if(businessName != '' && fullName != '' && ID != '' && DTIcert != '') {
                    createShop(businessName, fullName, ID, DTIcert);
                    navigation.navigate('Confirm Register Shop');
                } else {
                    setMessage('Some parts may not have been filled up.');
                }
            }}
            style={{ marginLeft: 16, marginRight: 16, marginTop: 40}}>
                Register Shop
            </Button>
            {message == '' ? null : <PopUpMessage message={message} />}
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
        <Layout style={{}}>
          <Button onPress={pickImage} size='large' appearance='outline' color='rgb(186,186,186)' style={{borderColor: 'rgb(186,186,186)', backgroundColor: '#F3f3f3', marginHorizontal: 16}} 
          icon={ <Icon name="cloud-upload-outline" size={15} color='rgb(186,186,186)' />}>
              {image != null ? 'Change Image' : 'Upload Image'}
          </Button>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
})

export default RegisterShopScreen;