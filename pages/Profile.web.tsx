import { View, Text, TouchableOpacity } from "react-native";
import { FaCircleInfo, FaChartLine, FaGear } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LoggedNavbar from "@/components/LoggedNavbar";
import { MdEdit } from "react-icons/md";
import NewExerciseActionsheet from "@/components/NewExerciseActionsheet";

type MenuOption = "profile" | "learning" | "settings";

function ProfileWeb() {
    const [selectedMenu, setSelectedMenu] = useState<MenuOption>("profile");
    const [showActionsheet, setShowActionsheet] = useState(false);
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case "profile":
                return (
                    <View>
                        <Text className="text-white font-space-grotesk-bold text-2xl mb-4">Profile Info</Text>
                        <View className="flex flex-row items-center gap-6 mt-8">
                            <View className="w-32 h-32 rounded-full bg-lime-green flex items-center justify-center">
                                <Text className="text-enhance-black font-space-grotesk-bold text-5xl">JD</Text>
                            </View>
                            <View className="flex flex-row items-center gap-4 flex-1">
                                <View className="flex-1">
                                    <View className="flex flex-row gap-2 w-fit items-center justify-center">
                                        <Text className="text-white font-space-grotesk-bold text-3xl">Nome Sobrenome</Text>
                                        <TouchableOpacity className="p-2 bg-lime-green/20 rounded-lg hover:bg-lime-green/30 transition-all">
                                            <MdEdit className="text-lime-green text-xl" />
                                        </TouchableOpacity>
                                    </View>
                                    <View className="flex flex-row gap-2 w-fit items-center justify-center mt-2">
                                        <Text className="text-gray-400 font-space-grotesk-light text-lg">@nomesobrenome</Text>
                                        <TouchableOpacity className="p-2 bg-lime-green/20 rounded-lg hover:bg-lime-green/30 transition-all">
                                            <MdEdit className="text-lime-green text-md" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            case "learning":
                return (
                    <View>
                        <Text className="text-white font-space-grotesk-bold text-2xl mb-4">Learning</Text>
                        <Text className="text-white font-space-grotesk-regular">Seu progresso de aprendizado</Text>
                    </View>
                );
            case "settings":
                return (
                    <View>
                        <Text className="text-white font-space-grotesk-bold text-2xl mb-4">Settings</Text>
                        <Text className="text-white font-space-grotesk-regular">Configurações da sua conta</Text>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View className="h-screen bg-enhance-black flex flex-col">
            <LoggedNavbar />
            <View className="flex-1 flex-row overflow-hidden">
                <View className="w-[20%] border-r border-white p-4 flex flex-col justify-between">
                    <View>
                        <View className="flex flex-row items-center justify-between w-full h-fit mb-6">
                            <Text className="text-white font-space-grotesk-medium text-xl">Menu</Text>
                            <TouchableOpacity className="bg-lime-green px-3 py-1 rounded-lg hover:bg-lime-green/80 transition-all" onPress={() => setShowActionsheet(true)} >
                                <Text className="font-space-grotesk-medium">Create exercise</Text>
                            </TouchableOpacity>
                        </View>


                        <TouchableOpacity
                            className="py-3"
                            onPress={() => setSelectedMenu("profile")}
                        >
                            <Text className={`text-lg font-space-grotesk-medium flex flex-row items-center ${selectedMenu === "profile" ? "text-lime-green" : "text-white"}`}>
                                <FaCircleInfo /> Profile info
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="py-3"
                            onPress={() => setSelectedMenu("learning")}
                        >
                            <Text className={`text-lg font-space-grotesk-medium flex flex-row items-center ${selectedMenu === "learning" ? "text-lime-green" : "text-white"}`}>
                                <FaChartLine /> Learning
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="py-3"
                            onPress={() => setSelectedMenu("settings")}
                        >
                            <Text className={`text-lg font-space-grotesk-medium flex flex-row items-center ${selectedMenu === "settings" ? "text-lime-green" : "text-white"}`}>
                                <FaGear /> Settings
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        className="px-4 py-2 border-lime-green border-2 rounded-lg hover:bg-enhance-red transition-all duration-300"
                        onPress={handleLogout}
                    >
                        <Text className="text-lime-green font-space-grotesk-medium text-center">
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="w-[80%] p-8 overflow-y-auto">
                    {renderContent()}
                </View>
            </View>
            <NewExerciseActionsheet 
                showActionsheet={showActionsheet}
                handleClose={() => setShowActionsheet(false)}
            />
        </View>
    );
}

export default ProfileWeb;