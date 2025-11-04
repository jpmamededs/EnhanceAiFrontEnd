import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';

function Navbar() {
    return (
        <SafeAreaView className="border-b border-white">
            <View className="flex-row items-center justify-between px-6 py-4">

                <View className="flex-row items-center">
                    <Image source={require('../assets/logo.svg')} className="w-4 h-4" resizeMode="contain"/>
                </View>

                <View className="flex-row items-center gap-4">
                    <TouchableOpacity className="px-4 py-2">
                        <Text className="font-space-grotesk-medium text-white">
                            Home
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity className="px-4 py-2">
                        <Text className="font-space-grotesk-medium text-white">
                            About
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity className="px-4 py-2 bg-lime-green rounded-lg">
                        <Text className="font-space-grotesk-medium text-enhance-black">
                            Get Started
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Navbar;