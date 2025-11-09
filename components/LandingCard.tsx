import { View, Text, Image } from 'react-native';

function LandingCard({ title, imgSrc, description, btnText }: {
    title: string;
    imgSrc: string;
    description: string;
    btnText: string;
}) {

    const imageMap: { [key: string]: any } = {
        'img1': require('../assets/logo.png'),
        'img2': require('../assets/banner.png'),
        // ...
    };

    return (
        <View className="bg-enhance-black flex flex-col h-32 w-fit justify-center items-center p-4 rounded-lg border-white border-2">
            <Text className='font-space-grotesk-bold text-lime-green'>{title}</Text>
            <Image source={imageMap[imgSrc]} style={{ height: 20, width: 20 }} />
            <Text className='font-space-grotesk-light text-white'>{description}</Text>
            <View className='bg-lime-green rounded-full px-4 py-2 mt-2'>
                <Text className='font-space-grotesk-medium text-enhance-black'>{btnText}</Text>
            </View>
        </View>
    )
}

export default LandingCard;