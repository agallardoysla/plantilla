import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';

import VideoOneScreen from '../screens/toolspost/VideoOneScreen';

import ImageTwoScreen from '../screens/toolspost/ImageTwoScreen';
import VideoTwoScreen from '../screens/toolspost/VideoTwoScreen';


const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Video 1" component={VideoOneScreen} />
      <Tab.Screen name="Imagen 2" component={ImageTwoScreen} />
      <Tab.Screen name="Video 2" component={VideoTwoScreen} />
    </Tab.Navigator>
  );
}
