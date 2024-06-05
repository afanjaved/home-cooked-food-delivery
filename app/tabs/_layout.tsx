import React from 'react';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Order') {
            iconName = focused ? 'list' : 'list-alt';
          } else if (route.name === 'Products') {
            iconName = focused ? 'cart-plus' : 'shopping-cart';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'bars' : 'navicon';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
        headerTitle: route.name 
      })}
    >
      <Tabs.Screen name="Order" />
      <Tabs.Screen name="Products" />
      <Tabs.Screen name="Menu" />
    </Tabs>
  );
}
