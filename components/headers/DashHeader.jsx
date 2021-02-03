import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Icon } from '@ui-kitten/components';
import { signOutUser } from '../../services/firebase';
import { useNavigation } from '@react-navigation/native';

const DashHeader = () => {
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => {
                    signOutUser(navigation);
                }}>
                    <Icon 
                        style={styles.icon}
                        fill='white'
                        name='log-out-outline'
                    />
                </TouchableOpacity>
                <Input 
                style={styles.input}
                placeholder="Search..."
                onChangeText={value => setSearch(value)} />
                <TouchableOpacity onPress={() => {navigation.navigate("Orders")}}>
                <Icon
                    style={styles.icon}
                    fill='white'
                    name='shopping-cart-outline'
                />
                </TouchableOpacity>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
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
        flexGrow: 1,
        marginHorizontal: 15,
    }
})

export default DashHeader;