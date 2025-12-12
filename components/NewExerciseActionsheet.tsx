import {
    Actionsheet,
    ActionsheetContent,
    ActionsheetItem,
    ActionsheetItemText,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetBackdrop,
} from '@/components/ui/actionsheet';

import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { createExerciseService, TipoExercicio } from '@/services/createExerciseService';

interface NewExerciseActionsheetProps {
    showActionsheet: boolean;
    handleClose: () => void;
}

const exerciseTypes = [
    { label: 'Text Generation', value: TipoExercicio.Texto },
    { label: 'Image Generation', value: TipoExercicio.Imagem },
    { label: 'Code', value: TipoExercicio.Codigo }
];

function NewExerciseActionsheet({ showActionsheet, handleClose }: NewExerciseActionsheetProps) {
    const [selectedType, setSelectedType] = useState<TipoExercicio | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [exerciseName, setExerciseName] = useState('');
    const [description, setDescription] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            setUploadedFile(files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setUploadedFile(files[0]);
        }
    };

    const handleSendData = async () => {
        if (!exerciseName.trim()) {
            Alert.alert('Erro', 'Por favor, insira o nome do exercício');
            return;
        }

        if (!selectedType) {
            Alert.alert('Erro', 'Por favor, selecione o tipo do exercício');
            return;
        }

        if (!description.trim()) {
            Alert.alert('Erro', 'Por favor, insira a descrição do exercício');
            return;
        }

        try {
            setIsLoading(true);
            await createExerciseService.createExercise(
                exerciseName,
                selectedType,
                description,
                conteudo,
                uploadedFile || undefined
            );

            Alert.alert('Sucesso', 'Exercício criado com sucesso!');

            // Clear form
            setExerciseName('');
            setDescription('');
            setConteudo('');
            setSelectedType(null);
            setUploadedFile(null);

            handleClose();
        } catch (error: any) {
            Alert.alert('Erro', error.response?.data?.message || 'Erro ao criar exercício');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Actionsheet isOpen={showActionsheet} onClose={handleClose} className='backdrop-blur-sm'>
            <ActionsheetBackdrop />
            <ActionsheetContent className='bg-white border-none w-[80%] mx-auto h-[85%]'>
                <ActionsheetDragIndicatorWrapper className='cursor-pointer'>
                    <ActionsheetDragIndicator className='bg-gray-400' />
                </ActionsheetDragIndicatorWrapper>
                <View className='w-full p-6 h-full'>
                    {/* Exercise Name */}
                    <View className='mb-4'>
                        <TextInput
                            placeholder="New Exercise"
                            placeholderTextColor="#888888"
                            className='w-full text-enhance-black font-space-grotesk-bold text-5xl px-2'
                            value={exerciseName}
                            onChangeText={setExerciseName}
                        />
                    </View>

                    {/* Tags */}
                    <View className='mb-6'>
                        <View className='flex flex-row gap-3 flex-wrap'>
                            {exerciseTypes.map((type) => (
                                <TouchableOpacity
                                    key={type.value}
                                    onPress={() => {
                                        setSelectedType(type.value);
                                        if (type.value === TipoExercicio.Imagem) {
                                            setConteudo('ImageGenerationException');
                                        } else {
                                            setConteudo('');
                                        }
                                    }}
                                    className={`px-6 py-3 rounded-full border-2 transition-all shadow-md ${selectedType === type.value
                                        ? 'bg-lime-green border-lime-green-dark scale-110'
                                        : 'bg-white border-gray-300'
                                        }`}
                                >
                                    <Text className={`font-space-grotesk-bold text-base ${selectedType === type.value ? 'text-enhance-black' : 'text-gray-600'
                                        }`}>
                                        {type.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Description */}
                    <View className='w-full mb-6'>
                        <TextInput
                            placeholder="Description"
                            placeholderTextColor="#888888"
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            className='w-full p-3 border border-gray-300 rounded-lg text-enhance-black font-space-grotesk text-base'
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>

                    {/* File Upload */}

                    {selectedType === TipoExercicio.Texto || selectedType === TipoExercicio.Codigo ? (
                        <TextInput
                            placeholder="Type the exercise text here."
                            placeholderTextColor="#888888"
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            className='w-full h-full p-3 border border-gray-300 rounded-lg text-enhance-black font-space-grotesk text-base'
                            value={conteudo}
                            onChangeText={setConteudo}
                        />
                    ) : (
                        <View className='w-full'>
                            <label
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all ${isDragging
                                    ? 'border-lime-green bg-lime-green/10'
                                    : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
                                    }`}
                            >
                                <input
                                    type="file"
                                    className='hidden'
                                    onChange={handleFileSelect}
                                    accept="image/*"
                                />
                                <IoCloudUploadOutline className={`text-5xl mb-3 ${isDragging ? 'text-lime-green' : 'text-gray-400'}`} />
                                {uploadedFile ? (
                                    <View className='text-center'>
                                        <Text className='font-space-grotesk-medium text-enhance-black text-base mb-1'>
                                            {uploadedFile.name}
                                        </Text>
                                        <Text className='font-space-grotesk text-gray-500 text-sm'>
                                            File loaded successfully!
                                        </Text>
                                    </View>
                                ) : (
                                    <View className='text-center'>
                                        <Text className='font-space-grotesk-medium text-enhance-black text-base mb-1'>
                                            Drag a file here
                                        </Text>
                                        <Text className='font-space-grotesk text-gray-500 text-sm'>
                                            or click to select
                                        </Text>
                                    </View>
                                )}
                            </label>
                        </View>
                    )}


                    <TouchableOpacity
                        className='w-full py-2 flex flex-row items-center justify-center bg-lime-green transition-all hover:bg-lime-green-dark rounded-md mt-6'
                        onPress={handleSendData}
                        disabled={isLoading}
                    >
                        <Text className='font-space-grotesk-bold text-enhance-black'>
                            {isLoading ? 'Creating...' : 'Create Exercise'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ActionsheetContent>
        </Actionsheet>
    );
}

export default NewExerciseActionsheet;