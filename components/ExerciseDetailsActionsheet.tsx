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

import { View, TextInput, Text, TouchableOpacity, ScrollView, } from 'react-native';
import { useState } from 'react';
import PillBtn from './PillBtn';

interface ExerciseDetailsActionsheetProps {
    showActionsheet: boolean;
    handleClose: () => void;
}

function ExerciseDetailsActionsheet({ showActionsheet, handleClose }: ExerciseDetailsActionsheetProps) {
    return (
        <>
            <Actionsheet isOpen={showActionsheet} onClose={handleClose} className='backdrop-blur-sm'>
                <ActionsheetBackdrop />
                <ActionsheetContent className='bg-white border-none w-[40%] mx-auto h-[85%]'>
                    <ActionsheetDragIndicatorWrapper className='cursor-pointer'>
                        <ActionsheetDragIndicator className='bg-gray-400' />
                    </ActionsheetDragIndicatorWrapper>
                    <ScrollView className='w-full p-6 h-full flex flex-col'>
                        <View className='w-full h-48 border rounded-lg bg-enhance-black flex items-center justify-center'>
                            <Text className='text-white text-xl text-space-grotesk'>Test</Text>
                        </View>
                        
                        {/* Title and Author Section */}
                        <View className='flex flex-row items-center justify-between w-full mt-6'>
                            <Text className='text-enhance-black font-space-grotesk-bold text-3xl flex-1'>Title</Text>
                            
                            {/* Author Info */}
                            <View className='flex flex-row items-center gap-2 ml-4'>
                                <Text className='text-enhance-black font-space-grotesk text-sm'>João Silva</Text>
                                <Avatar size='sm' className='bg-lime-green'>
                                    <AvatarFallbackText className='text-enhance-black'>J</AvatarFallbackText>
                                </Avatar>
                            </View>
                        </View>
                        
                        <View className='px-4 py-1 rounded-full bg-lime-green w-fit text-enhance-black text-sm font-space-grotesk-light mt-2'>
                            Ongoing
                        </View>
                        <Text className='text-enhance-black font-space-grotesk-light text-md w-full mt-6'>Description fdffdsfsdfsdffdfsdfdsfsdfsdfdsfdsfsdfdssdfsdfs</Text>
                        
                        <PillBtn text='prompt now'></PillBtn>
                        
                    </ScrollView>
                </ActionsheetContent>
            </Actionsheet>
        </>
    )
}

export default ExerciseDetailsActionsheet;