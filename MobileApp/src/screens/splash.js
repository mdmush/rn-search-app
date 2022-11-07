import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RED} from '../constants';

export default function Splashscreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('home');
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white flex-1 px-4" style={{backgroundColor: RED}}>
        <View className="flex-1 justify-center items-center">
          <Text className="text-[30px] font-bold text-white">
            Welcome to SearchApp
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
