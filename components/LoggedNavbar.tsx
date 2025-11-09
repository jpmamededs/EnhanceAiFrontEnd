import { SafeAreaView, View, Image, TouchableOpacity, Text, Touchable } from "react-native";
import { PiBellBold } from "react-icons/pi";
import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
} from '@/components/ui/avatar';

function LoggedNavbar() {
    return (
        <SafeAreaView className="bg-enhance-black">
            <View className="flex-row items-center justify-end px-3 py-2 sm:px-6 sm:py-4 w-full">
                <View className="flex flex-row gap-8 items-center">
                    <TouchableOpacity>
                        <PiBellBold size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Avatar size="md">
                            <AvatarFallbackText>Jane Doe</AvatarFallbackText>
                            <AvatarImage
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                                }}
                            />
                        </Avatar>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoggedNavbar;