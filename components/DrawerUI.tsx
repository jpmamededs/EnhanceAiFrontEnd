import {
    Drawer,
    DrawerBackdrop,
    DrawerContent,
    DrawerHeader,
    DrawerCloseButton,
    DrawerBody,
    DrawerFooter,
} from '@/components/ui/drawer';
import { FaHistory } from "react-icons/fa";
import { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

function DrawerUI() {

    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => { setShowDrawer(true); }} >
                <FaHistory className="text-white text-xl" />
            </TouchableOpacity>
            <Drawer isOpen={showDrawer}
                onClose={() => {
                    setShowDrawer(false);
                }}
                size="md">
                <DrawerBackdrop />
                <DrawerContent className='bg-enhance-black overflow-x-hidden'>
                    <DrawerHeader className='flex flex-row items-center justify-between'>
                        <Text className='text-lime-green text-2xl font-space-grotesk-bold'>Instance history</Text>
                        <DrawerCloseButton />
                    </DrawerHeader>
                    <View className='flex flex-col justify-center items-left gap-2 max-w-full h-fit'>
                        <View className='flex flex-row w-fit h-fit mt-4 items-center justify-left px-2 py-2 rounded rounded-md bg-medium-grey gap-2'>
                            <Text className='text-lime-green font-space-grotesk-bold'>Instance 1 |</Text>
                            <Text className="text-white font-space-grotesk-light">Status: Failed</Text>
                        </View>
                    </View>

                    <DrawerBody />
                </DrawerContent>
            </Drawer>
        </>
    );

}

export default DrawerUI;