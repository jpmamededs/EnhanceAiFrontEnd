import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { FaArrowRight } from "react-icons/fa";

function HomeWeb(){
    return (
    <ScrollView className="flex flex-col w-full min-h-screen bg-enhance-black px-8 py-4">
            <View className="flex flex-row w-full h-fit items-center justify-center">
                <View className="bg-blue-600 flex-1 flex justify-center gap-8 h-fit">
                    <Text className="font-space-grotesk-medium text-5xl text-lime-green w-[60%]">A new era arrived.
                        <Text className="font-space-grotesk-light text-lime-green flex text-5xl">Enhance your capabilities with AI with the best tool out there</Text>
                    </Text>
                    <Text className="font-space-grotesk-light text-white text-3xl w-[60%]">
                        Write prompts, improve your skills and live technology upon your screen
                    </Text>
                    <TouchableOpacity className="bg-lime-green rounded rounded-full p-2 flex flex-row items-center justify-between w-96">
                        <Text className="text-enhance-black font-space-grotesk-medium text-xl ml-4">
                            register now
                        </Text>
                        <View className="flex flex-col p-4 rounded rounded-full bg-enhance-black w-fit h-fit">
                            <FaArrowRight className="text-white" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="bg-red-600 flex-1 flex items-center justify-center h-fit">
                    <Text className="text-white text-3xl">Hi</Text>
                </View>
            </View>

            {/* Nova section verde */}
            <View className="bg-green-600 w-full min-h-[40vh] flex items-center justify-center mt-4">
                <Text className="text-white text-3xl">Section Verde</Text>
            </View>
        </ScrollView>
    )
}

export default HomeWeb;