import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Text, Input, Icon, List, Avatar, Button } from '@ui-kitten/components';

const SearchIcon = (props) => (
  <Icon name='search-outline' {...props} />
);

const GroupScreen = ({navigation}) => {
    
    const renderItem = ({ item, index }) => (
        <Layout style={styles.item}>
          <Image
          style={{resizeMode: 'contain'}}
          source={require('../../screens/Rectangle_164.png')}/>
          <Layout style={{alignSelf: 'flex-start'}}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8 }} >
              {item.group}
            </Text>
            <Layout style={{flexDirection: 'row', marginVertical: 6}}>
            <Text category='s2' style={{ color:'rgb(186,186,186)'}}>
              {item.memberCount} members
            </Text>
            <Text category='s2' style={{ color:'rgb(186,186,186)', marginHorizontal: 3}}>
               • 
            </Text>
            <Text category='s2' style={{ color:'rgb(186,186,186)'}}>
              {item.postCount} posts
            </Text>
            </Layout>
            <Text>
              {item.description}
            </Text>
            
          </Layout>
        </Layout>
      ); 
      
      const data = new Array(8).fill({
          group: 'Seller\'s Community',
          description: 'All merchant problems and solutions found here...',
          memberCount: '199',
          postCount: '1843'
      });
      
          return (
            <Layout style={ styles.container }>
              <Input
                onChangeText={value => setSearch(value)}
                placeholder='Search here'
                style={{ paddingHorizontal: 16, paddingVertical: 12}}
                accessoryLeft={SearchIcon}
            />
              <Layout style={styles.inner}>
                <Text category='h6' style={{marginBottom: 12}}>Featured Groups</Text>
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
                <Button
                onPress={() => {
                  navigation.navigate('Group');
                }}
                style={{marginVertical:24}}>
                  Sample Forum Post
                </Button>
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
          marginHorizontal: 12,
        },
        containerList: {
        },
        item: {
          width: '48%',
          marginBottom: 16,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-start'
        },
    })

export default GroupScreen;