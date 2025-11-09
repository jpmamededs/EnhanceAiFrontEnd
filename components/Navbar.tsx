import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { FaInfoCircle, FaHome } from "react-icons/fa";

function Navbar() {
    return (
        <SafeAreaView className="border-b border-white bg-enhance-black">
            <View className="flex-row items-center justify-between px-3 py-2 sm:px-6 sm:py-4">

                <View className="flex-row items-center">
                    <Image source={require('../assets/logo.svg')} className="w-3 h-3 sm:w-4 sm:h-4" resizeMode="contain"/>
                </View>

                <View className="flex-row items-center gap-1 sm:gap-4">
                    <TouchableOpacity className="px-2 py-1 sm:px-4 sm:py-2">
                        <View className="sm:hidden">
                            <FaHome color="white" size={18} />
                        </View>
                        <Text className="hidden sm:block font-space-grotesk-medium text-white">
                            Home
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity className="px-2 py-1 sm:px-4 sm:py-2">
                        <View className="sm:hidden">
                            <FaInfoCircle color="white" size={18} />
                        </View>
                        <Text className="hidden sm:block font-space-grotesk-medium text-white">
                            About
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity className="px-2 py-1 sm:px-4 sm:py-2 bg-lime-green rounded-lg">
                        <Text className="text-xs sm:text-base font-space-grotesk-medium text-enhance-black">
                            Get Started
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-2 py-1 sm:px-4 sm:py-2 border-lime-green border-2 rounded-lg">
                        <Text className="text-xs sm:text-base font-space-grotesk-medium text-lime-green">
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Navbar;