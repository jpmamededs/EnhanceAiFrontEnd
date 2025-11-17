import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { FaInfoCircle, FaHome } from "react-icons/fa";
import { useNavigation } from '@react-navigation/native';

function Navbar() {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="border-b border-white bg-enhance-black">
            <View className="flex-row items-center justify-between px-4 py-3 sm:px-8 sm:py-4">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
                        <Image source={require('../assets/logo.svg')} className="w-6 h-6 sm:w-8 sm:h-8" resizeMode="contain"/>
                    </TouchableOpacity>
                </View>

                <View className="flex-row items-center gap-2 sm:gap-4">
                    <TouchableOpacity 
                        className="px-3 py-2 sm:px-4 sm:py-2"
                        onPress={() => navigation.navigate('Home' as never)}
                    >
                        <View className="sm:hidden">
                            <FaHome color="white" size={20} />
                        </View>
                        <Text className="hidden sm:block font-space-grotesk-medium text-white text-sm sm:text-base">
                            Home
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity className="px-3 py-2 sm:px-4 sm:py-2">
                        <View className="sm:hidden">
                            <FaInfoCircle color="white" size={20} />
                        </View>
                        <Text className="hidden sm:block font-space-grotesk-medium text-white text-sm sm:text-base">
                            About
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        className="px-3 py-2 sm:px-4 sm:py-2 bg-lime-green rounded-lg min-w-[80px] sm:min-w-[120px]"
                        onPress={() => navigation.navigate('Register' as never)}
                    >
                        <Text className="text-xs sm:text-base font-space-grotesk-medium text-enhance-black text-center">
                            Get Started
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className="px-3 py-2 sm:px-4 sm:py-2 border-lime-green border-2 rounded-lg min-w-[60px] sm:min-w-[80px]"
                        onPress={() => navigation.navigate('Auth' as never)}
                    >
                        <Text className="text-xs sm:text-base font-space-grotesk-medium text-lime-green text-center">
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Navbar;