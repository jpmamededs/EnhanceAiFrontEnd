import { View, Text, Image, TextInput } from "react-native"
import { useState } from "react";
import PillBtn from "@/components/PillBtn";
import AuthInputs from "@/components/authComponents/AuthInputs";
import { useAuth } from '@/context/AuthContext';

function AuthRegisterWeb() {
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await register(username, email, password);
        } catch (err) {
            console.error('Register failed:', err);
        }
    };

    return (
        <View className="bg-enhance-black flex flex-row min-w-full min-h-full justify-center items-center">
            <View className='flex flex-col w-fit items-center justify-center gap-8'>

                <View className="flex flex-col w-fit gap-6 justify-center items-center">
                    <View className="flex flex-row gap-2 items-center justify-center">
                        <Image source={require('@/assets/sun.svg')} style={{ height: 30, width: 30 }} />
                        <Text className="text-lime-green font-space-grotesk-light text-4xl">Register</Text>
                    </View>

                    <Text className="w-[60%] font-space-grotesk-light text-xl text-white text-center" style={{ textAlign: 'center' }}>
                        fill the fields below to start <Text className="font-space-grotesk-medium">enhancing</Text> your prompts
                    </Text>
                </View>

                <AuthInputs
                    isLogin={false}
                    username={username}
                    email={email}
                    password={password}
                    setUsername={setUsername}
                    setEmail={setEmail}
                    setPassword={setPassword}
                />

                <PillBtn text="Register Now" onPress={handleRegister} />


            </View>
        </View>
    )

}

export default AuthRegisterWeb;