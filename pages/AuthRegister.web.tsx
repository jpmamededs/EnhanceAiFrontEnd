import { View, Text, Image } from "react-native"

function AuthRegisterWeb() {

    return (
        <View className="bg-enhance-black flex flex-row min-w-full min-h-full justify-left items-center">
            <View className='bg-red-600 w-1/2 min-h-full'>
            </View>
            <View className='flex flex-col gap-2 w-fit'>

                <View className="flex flex-col w-fit gap-6 justify-center items-center">
                    <View className="flex flex-row gap-2 items-center justify-center">
                        <Image source={require('@/assets/sun.svg')} style={{ height: 30, width: 30 }} />
                        <Text className="text-lime-green font-space-grotesk-light text-4xl">Register</Text>
                    </View>

                    <Text className="w-[60%] font-space-grotesk-light text-white text-center" style={{ textAlign: 'center' }}>
                        fill the fields below to start <Text className="font-space-grotesk-medium">enhancing</Text> your prompts
                    </Text>
                </View>

            </View>
        </View>
    )

}

export default AuthRegisterWeb;