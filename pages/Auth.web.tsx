import { View, Text, Image } from 'react-native';
import { useState } from 'react';
import AuthInputs from '@/components/authComponents/AuthInputs';
import PillBtn from '@/components/PillBtn';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@react-navigation/native';

type FormErrors = {
    email?: string;
    password?: string;
    general?: string;
};

function AuthWeb() {
    const { login } = useAuth();
    const navigation = useNavigation();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            newErrors.email = '*E-mail is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = '*Please enter a valid e-mail address';
        }

        if (!password) {
            newErrors.password = '*Password is required';
        } else if (password.length < 6) {
            newErrors.password = '*Password must be at least 6 characters';
        }

        return newErrors;
    };

    const handleLogin = async () => {
        const validationErrors = validateForm();
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length > 0) return;

        setIsLoading(true);
        try {
            await login(email, password);
            navigation.navigate('Home' as never);
        } catch (err: any) {
            setErrors({ general: err.message || '*Invalid credentials. Please try again.' });
        } finally {
            setIsLoading(false);
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

                    <View className="w-full sm:w-[60%] max-w-[80%] flex flex-col gap-3">
                        <AuthInputs
                            isLogin={true}
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                        />
                        
                        {(errors.email || errors.password) && (
                            <View className="space-y-1">
                                {errors.email && (
                                    <Text className="text-enhance-red font-space-grotesk-light text-sm">
                                        {errors.email}
                                    </Text>
                                )}
                                {errors.password && (
                                    <Text className="text-enhance-red font-space-grotesk-light text-sm">
                                        {errors.password}
                                    </Text>
                                )}
                            </View>
                        )}

                        {errors.general && (
                            <View className="border border-enhance-red rounded-md px-4 py-3">
                                <Text className="text-enhance-red font-space-grotesk-light text-sm text-center">
                                    {errors.general}
                                </Text>
                            </View>
                        )}
                    </View>

                    <PillBtn 
                        text={isLoading ? "Logging in..." : "Login Now"} 
                        onPress={handleLogin}
                    />

                </View>
            </View>
        </View>
    );
}

export default AuthWeb;