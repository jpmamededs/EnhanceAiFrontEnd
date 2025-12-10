import { View, Text, TouchableOpacity, Image } from "react-native";

function ExerciseCard({image, title, description, onPress} : {
    image: any;
    title: string;
    description: string;
    onPress?: () => void;
}) {
    return (
        <View className="bg-white rounded-2xl p-2 max-w-xs mx-auto">

            {/* Main img */}
            <View className="items-center justify-center mb-4">
                <View className="w-full h-48 items-center justify-center bg-enhance-black rounded-2xl relative">
                    <View className="absolute top-4 right-4 bg-lime-green rounded-full w-14 h-8 flex-row items-center justify-center px-1">
                        <Text className="font-space-grotesk">1/3</Text>
                    </View>
                    {typeof image === 'number' ? (
                        <Image source={image} className="w-20 h-20" resizeMode="contain" />
                    ) : (
                        image
                    )}
                </View>
            </View>

            {/* Title */}
            <View className="px-4">
                <Text className="text-enhance-black font-space-grotesk text-lg font-medium text-left mb-3">
                    {title}
                </Text>
            </View>

            {/* Description */}
            <View className="px-4">
                <Text className="text-enhance-black text-sm font-space-grotesk-light text-left mb-6 leading-5">
                    {description}
                </Text>
            </View>

            {/* Continue btn */}
            <View className="px-4">
                <TouchableOpacity 
                    className="bg-lime-green rounded-full py-2.5 items-center mb-4"
                    onPress={onPress}
                >
                    <Text className="text-enhance-black font-space-grotesk-medium text-base">
                        continue
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ExerciseCard;