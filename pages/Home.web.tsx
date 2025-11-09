import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { FaArrowRight } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import LandingCard from "../components/LandingCard";

function HomeWeb() {
    return (
        <>
            <Navbar />
            <ScrollView className="flex flex-col w-full min-h-screen bg-enhance-black">
                <View className="flex flex-col sm:flex-row w-full h-[80%] bg-blue-600 items-center justify-center gap-4 sm:gap-0">
                    <View className="w-fit bg-green-600 sm:w-1/2 flex flex-col justify-center gap-4 sm:gap-8 p-4 sm:p-8 h-fit">
                        <Text className="font-space-grotesk-medium text-3xl sm:text-4xl text-lime-green w-full sm:w-[60%]">A new era arrived.
                            <Text className="font-space-grotesk-light text-lime-green flex text-2xl sm:text-4xl">Enhance your capabilities with AI with the best tool out there</Text>
                        </Text>
                        <Text className="font-space-grotesk-light text-white text-xl sm:text-3xl w-full sm:w-[60%]">
                            Write prompts, improve your skills and live technology upon your screen
                        </Text>
                        <TouchableOpacity className="bg-lime-green rounded-full p-2 flex flex-row items-center justify-between w-full sm:w-[60%] mt-2 sm:mt-0">
                            <Text className="text-enhance-black font-space-grotesk-medium text-lg sm:text-xl ml-2 sm:ml-4">
                                register now
                            </Text>
                            <View className="flex flex-col p-2 sm:p-4 rounded-full bg-enhance-black w-fit h-fit">
                                <FaArrowRight className="text-white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className="bg-red-600 w-full sm:w-1/2 flex items-center justify-center h-40 sm:h-fit mt-4 sm:mt-0">
                        <Text className="text-white text-2xl sm:text-3xl">Hi</Text>
                    </View>
                </View>

                {/* Nova section verde */}
                <View className="bg-green-600 w-full min-h-[40vh] flex items-center justify-center mt-4">
                    <Text className="text-white text-3xl">Section Verde</Text>
                </View>
            </ScrollView>
        </>
    )
}

export default HomeWeb;