import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { 
  Layout, Text, Input, Button, Icon,
  ListItem, List, Avatar, Card, Divider 
} from '@ui-kitten/components';

const SearchIcon = (props) => (
    <Icon name='search-outline' {...props} />
);

const renderItem = ({ item, index }) => (
  <Card style={styles.item}>
    <Image 
    source={require('./Rectangle_164.png')}/>
    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8, marginBottom: 4 }} >{item.product}</Text>
    <Text>{item.price}</Text>
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
       <Avatar
          size="small"
          source={require('./avatar-icon.png')}
          style={{ marginRight: 8 }}
        /> 
      <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'rgb(138,18,20)' }}>{item.title}</Text>
    </View>
  </Card>
); 

const data = new Array(8).fill({
    title: 'Shop Name',
    price: 'P100.00',
    product: 'Cheeseburger',
});

 
const Category = ({navigation}) => {
    return (
      <Layout style={ styles.container }>
        <Input
          onChangeText={value => setSearch(value)}
          placeholder='Search here'
          style={{ paddingHorizontal: 16}}
          accessoryLeft={SearchIcon}
        />
        <List
          contentContainerStyle={styles.containerList}
          data={data}
          numColumns={2}
          renderItem={renderItem}
        />
      </Layout>
    )
}
  
const styles = StyleSheet.create({
    container: {
      paddingVertical: 8,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    containerList: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start'
    },
    item: {
      width: '50%',
      alignItems: 'center',
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0,
      shadowRadius: 0
    },
})


export default Category;