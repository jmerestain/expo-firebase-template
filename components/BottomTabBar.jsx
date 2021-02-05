import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Layout, Text, Divider, Icon } from '@ui-kitten/components';

function BottomTabBar ({ state, descriptors, navigation }) {
  return (
    <Layout style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        let iconName;

        // Getting Icon Name for TabBarIcon

        if (label === 'Dashboard') {
            iconName = 'home-outline';
        } else if (label === 'Orders') {
            iconName = 'shopping-bag-outline';
        } else if (label === 'Vendor') {
            iconName = 'menu-outline';
        } else {
            iconName = 'question-mark-outline';
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
            <TouchableOpacity
                key={label}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ flex: 1, alignItems: "center", flexDirection: 'column' }}
            >
                <Layout style={{backgroundColor: isFocused ? '#8A1214' : '#BDBDBD', height: 2, width: '100%', alignSelf: 'flex-start'}} />
                <Icon name={iconName} fill={isFocused ? '#8A1214' : '#BDBDBD' } style={{height: 30, width: 30}} />
                <Text
                    category='c2'
                    style={{ color: isFocused ? '#8A1214' : '#BDBDBD' }}
                >
                    {label}
                </Text>
            </TouchableOpacity>
        );
      })}
    </Layout>
  );
}

const styles = StyleSheet.create({
    tabBar: { 
        flexDirection: 'row',
        height: 50,
        justifyContent: "center",
        alignItems: "center" ,
    },
})

export default BottomTabBar;