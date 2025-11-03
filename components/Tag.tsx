import { View, Text } from "react-native";

interface TagProps {
    name: string;
    backgroundColor?: string;
}

function Tag({ name, backgroundColor = "#BDC8FF"}: TagProps) {
    return (
        <View 
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor }}
        >
            <Text 
                className="text-sm font-space-grotesk-medium text-enhance-black"
            >
                {name}
            </Text>
        </View>
    );
}

export default Tag;
