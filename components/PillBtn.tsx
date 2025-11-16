import { TouchableOpacity, Text } from "react-native";

interface PillBtnProps {
    text: string;
    onPress?: () => void;
}

function PillBtn({ text, onPress }: PillBtnProps) {
    return (
        <TouchableOpacity onPress={onPress} className="bg-lime-green rounded-full p-2 flex flex-row items-center justify-between w-full sm:w-[60%] max-w-[80%] mt-2 sm:mt-0">
            <Text className="text-enhance-black font-space-grotesk-medium text-center w-full">
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default PillBtn;