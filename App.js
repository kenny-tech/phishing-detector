import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/Home';
import AboutScreen from './screens/About';
import WelcomeScreen from './screens/Welcome';
import SignupScreen from './screens/Signup';
import SigninScreen from './screens/Signin';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home" component={HomeScreen}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#00a0dd',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused
              ? 'ios-home'
              : 'ios-home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00a0dd',
          tabBarInactiveTintColor: 'gray',
          headerShown: true, 
        }} />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
          headerStyle: {
            backgroundColor: '#00a0dd',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00a0dd',
          tabBarInactiveTintColor: 'gray',
        }} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={BottomTab}
          options={{ 
            headerShown: false, 
            headerStyle: {
              backgroundColor: '#f4511e',
            },
          }}
        />
        <Stack.Screen
          name="Welcome1"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen 
            name="Signin" 
            component={SigninScreen} 
            options={{ 
              headerShown: true, 
              headerTitle: ""
            }}/>
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen}
          options={{ 
            headerShown: true, 
            headerTitle: ""
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;