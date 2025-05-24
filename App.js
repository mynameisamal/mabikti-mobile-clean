import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from './src/context/AuthContext';
import { Text } from 'react-native';
import { Image } from 'react-native';

import SplashScreen from './src/screens/SplashScreen'; 
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ContentScreen from './src/screens/ContentScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import ChatScreen from './src/screens/ChatScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 👉 Bottom Tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          height: 85, 
          paddingBottom: 20, 
          paddingTop: 6,      
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.6)',
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4, 
        },
        tabBarIconStyle: {
          marginTop: 6,
        },
      }}
    >
      <Tab.Screen
        name="Beranda"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/icons/home-dark.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.6)',
              }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Aktivitas" 
        component={ActivityScreen} 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/icons/aktivitas-dark.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.6)',
              }}
            />
          ) 
        }} 
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/icons/chat-dark.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.6)',
              }}
            />
          )
        }} 
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/icons/user-dark.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.6)',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// 👉 Aplikasi Utama
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
