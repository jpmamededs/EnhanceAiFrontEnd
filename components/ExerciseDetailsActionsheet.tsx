import {
    Actionsheet,
    ActionsheetContent,
    ActionsheetItem,
    ActionsheetItemText,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetBackdrop,
} from '@/components/ui/actionsheet';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { useNavigation } from '@react-navigation/native';

import { View, TextInput, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import PillBtn from './PillBtn';
import { exerciseService } from '@/services/exerciseService';
import { Spinner } from '@/components/ui/spinner';

interface ExerciseDetailsActionsheetProps {
    showActionsheet: boolean;
    handleClose: () => void;
    exerciseId: number | null;
}

interface ExerciseDetails {
    id: number;
    nome: string;
    tipo: number;
    descricao?: string;
    conteudo?: string;
    caminhoImagem?: string;
}

function ExerciseDetailsActionsheet({ showActionsheet, handleClose, exerciseId }: ExerciseDetailsActionsheetProps) {
    const [exerciseDetails, setExerciseDetails] = useState<ExerciseDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        if (showActionsheet && exerciseId) {
            loadExerciseDetails();
        }
    }, [showActionsheet, exerciseId]);

    const loadExerciseDetails = async () => {
        if (!exerciseId) return;
        
        try {
            setIsLoading(true);
            const data = await exerciseService.getExerciseById(exerciseId);
            setExerciseDetails(data);
        } catch (error) {
            console.error("Error loading exercise details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartExercise = () => {
        if (exerciseDetails) {
            handleClose();
            (navigation as any).navigate('Exercise', { 
                exerciseId: exerciseDetails.id 
            });
        }
    };

    return (
        <>
            <Actionsheet isOpen={showActionsheet} onClose={handleClose} className='backdrop-blur-sm'>
                <ActionsheetBackdrop />
                <ActionsheetContent className='bg-white border-none w-[45%] mx-auto h-[90%]'>
                    <ActionsheetDragIndicatorWrapper className='cursor-pointer'>
                        <ActionsheetDragIndicator className='bg-gray-400' />
                    </ActionsheetDragIndicatorWrapper>
                    {isLoading ? (
                        <View className='w-full h-full flex items-center justify-center'>
                            <Spinner size="large" color="#000000" />
                        </View>
                    ) : exerciseDetails ? (
                        <ScrollView className='w-full h-full flex flex-col'>
                            
                            <View className='w-full h-64 rounded-xl overflow-hidden bg-enhance-black relative'>
                                {exerciseDetails.caminhoImagem ? (
                                    <>
                                        {imageLoading && (
                                            <View className='absolute inset-0 flex items-center justify-center z-10'>
                                                <Spinner size="large" color="#ecff5bff" />
                                            </View>
                                        )}
                                        <Image 
                                            source={{ uri: exerciseDetails.caminhoImagem }}
                                            className='w-full h-full'
                                            resizeMode='cover'
                                            onLoadStart={() => setImageLoading(true)}
                                            onLoadEnd={() => setImageLoading(false)}
                                            onError={() => setImageLoading(false)}
                                        />
                                    </>
                                ) : (
                                    <View className='w-full h-full flex items-center justify-center'>
                                        <Text className='text-gray-400 font-space-grotesk-light'>
                                            No image available for this exercise
                                        </Text>
                                    </View>
                                )}
                            </View>
                            
                            {/* Content Section */}
                            <View className='px-6 pb-6'>
                                {/* Title and Author Section */}
                                <View className='flex flex-row items-start justify-between w-full mt-6'>
                                    <View className='flex-1'>
                                        <Text className='text-enhance-black font-space-grotesk-bold text-3xl mb-3'>
                                            {exerciseDetails.nome}
                                        </Text>
                                        <View className='px-3 py-1.5 rounded-full bg-light-blue w-fit'>
                                            <Text className='text-enhance-black text-sm font-space-grotesk-medium'>
                                                {exerciseDetails.tipo === 1 ? 'Text' : exerciseDetails.tipo === 2 ? 'Image' : 'Unknown'}
                                            </Text>
                                        </View>
                                    </View>
                                    
                                    {/* Author Info */}
                                    <View className='flex flex-col items-end gap-2 ml-4'>
                                        <Avatar size='md' className='bg-lime-green'>
                                            <AvatarFallbackText className='text-enhance-black font-space-grotesk-medium'>JS</AvatarFallbackText>
                                        </Avatar>
                                        <Text className='text-gray-600 font-space-grotesk-light text-xs'>João Silva</Text>
                                    </View>
                                </View>
                                
                                {exerciseDetails.descricao && (
                                    <View className='mt-6'>
                                        <Text className='text-enhance-black font-space-grotesk-medium text-lg mb-2'>
                                            Description
                                        </Text>
                                        <Text className='text-gray-700 font-space-grotesk-light text-base leading-6'>
                                            {exerciseDetails.descricao}
                                        </Text>
                                    </View>
                                )}
                                
                                {exerciseDetails.conteudo && (
                                    <View className='mt-6'>
                                        <Text className='text-enhance-black font-space-grotesk-medium text-lg mb-2'>
                                            Content
                                        </Text>
                                        <Text className='text-gray-700 font-space-grotesk-light text-base leading-6'>
                                            {exerciseDetails.conteudo}
                                        </Text>
                                    </View>
                                )}
                                
                                <View className='mt-8'>
                                    <PillBtn text='Start prompting' onPress={handleStartExercise} />
                                </View>
                            </View>
                        </ScrollView>
                    ) : (
                        <View className='w-full h-full flex items-center justify-center'>
                            <Text className='text-enhance-black font-space-grotesk-light text-lg'>
                                No exercise selected
                            </Text>
                        </View>
                    )}
                </ActionsheetContent>
            </Actionsheet>
        </>
    )
}

export default ExerciseDetailsActionsheet;