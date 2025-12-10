import { View, Text, TouchableOpacity, Image } from "react-native";

function UnloggedCard({ title, description, callToActionText, image }: {
    title: string;
    description: string;
    callToActionText: string;
    image: any;
}) {
    return (
        <View className="border-2 border-medium-grey rounded-3xl p-8 flex items-center justify-between h-96 w-64 bg-enhance-black">

            <View className="flex flex-col gap-4 items-center justify-center">
                <Text className="text-lime-green font-space-grotesk-bold text-2xl text-center">
                    {title}
                </Text>

                <Image
                    source={image}
                    style={{ width: 64, height: 64 }}
                    resizeMode="contain"
                />

                <Text className="text-lightiest-grey font-space-grotesk text-center text-sm leading-relaxed">
                    {description}
                </Text>
            </View>

            <TouchableOpacity className="w-full py-3 border-2 border-lightiest-grey rounded-full">
                <Text className="text-lightiest-grey font-space-grotesk-medium text-sm text-center">
                    {callToActionText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default UnloggedCard;