import { FaBraille } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { Spinner } from '@/components/ui/spinner';
import { View, Text, TextInput, TouchableOpacity, Image, Animated } from "react-native";
import Tag from "../components/Tag";
import { useEffect, useState, useRef } from "react";
import { exerciseService } from "services/exerciseService";
import Select from "@/components/SelectUI";

function Exercise() {

    const [generatedValue, setGeneratedValue] = useState<{ url?: string } | null>(null);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const shimmerAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let loop: Animated.CompositeAnimation | null = null;
        if (isLoading) {
            // reset
            shimmerAnimation.setValue(0);
            loop = Animated.loop(
                Animated.timing(shimmerAnimation, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                })
            );
            loop.start();
        }
        return () => {
            if (loop) loop.stop();
            shimmerAnimation.setValue(0);
        };
    }, [isLoading]);

    const shimmerTranslateX = shimmerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-300, 300],
    });

    const handleSendPrompt = async () => {
        if (inputText.trim()) {
            setIsLoading(true);
            setInputText("");
            try {
                const retrievedData = await exerciseService.sendPrompt({ value: inputText });
                console.log("Dados recebidos:", retrievedData);
                
                let imageData = null;

                // Verifica se a resposta tem a estrutura esperada: {created: timestamp, data: [{ url: "..." }]}
                if (retrievedData && retrievedData.data && Array.isArray(retrievedData.data) && retrievedData.data.length > 0) {
                    // Pega o primeiro item do array data que contém a URL
                    imageData = retrievedData.data[0];
                } else if (Array.isArray(retrievedData) && retrievedData.length > 0) {
                    // Fallback para caso a resposta seja diretamente um array
                    imageData = retrievedData[0];
                } else if (retrievedData && retrievedData.url) {
                    // Fallback para caso a resposta tenha url diretamente
                    imageData = retrievedData;
                }
                
                setGeneratedValue(imageData);
            } catch (error) {
                console.error("Erro ao gerar imagem:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <View className="w-full h-full bg-enhance-black flex flex-col sm:flex-row p-2 sm:p-4 gap-2 sm:max-w-full sm:overflow-hidden">
            <View className="flex-1 rounded-xl px-4 sm:px-6 py-3 sm:py-4 h-full sm:min-w-0 sm:flex-shrink">
                <View className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:flex-wrap">
                    <Text className="font-bold text-2xl sm:text-3xl font-space-grotesk-bold text-lime-green sm:flex-shrink-0">Nome do exercício</Text>
                    <Tag name="Image generation" />
                </View>
                <Text className="font-space-grotesk-medium text-white text-sm sm:text-base">Lorem ipsum dolor sin amet</Text>

                <View className="mt-3 sm:mt-4 w-full h-full flex-1 bg-medium-grey rounded-lg overflow-hidden">
                    <Image 
                        source={{uri: 'https://cdn.pixabay.com/photo/2013/12/12/03/09/kitten-227011_1280.jpg'}}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="contain"
                    />
                </View>

            </View>

            <View className="w-full sm:w-80 sm:max-w-[35%] sm:flex-shrink-0 h-80 sm:h-auto rounded-xl p-3 sm:p-4 border-2 border-white flex flex-col justify-start items-center gap-2">
                <View className="w-full h-fit flex flex-row justify-between items-center">
                    <Text className="text-lg sm:text-xl font-space-grotesk-semibold text-lime-green flex flex-row gap-2 items-center h-fit w-fit">
                        <FaBraille /> Playground
                    </Text>
                    <Select></Select>
                </View>
                <View className="flex-1 w-full rounded-lg flex items-center justify-center min-h-[120px] sm:min-h-0 overflow-hidden relative">
                    {isLoading ? (
                        <Spinner size="large" color="#F0FF7E" />
                    ) : generatedValue?.url ? (
                        <Image
                            source={{ uri: generatedValue.url }}
                            style={{ width: '100%', height: '100%'}}
                            resizeMode="contain"
                        />
                    ) : (
                        <Text className="text-gray-400 font-space-grotesk-light text-center px-4">
                            The generated output will be here
                        </Text>
                    )}
                </View>
                <View className="flex flex-row w-full h-fit gap-1 sm:gap-2">
                    <TextInput 
                        placeholder="Text" 
                        className="border-2 border-white flex-1 bg-enhance-black px-3 sm:px-3 py-2 rounded-xl font-space-grotesk-light text-sm sm:text-sm min-w-0" 
                        placeholderTextColor="#888888"
                        style={{ color: 'white' }}
                        value={inputText}
                        onChangeText={setInputText}
                    />
                    <TouchableOpacity 
                        className={`rounded-full p-2 flex items-center justify-center w-10 h-10 sm:w-10 sm:h-10 flex-shrink-0 ${
                            isLoading ? 'bg-gray-400' : 'bg-white'
                        }`}
                        onPress={handleSendPrompt}
                        disabled={isLoading}
                    >
                        <IoSend color={isLoading ? "#666666" : "#101010"} size={16} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Exercise;