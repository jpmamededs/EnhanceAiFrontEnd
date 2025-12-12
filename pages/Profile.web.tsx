import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { FaCircleInfo, FaChartLine, FaGear } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { useContext, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LoggedNavbar from "@/components/LoggedNavbar";
import { MdEdit } from "react-icons/md";
import NewExerciseActionsheet from "@/components/NewExerciseActionsheet";
import { AuthContext } from '@/context/AuthContext';
import Tag from '@/components/Tag';
import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
} from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';


type MenuOption = "profile" | "learning" | "settings";

function ProfileWeb() {
    const [selectedMenu, setSelectedMenu] = useState<MenuOption>("profile");
    const [showActionsheet, setShowActionsheet] = useState(false);
    const { logout } = useAuth();
    const  { user, loading }  =  useContext(AuthContext);

    // Estados para edição nas configurações
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [editedName, setEditedName] = useState("Nome Sobrenome");
    const [editedUsername, setEditedUsername] = useState(user?.username || "");
    const [editedPassword, setEditedPassword] = useState("");

    // Estados para switches
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [profileVisibility, setProfileVisibility] = useState(true);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [autoSaveProgress, setAutoSaveProgress] = useState(true);
    const [dailyReminders, setDailyReminders] = useState(true);
    const [showHints, setShowHints] = useState(false);
    const [shareProgress, setShareProgress] = useState(false);

    const idperson = user?.id;

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
                            <View className="relative group cursor-pointer">
                                <Avatar size="xl">
                                    <AvatarFallbackText>Nome Sobrenome</AvatarFallbackText>
                                    <AvatarImage
                                        source={require('@/assets/mainUserImg.png')}
                                    />
                                </Avatar>
                                <View className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-full">
                                    <MdEdit className="text-white text-3xl" />
                                </View>
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
                                        <Text className="text-gray-400 font-space-grotesk-light text-lg">@{user?.username}</Text>
                                        <TouchableOpacity className="p-2 bg-lime-green/20 rounded-lg hover:bg-lime-green/30 transition-all">
                                            <MdEdit className="text-lime-green text-md" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Exercises Section */}
                        <View className="flex flex-row gap-6 mt-12">
                            {/* Currently Enrolled Exercises */}
                            <View className="flex-1">
                                <View className="flex flex-row items-center justify-between mb-4">
                                    <Text className="text-white font-space-grotesk-bold text-xl">Currently Enrolled Exercises</Text>
                                    <TouchableOpacity>
                                        <Text className="text-lime-green font-space-grotesk-medium text-sm hover:underline">View all →</Text>
                                    </TouchableOpacity>
                                </View>
                                <View className="flex flex-col gap-4">
                                    {/* Placeholder for enrolled exercises */}
                                    <View className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
                                        <View className="flex flex-row items-center gap-2 mb-2">
                                            <Text className="text-white font-space-grotesk-medium text-lg">Exercise Title 1</Text>
                                            <Tag name="Code" />
                                        </View>
                                        <Text className="text-gray-400 font-space-grotesk-light text-sm mb-3">Description of the exercise...</Text>
                                        <View className="flex flex-row items-center gap-2">
                                            <View className="flex-1 bg-gray-700 rounded-full h-2">
                                                <View className="bg-lime-green rounded-full h-2" style={{ width: '60%' }} />
                                            </View>
                                            <Text className="text-gray-400 font-space-grotesk-light text-xs">60%</Text>
                                        </View>
                                    </View>
                                    
                                    <View className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
                                        <View className="flex flex-row items-center gap-2 mb-2">
                                            <Text className="text-white font-space-grotesk-medium text-lg">Exercise Title 2</Text>
                                            <Tag name="Text" />
                                        </View>
                                        <Text className="text-gray-400 font-space-grotesk-light text-sm mb-3">Description of the exercise...</Text>
                                        <View className="flex flex-row items-center gap-2">
                                            <View className="flex-1 bg-gray-700 rounded-full h-2">
                                                <View className="bg-lime-green rounded-full h-2" style={{ width: '30%' }} />
                                            </View>
                                            <Text className="text-gray-400 font-space-grotesk-light text-xs">30%</Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity className="bg-[#1a1a1a] p-4 rounded-lg border border-dashed border-gray-600 hover:border-lime-green transition-all flex items-center justify-center">
                                        <FaPlus className="text-gray-500 text-2xl mb-2" />
                                        <Text className="text-gray-500 font-space-grotesk-medium">Add New Exercise</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Done Exercises */}
                            <View className="w-[35%]">
                                <View className="flex flex-row items-center justify-between mb-4">
                                    <Text className="text-white font-space-grotesk-bold text-xl">Done Exercises</Text>
                                    <TouchableOpacity>
                                        <Text className="text-lime-green font-space-grotesk-medium text-sm hover:underline">View all →</Text>
                                    </TouchableOpacity>
                                </View>
                                <View className="flex flex-col gap-3">
                                    {/* Placeholder for done exercises */}
                                    <View className="bg-[#1a1a1a] p-3 rounded-lg border border-lime-green/30">
                                        <Text className="text-white font-space-grotesk-medium text-base mb-1">Completed Exercise 1</Text>
                                        <Text className="text-lime-green font-space-grotesk-light text-xs">✓ Completed</Text>
                                    </View>
                                    
                                    <View className="bg-[#1a1a1a] p-3 rounded-lg border border-lime-green/30">
                                        <Text className="text-white font-space-grotesk-medium text-base mb-1">Completed Exercise 2</Text>
                                        <Text className="text-lime-green font-space-grotesk-light text-xs">✓ Completed</Text>
                                    </View>

                                    <View className="bg-[#1a1a1a] p-3 rounded-lg border border-lime-green/30">
                                        <Text className="text-white font-space-grotesk-medium text-base mb-1">Completed Exercise 3</Text>
                                        <Text className="text-lime-green font-space-grotesk-light text-xs">✓ Completed</Text>
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
                        <Text className="text-white font-space-grotesk">Seu progresso de aprendizado {idperson}</Text>
                    </View>
                );
            case "settings":
                return (
                    <View>
                        <Text className="text-white font-space-grotesk-bold text-2xl mb-4">Settings</Text>
                        <View className="flex flex-row gap-8 mt-8">
                            {/* Coluna Esquerda - Profile Info */}
                            <View className="flex-1">
                                <View className="flex flex-row items-center justify-between mb-6">
                                    <Text className="text-white font-space-grotesk-medium text-lg">Personal Information</Text>
                                    {!isEditingInfo && (
                                        <TouchableOpacity 
                                            className="px-4 py-2 bg-lime-green/20 rounded-lg hover:bg-lime-green/30 transition-all flex flex-row items-center gap-2"
                                            onPress={() => setIsEditingInfo(true)}
                                        >
                                            <MdEdit className="text-lime-green text-md" />
                                            <Text className="text-lime-green font-space-grotesk-medium">Edit Info</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                
                                <View className="flex flex-row items-start gap-6">
                                    <View className="relative group cursor-pointer">
                                        <Avatar size="xl">
                                            <AvatarFallbackText>Nome Sobrenome</AvatarFallbackText>
                                            <AvatarImage
                                                source={require('@/assets/mainUserImg.png')}
                                            />
                                        </Avatar>
                                        {isEditingInfo && (
                                            <View className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-full">
                                                <MdEdit className="text-white text-3xl" />
                                            </View>
                                        )}
                                    </View>
                                    <View className="flex flex-col gap-3 flex-1">
                                        {/* Nome */}
                                        <View className="flex flex-row gap-2 items-center">
                                            <Text className="text-gray-400 font-space-grotesk-medium text-sm w-24">Name:</Text>
                                            {isEditingInfo ? (
                                                <TextInput
                                                    className="w-64 bg-[#1a1a1a] text-white font-space-grotesk-medium text-base px-3 py-1.5 rounded-lg border border-gray-700 focus:border-lime-green"
                                                    value={editedName}
                                                    onChangeText={setEditedName}
                                                    placeholder="Nome Sobrenome"
                                                    placeholderTextColor="#666"
                                                />
                                            ) : (
                                                <Text className="text-white font-space-grotesk-medium text-base">{editedName}</Text>
                                            )}
                                        </View>

                                        {/* Username */}
                                        <View className="flex flex-row gap-2 items-center">
                                            <Text className="text-gray-400 font-space-grotesk-medium text-sm w-24">Username:</Text>
                                            {isEditingInfo ? (
                                                <TextInput
                                                    className="w-64 bg-[#1a1a1a] text-white font-space-grotesk-medium text-base px-3 py-1.5 rounded-lg border border-gray-700 focus:border-lime-green"
                                                    value={editedUsername}
                                                    onChangeText={setEditedUsername}
                                                    placeholder={user?.username || "username"}
                                                    placeholderTextColor="#666"
                                                />
                                            ) : (
                                                <Text className="text-white font-space-grotesk-medium text-base">@{editedUsername}</Text>
                                            )}
                                        </View>

                                        {/* Password */}
                                        <View className="flex flex-row gap-2 items-center">
                                            <Text className="text-gray-400 font-space-grotesk-medium text-sm w-24">Password:</Text>
                                            {isEditingInfo ? (
                                                <TextInput
                                                    className="w-64 bg-[#1a1a1a] text-white font-space-grotesk-medium text-base px-3 py-1.5 rounded-lg border border-gray-700 focus:border-lime-green"
                                                    value={editedPassword}
                                                    onChangeText={setEditedPassword}
                                                    placeholder="••••••••"
                                                    placeholderTextColor="#666"
                                                    secureTextEntry
                                                />
                                            ) : (
                                                <Text className="text-white font-space-grotesk-medium text-base">••••••••</Text>
                                            )}
                                        </View>

                                        {/* Save/Cancel Buttons */}
                                        {isEditingInfo && (
                                            <View className="flex flex-row gap-2 ml-[104px] mt-2">
                                                <TouchableOpacity 
                                                    className="px-6 py-2 bg-lime-green rounded-lg hover:bg-lime-green/80 transition-all"
                                                    onPress={() => {
                                                        // Aqui você salvaria as alterações
                                                        console.log('Saving changes...');
                                                        setIsEditingInfo(false);
                                                    }}
                                                >
                                                    <Text className="text-enhance-black font-space-grotesk-medium">Save</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity 
                                                    className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
                                                    onPress={() => setIsEditingInfo(false)}
                                                >
                                                    <Text className="text-white font-space-grotesk-medium">Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>

                            {/* Coluna Direita - Settings */}
                            <View className="w-[40%] flex flex-col gap-6">
                                {/* General Settings */}
                                <View>
                                    <Text className="text-white font-space-grotesk-medium text-lg mb-4">General Settings</Text>
                                    <View className="bg-[#1a1a1a] rounded-lg border border-gray-700 p-4">
                                        <View className="flex flex-row items-center justify-between py-3 border-b border-gray-700">
                                            <Text className="text-white font-space-grotesk text-sm">Email Notifications</Text>
                                            <Switch 
                                                value={emailNotifications} 
                                                onValueChange={setEmailNotifications}
                                                trackColor={{ false: '#4b5563', true: '#bef264' }}
                                                thumbColor="#ffffff"
                                            />
                                        </View>
                                        <View className="flex flex-row items-center justify-between py-3 border-b border-gray-700">
                                            <Text className="text-white font-space-grotesk text-sm">Push Notifications</Text>
                                            <Switch 
                                                value={pushNotifications} 
                                                onValueChange={setPushNotifications}
                                                trackColor={{ false: '#4b5563', true: '#bef264' }}
                                                thumbColor="#ffffff"
                                            />
                                        </View>
                                        <View className="flex flex-row items-center justify-between py-3 border-b border-gray-700">
                                            <Text className="text-white font-space-grotesk text-sm">Profile Visibility</Text>
                                            <Switch 
                                                value={profileVisibility} 
                                                onValueChange={setProfileVisibility}
                                                trackColor={{ false: '#4b5563', true: '#bef264' }}
                                                thumbColor="#ffffff"
                                            />
                                        </View>
                                        <View className="flex flex-row items-center justify-between py-3">
                                            <Text className="text-white font-space-grotesk text-sm">Two-Factor Authentication</Text>
                                            <Switch 
                                                value={twoFactorAuth} 
                                                onValueChange={setTwoFactorAuth}
                                                trackColor={{ false: '#4b5563', true: '#bef264' }}
                                                thumbColor="#ffffff"
                                            />
                                        </View>
                                    </View>
                                </View>

                                {/* Exercise Settings */}
                                <View>
                                    <Text className="text-white font-space-grotesk-medium text-lg mb-4">Exercise Settings</Text>
                                    <View className="bg-[#1a1a1a] rounded-lg border border-gray-700 p-4">
                                        <View className="flex flex-row items-center justify-between py-3 border-b border-gray-700">
                                            <Text className="text-white font-space-grotesk text-sm">Auto-save Progress</Text>
                                            <Switch 
                                                value={autoSaveProgress} 
                                                onValueChange={setAutoSaveProgress}
                                                trackColor={{ false: '#4b5563', true: '#bef264' }}
                                                thumbColor="#ffffff"
                                            />
                                        </View>
                                        <View className="flex flex-row items-center justify-between py-3 border-b border-gray-700">
                                            <Text className="text-white font-space-grotesk text-sm">Daily Exercise Reminders</Text>
                                            <Switch 
                                                value={dailyReminders} 
                                                onValueChange={setDailyReminders}
                                                trackColor={{ false: '#4b5563', true: '#bef264' }}
                                                thumbColor="#ffffff"
                                            />
                                        </View>
                                        <View className="flex flex-row items-center justify-between py-3 border-b border-gray-700">
                                            <Text className="text-white font-space-grotesk text-sm">Show Hints</Text>
                                            <Switch 
                                                value={showHints} 
                                                onValueChange={setShowHints}
                                                trackColor={{ false: '#4b5563', true: '#bef264' }}
                                                thumbColor="#ffffff"
                                            />
                                        </View>
                                        <View className="flex flex-row items-center justify-between py-3">
                                            <Text className="text-white font-space-grotesk text-sm">Share Progress Publicly</Text>
                                            <Switch 
                                                value={shareProgress} 
                                                onValueChange={setShareProgress}
                                                trackColor={{ false: '#4b5563', true: '#bef264' }}
                                                thumbColor="#ffffff"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View className="h-screen bg-enhance-black flex flex-col" style={{ ['--scrollbar-thumb-color' as any]: '#ffffff' }}>
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
                            className="py-3 flex-row items-center gap-2"
                            onPress={() => setSelectedMenu("profile")}
                        >
                            <FaCircleInfo className={selectedMenu === "profile" ? "text-lime-green" : "text-white"} />
                            <Text className={`text-lg font-space-grotesk-medium ${selectedMenu === "profile" ? "text-lime-green" : "text-white"}`}>
                                Profile info
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="py-3 flex-row items-center gap-2"
                            onPress={() => setSelectedMenu("learning")}
                        >
                            <FaChartLine className={selectedMenu === "learning" ? "text-lime-green" : "text-white"} />
                            <Text className={`text-lg font-space-grotesk-medium ${selectedMenu === "learning" ? "text-lime-green" : "text-white"}`}>
                                Learning
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="py-3 flex-row items-center gap-2"
                            onPress={() => setSelectedMenu("settings")}
                        >
                            <FaGear className={selectedMenu === "settings" ? "text-lime-green" : "text-white"} />
                            <Text className={`text-lg font-space-grotesk-medium ${selectedMenu === "settings" ? "text-lime-green" : "text-white"}`}>
                                Settings
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