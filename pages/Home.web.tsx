import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { FaArrowRight } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import LoggedNavbar from "@/components/LoggedNavbar";
import LandingCard from "../components/LandingCard";
import { useAuth } from "@/context/AuthContext";

function HomeWeb() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated ? <LoggedNavbar /> : <Navbar />}
            <ScrollView className="flex flex-col w-full min-h-screen bg-enhance-black">
                <View className="flex flex-col sm:flex-row w-full min-h-[80vh] bg-blue-600 items-center justify-center gap-4 sm:gap-0 px-4 py-8 sm:px-0 sm:py-0">
                    <View className="w-full bg-green-600 sm:w-1/2 flex flex-col justify-center gap-4 sm:gap-8 p-4 sm:p-8 h-fit">
                        <Text className="font-space-grotesk-medium text-2xl sm:text-3xl md:text-4xl text-lime-green w-full">A new era arrived.
                            <Text className="font-space-grotesk-light text-lime-green flex text-xl sm:text-2xl md:text-4xl">Enhance your capabilities with AI with the best tool out there</Text>
                        </Text>
                        <Text className="font-space-grotesk-light text-white text-base sm:text-xl md:text-3xl w-full">
                            Write prompts, improve your skills and live technology upon your screen
                        </Text>
                        <TouchableOpacity className="bg-lime-green rounded-full p-2 flex flex-row items-center justify-between w-full sm:w-[60%] mt-2 sm:mt-0">
                            <Text className="text-enhance-black font-space-grotesk-medium text-base sm:text-lg md:text-xl ml-2 sm:ml-4">
                                register now
                            </Text>
                            <View className="flex flex-col p-2 sm:p-4 rounded-full bg-enhance-black w-fit h-fit">
                                <FaArrowRight className="text-white text-sm sm:text-base" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className="bg-red-600 w-full sm:w-1/2 flex items-center justify-center h-48 sm:h-64 md:h-96 mt-4 sm:mt-0">
                        <Text className="text-white text-xl sm:text-2xl md:text-3xl">Hi</Text>
                    </View>
                </View>

                {/* Nova section verde */}
                <View className="bg-green-600 w-full min-h-[40vh] flex items-center justify-center mt-4 px-4 py-8">
                    <Text className="text-white text-2xl sm:text-3xl">Section Verde</Text>
                </View>
            </ScrollView>
        </>
    )
}

export default HomeWeb;