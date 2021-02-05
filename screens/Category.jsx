import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Text, Input, Icon, List, Avatar } from '@ui-kitten/components';

const SearchIcon = (props) => (
    <Icon name='search-outline' {...props} />
);

const renderItem = ({ item, index }) => (
  <Layout style={styles.item}>
    <Image
    style={{resizeMode: 'contain'}}
    source={require('./Rectangle_164.png')}/>
    <Layout style={{alignSelf: 'flex-start'}}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8, marginBottom: 4 }} >
        {item.product}
      </Text>
      <Text>
        {item.price}
      </Text>
    </Layout>
    <Layout style={{flexDirection: 'row', alignItems: 'center', marginTop: 8, alignSelf: 'flex-start' }}>
       <Avatar
          size="small"
          source={require('./avatar-icon.png')}
          style={{ marginRight: 8 }}
        /> 
      <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'rgb(138,18,20)' }}>
        {item.title}
      </Text>
    </Layout>
  </Layout>
); 

const data = new Array(8).fill({
    shop: 'Shop Name',
    price: 'P100.00',
    product: 'Cheeseburger',
});

 
const Category = ({navigation}) => {
    return (
      <Layout style={ styles.container }>
        <Layout style={styles.inner}>
          <Input
            onChangeText={value => setSearch(value)}
            placeholder='Search here'
            accessoryLeft={SearchIcon}
            style={{
              marginBottom: 10,
            }}
          />
          <List
            contentContainerStyle={styles.containerList}
            data={data}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={renderItem}
            style={{
              backgroundColor: 'transparent',
              flex: 1,
            }}
            columnWrapperStyle={{
              justifyContent: 'space-between'
            }}
          />
        </Layout>
      </Layout>
    )
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    inner: {
      flex: 1,
      marginHorizontal: 20,
      marginVertical: 10,
    },
    containerList: {
    },
    item: {
      width: '48%',
      marginBottom: 10,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
})


export default Category;