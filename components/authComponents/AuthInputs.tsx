import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
/* ------------------------------------ */
import { LuEye, LuEyeClosed, LuLockKeyhole, LuMail } from "react-icons/lu";
import { IoIosAt } from "react-icons/io";


interface AuthInputsProps {
    isLogin: boolean;
}

function AuthInputs({ isLogin }: AuthInputsProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    return (
        <View className='flex flex-col gap-2'>
            <View className='flex flex-row items-center justify-center bg-medium-grey px-4 py-1 rounded rounded-md'>
                <LuMail className='text-lightiest-grey' />
                <TextInput
                    placeholder='E-mail'
                    className='text-white px-2 py-2 rounded rounded-md font-space-grotesk-light focus:outline-none pr-10 flex-1 bg-transparent'
                />
            </View>
            {/* Campo de Username */}
            <View className='flex flex-row items-center justify-center bg-medium-grey px-4 py-1 rounded rounded-md mt-2'>
                <IoIosAt className='text-lightiest-grey' />
                <TextInput
                    placeholder='Username'
                    className='text-white px-2 py-2 rounded rounded-md font-space-grotesk-light focus:outline-none pr-10 flex-1 bg-transparent'
                />
            </View>
            <View className='flex flex-row items-center justify-center bg-medium-grey px-4 py-1 rounded rounded-md mt-2'>
                <LuLockKeyhole className='text-lightiest-grey' />
                <TextInput
                    placeholder='Password'
                    secureTextEntry={!isPasswordVisible}
                    className='text-white px-2 py-2 rounded rounded-md font-space-grotesk-light focus:outline-none pr-10 flex-1 bg-transparent'
                />
                <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                    {isPasswordVisible ? <LuEye className='text-lightiest-grey' /> : <LuEyeClosed className='text-lightiest-grey' />}
                </TouchableOpacity>
            </View>

            {isLogin && (
                <TouchableOpacity className='w-fit'>
                    <Text className='text-light-blue underline text-center font-space-grotesk-light'>forgot my password</Text>
                </TouchableOpacity>
            )}

            {!isLogin && (
                <View className='flex flex-row items-center justify-center bg-medium-grey px-4 py-1 rounded rounded-md mt-2'>
                    <LuLockKeyhole className='text-lightiest-grey' />
                    <TextInput
                        placeholder='Confirm password'
                        secureTextEntry={!isConfirmPasswordVisible}
                        className='text-white px-2 py-2 rounded rounded-md font-space-grotesk-light focus:outline-none pr-10 flex-1 bg-transparent'
                    />
                    <TouchableOpacity
                        onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    >
                        {isConfirmPasswordVisible ? <LuEye className='text-lightiest-grey' /> : <LuEyeClosed className='text-lightiest-grey' />}
                    </TouchableOpacity>
                </View>
            )}

        </View>
    )
}

export default AuthInputs;