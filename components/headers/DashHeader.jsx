import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Input, Icon, TopNavigation, Layout } from '@ui-kitten/components';
import { signOutUser } from '../../services/users';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

const SignOutButton = ({navigation}) => (
    <TouchableOpacity onPress={() => {
        signOutUser(navigation);
    }}>
        <Icon 
            style={styles.icon}
            fill='white'
            name='log-out-outline'
        />
    </TouchableOpacity>
)

const MessagesButton = ({navigation}) => (
    <TouchableOpacity onPress={() => {
        navigation.navigate("Inbox")
    }}>
        <Icon
            style={styles.icon}
            fill='white'
            name='message-circle-outline'
        />
    </TouchableOpacity>
)

const SearchBar = ({setSearch}) => (
    <Layout style={{flexDirection: 'row', backgroundColor: 'transparent', flexGrow: 1}}>
        <Input 
            style={styles.input}
            placeholder="Search..."
            onChangeText={value => setSearch(value)}
        />
    </Layout>
)

const DashHeader = () => {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    return (
            <TopNavigation
                style={styles.container}
                accessoryLeft={SignOutButton}
                accessoryRight={(props) => <MessagesButton {...props} navigation={navigation} />}
                title={() => <SearchBar setSearch={setSearch} />}
                alignment='start'
            />
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: Constants.statusBarHeight+5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#8A1214',
    },
    icon: {
        width: 32,
        height: 32,
    },
    input: {
        width: '80%',
        marginLeft: "auto",
        marginRight: "auto",
    }
})

export default DashHeader;