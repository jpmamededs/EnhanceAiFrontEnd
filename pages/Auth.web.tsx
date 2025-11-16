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
        <View className='min-w-full min-h-full bg-enhance-black flex justify-center items-center'>
            <View className='border-2 rounded-xl border-lime-green flex flex-col items-center justify-center gap-8 px-8 py-4'>
                
                
                <View className='flex flex-col gap-2 w-fit'>
                    <View className='flex flex-row justify-center items-center gap-2'>
                        <Image source={require('@/assets/sun.svg')} style={{ width: 30, height: 30 }} />
                        <Text className='font-space-grotesk-light text-lime-green text-4xl'>Login</Text>
                    </View>
                    <Text className='text-white font-space-grotesk-light text-center'>
                        fill all your data in the blocks below.
                    </Text>
                </View>

                
                <AuthInputs
                    isLogin={true}
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                />

                
                <PillBtn text="Confirm" onPress={handleLogin} />
            </View>
        </View>
    );
}

export default AuthWeb;