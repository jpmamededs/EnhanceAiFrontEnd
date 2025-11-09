import { TouchableOpacity, Text } from "react-native";

interface PillBtnProps {
    text: string;
}

function PillBtn({ text }: PillBtnProps) {
    return (
        <TouchableOpacity className="bg-lime-green rounded-full p-2 flex flex-row items-center justify-between w-full sm:w-[60%] max-w-[80%] mt-2 sm:mt-0">
            <Text className="text-enhance-black font-space-grotesk-medium text-center w-full">
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default PillBtn;