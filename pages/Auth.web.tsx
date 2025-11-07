import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

function AuthWeb() {
    return (
        <>
            <View className='min-w-full min-h-full bg-enhance-black flex justify-center items-center'>

                <View className='border-2 rounded rounded-xl border-lime-green flex flex-col items-left justify-center gap-8 px-8 py-4'>

                    <View className='flex flex-col gap-2 w-fit'>
                        <View className='flex flex-row justify-center items-center w-fit h-fit gap-2'>
                            <Image source={require('../assets/sun.svg')} style={{ width: 30, height: 30 }}/>
                            <Text className='font-space-grotesk-light text-lime-green text-4xl'>Login</Text>
                        </View>

                        <Text className='w-32 text-white font-space-grotesk-light'>fill all your data in the blocks below.</Text>
                    </View>

                    <View className='flex flex-col gap-2'>

                        <TextInput
                            placeholder='E-mail'
                            className='bg-medium-grey text-white px-2 py-2 rounded rounded-md font-space-grotesk-light focus:outline-none'
                        />

                        <TextInput
                            placeholder='Password'
                            secureTextEntry={true}
                            className='bg-medium-grey text-white px-2 py-2 rounded rounded-md font-space-grotesk-light focus:outline-none'
                        />

                        <TouchableOpacity className='w-fit'>
                            <Text className='text-light-blue underline text-center font-space-grotesk-light'>forgot my password</Text>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity className='w-full h-10 py-2 flex flex-row items-center justify-center bg-lime-green rounded rounded-full'>
                        <Text className='text-enhance-black font-space-grotesk-medium'>
                            Confirm
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </>
    )
}

export default AuthWeb;