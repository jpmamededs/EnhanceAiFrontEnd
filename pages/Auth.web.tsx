import { View, Text, Image } from 'react-native';
import { useState } from 'react';
import AuthInputs from '@/components/authComponents/AuthInputs';
import PillBtn from '@/components/PillBtn';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@react-navigation/native';

function AuthWeb() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            await login(email, password);
            navigation.navigate('Home' as never);
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <View className="bg-enhance-black w-full h-full overflow-hidden">
            <View className="flex flex-col w-full h-full justify-center items-center px-6 py-4">
                <View className='flex flex-col w-fit items-center justify-center gap-6 sm:gap-8'>

                    <View className="flex flex-col w-fit gap-4 sm:gap-6 justify-center items-center">
                        <View className="flex flex-row gap-2 items-center justify-center">
                            <Image source={require('@/assets/sun.svg')} style={{ height: 30, width: 30 }} />
                            <Text className="text-lime-green font-space-grotesk-light text-4xl">Login</Text>
                        </View>

                        <Text className="w-[80%] sm:w-[60%] px-4 font-space-grotesk-light text-xl text-white text-center" style={{ textAlign: 'center' }}>
                            Welcome back. Let's go <Text className="font-space-grotesk-medium">enhance</Text> our prompting again!
                        </Text>
                    </View>

                    <View className="w-full sm:w-[60%] max-w-[80%]">
                        <AuthInputs
                            isLogin={true}
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                        />
                    </View>

                    <PillBtn text="Login Now" onPress={handleLogin} />

                </View>
            </View>
        </View>
    );
}

export default AuthWeb;