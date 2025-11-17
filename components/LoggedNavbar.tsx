import { SafeAreaView, View, Image, TouchableOpacity, Text, Touchable } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { PiBellBold } from "react-icons/pi";
import { useNavigation } from "@react-navigation/native";
import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
} from '@/components/ui/avatar';

function LoggedNavbar() {
    
    const { logout } = useAuth();
    const navigation = useNavigation();

    const handleLogout = async () => {
        await logout();
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    };

    const handleProfileClick = () => {
        navigation.navigate('Profile' as never);
    };

    return (
        <SafeAreaView className="bg-enhance-black border-b border-white w-full">
            <View className="flex-row items-center justify-end px-3 py-2 sm:px-6 sm:py-4 w-full">
                <View className="flex flex-row gap-8 items-center">
                    <TouchableOpacity>
                        <PiBellBold size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleProfileClick}>
                        <Avatar size="md">
                            <AvatarFallbackText>Jane Doe</AvatarFallbackText>
                            <AvatarImage
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                                }}
                            />
                        </Avatar>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-2 py-1 sm:px-4 sm:py-2 border-lime-green border-2 rounded-lg" onPress={handleLogout}>
                        <Text className="text-xs sm:text-base font-space-grotesk-medium text-lime-green">
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoggedNavbar;