import {
    Actionsheet,
    ActionsheetContent,
    ActionsheetItem,
    ActionsheetItemText,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetBackdrop,
} from '@/components/ui/actionsheet';

import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';

interface NewExerciseActionsheetProps {
    showActionsheet: boolean;
    handleClose: () => void;
}

const exerciseTypes = [
    { label: 'Text Generation', value: 'text-generation' },
    { label: 'Image Generation', value: 'image-generation' },
    { label: 'Project', value: 'project' },
];

function NewExerciseActionsheet({ showActionsheet, handleClose }: NewExerciseActionsheetProps) {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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

    return (
        <Actionsheet isOpen={showActionsheet} onClose={handleClose} className='backdrop-blur-sm'>
            <ActionsheetBackdrop />
            <ActionsheetContent className='bg-white border-none w-[80%] mx-auto h-[80%]'>
                <ActionsheetDragIndicatorWrapper className='cursor-pointer'>
                    <ActionsheetDragIndicator className='bg-gray-400' />
                </ActionsheetDragIndicatorWrapper>
                <View className='w-full p-6 h-full'>
                    {/* Nome do Exercício */}
                    <View className='mb-4'>
                        <TextInput 
                            placeholder="New Exercise" 
                            className='w-full text-enhance-black font-space-grotesk-bold text-5xl'
                        />
                    </View>

                    {/* Tipo de Exercício - Tags */}
                    <View className='mb-6'>
                        <View className='flex flex-row gap-3 flex-wrap'>
                            {exerciseTypes.map((type) => (
                                <TouchableOpacity
                                    key={type.value}
                                    onPress={() => setSelectedType(type.value)}
                                    className={`px-6 py-3 rounded-full border-2 transition-all shadow-md ${
                                        selectedType === type.value 
                                            ? 'bg-lime-green border-lime-green-dark scale-110' 
                                            : 'bg-white border-gray-300'
                                    }`}
                                >
                                    <Text className={`font-space-grotesk-bold text-base ${
                                        selectedType === type.value ? 'text-enhance-black' : 'text-gray-600'
                                    }`}>
                                        {type.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Descrição */}
                    <View className='w-full mb-6'>
                        <TextInput 
                            placeholder="Descrição" 
                            multiline 
                            numberOfLines={4}
                            textAlignVertical="top"
                            className='w-full p-3 border border-gray-300 rounded-lg text-enhance-black font-space-grotesk text-base'
                        />
                    </View>

                    {/* Upload de Arquivos */}
                    <View className='w-full'>
                        <label
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                                isDragging 
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
                </View>
            </ActionsheetContent>
        </Actionsheet>
    );
}

export default NewExerciseActionsheet;