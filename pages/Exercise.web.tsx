import { FaBraille, FaCheckCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { TbNorthStar } from "react-icons/tb";
import { HiChevronRight } from "react-icons/hi";
import { CgDetailsMore } from "react-icons/cg";
import { ImCross } from "react-icons/im";
/* -------------------------------------------- */
import { Spinner } from '@/components/ui/spinner';
import Select from "@/components/SelectUI";
import Tag from "../components/Tag";
/* -------------------------------------------- */
import { View, Text, TextInput, TouchableOpacity, Image, Modal } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
/* -------------------------------------------- */
import { useExercise } from "../hooks/useExercise";
import CircularProgressBar from "@/components/CircularProgressBar";
import DrawerUI from "@/components/DrawerUI";
import LoggedNavbar from "@/components/LoggedNavbar";
import { exerciseService } from "@/services/exerciseService";

interface ExerciseDetails {
    id: number;
    nome: string;
    tipo: number;
    descricao?: string;
    conteudo?: string;
    caminhoImagem?: string;
}

function ExerciseWeb() {
    const route = useRoute();
    const [exerciseData, setExerciseData] = useState<ExerciseDetails | undefined>();
    const [inputHeight, setInputHeight] = useState(40);
    const [isLoadingExercise, setIsLoadingExercise] = useState(true);

    useEffect(() => {
        const loadExerciseData = async () => {
            const exerciseId = (route.params as any)?.exerciseId;
            if (exerciseId) {
                setIsLoadingExercise(true);
                try {
                    const data = await exerciseService.getExerciseById(exerciseId);
                    setExerciseData(data);
                } catch (error) {
                    console.error('Error loading exercise:', error);
                } finally {
                    setIsLoadingExercise(false);
                }
            } else {
                setIsLoadingExercise(false);
            }
        };
        loadExerciseData();
    }, [route.params]);

    const {
        generatedValue,
        generatedScore,
        inputText,
        isLoading,
        modalVisible,
        passedExercise,
        setPassedExercise,
        setModalVisible,
        setInputText,
        handleSendPrompt,
    } = useExercise(exerciseData?.caminhoImagem);

    if (isLoadingExercise) {
        return (
            <View className="w-full h-screen bg-enhance-black flex flex-col overflow-hidden">
                <LoggedNavbar />
                <View className="flex-1 items-center justify-center">
                    <Spinner size="large" color="#ecff5bff" />
                    <Text className="text-white font-space-grotesk-light mt-4">loading exercise...</Text>
                </View>
            </View>
        );
    }

    return (
        <View className="w-full h-screen bg-enhance-black flex flex-col overflow-hidden">
            <LoggedNavbar />
            <View className="flex-1 flex flex-col sm:flex-row p-2 sm:p-4 gap-2 overflow-hidden">
                <View className="flex-1 rounded-xl px-4 sm:px-6 py-3 sm:py-4 sm:min-w-0 sm:flex-shrink flex flex-col overflow-hidden">
                    <View className="flex flex-row h-fit w-full items-top justify-between mb-2">
                        <View className="flex flex-col h-fit sm:flex-row sm:items-center gap-2 sm:gap-3 sm:flex-wrap">
                            <Text className="font-bold text-2xl sm:text-3xl font-space-grotesk-bold text-lime-green sm:flex-shrink-0">{exerciseData?.nome || 'Exercise name'}</Text>
                            <Tag name={exerciseData?.tipo === 1 ? 'Text' : exerciseData?.tipo === 2 ? 'Image' : 'Unknown'} />
                        </View>
                        <DrawerUI />
                    </View>

                    <Text className="font-space-grotesk-light text-white text-sm sm:text-base mb-2 sm:mb-4">{exerciseData?.descricao || 'Exercise description'}</Text>

                    <View className="flex-1 w-full bg-medium-grey rounded-lg overflow-hidden">
                        {exerciseData?.caminhoImagem ? (
                            <Image
                                source={{ uri: exerciseData.caminhoImagem }}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="contain"
                            />
                        ) : (
                            <View className="w-full h-full flex items-center justify-center">
                                <Text className="text-gray-400 font-space-grotesk-light">no image</Text>
                            </View>
                        )}
                    </View>
                </View>

                <View className="w-full sm:w-80 sm:max-w-[35%] sm:flex-shrink-0 h-auto rounded-xl p-3 sm:p-4 border-2 border-white flex flex-col justify-start items-center gap-1">
                    <View className="w-full h-fit flex flex-row justify-between items-center mb-1">
                        <Text className="text-lg sm:text-xl font-space-grotesk-semibold text-lime-green flex flex-row gap-2 items-center h-fit w-fit">
                            <FaBraille /> Playground
                        </Text>
                        <Select></Select>
                    </View>
                    <View className="flex-1 w-full rounded-lg flex items-center justify-center min-h-[120px] sm:min-h-0 overflow-hidden relative">
                        {isLoading ? (
                            <Spinner size="large" color="#F0FF7E" />
                        ) : generatedValue?.url ? (
                            <>
                                <View className="w-full h-full rounded rounded-lg">
                                    <Image
                                        source={{ uri: generatedValue.url }}
                                        className="w-full h-full"
                                        resizeMode="contain"
                                    />
                                </View>
                            </>
                        ) : (
                            <Text className="text-gray-400 font-space-grotesk-light text-center px-4">
                                The generated output will be here
                            </Text>
                        )}
                    </View>
                    <View className="w-full h-fit flex flex-col gap-2 mt-2">
                        {generatedValue?.url && !isLoading && (
                            <TouchableOpacity className="rounded-lg bg-white w-full h-fit mb-2 flex flex-row items-center justify-between px-2 py-2" onPress={() => { setModalVisible(!modalVisible) }}>
                                <Text className="text-black font-space-grotesk-medium flex flex-row items-center w-fit gap-1"><TbNorthStar /> Instance status: {passedExercise == true ? (<FaCheckCircle className="text-[#8BFF7E]" />) : (<ImCross className="text-[#FF7E7E]" />)} </Text>
                                <CircularProgressBar score={generatedScore?.score} sizeValue={30} widthValue={4} fontSize={12} />
                                <HiChevronRight className="text-enhance-black" />
                            </TouchableOpacity>
                        )}
                        <View className="flex flex-row w-full h-fit gap-1 sm:gap-2 items-end">
                            <TextInput
                                placeholder="Text"
                                className="border-2 border-white flex-1 bg-enhance-black px-3 sm:px-3 py-2 rounded-xl font-space-grotesk-light text-sm sm:text-sm min-w-0"
                                placeholderTextColor="#888888"
                                style={{ color: 'white', height: inputHeight, maxHeight: 200, overflow: 'hidden' }}
                                value={inputText}
                                onChangeText={setInputText}
                                multiline={true}
                                scrollEnabled={false}
                                textAlignVertical="top"
                                onContentSizeChange={(event) => {
                                    const newHeight = Math.max(40, Math.min(200, event.nativeEvent.contentSize.height));
                                    setInputHeight(newHeight);
                                }}
                            />
                            <TouchableOpacity
                                className={`rounded-full p-2 flex items-center justify-center w-10 h-10 sm:w-10 sm:h-10 flex-shrink-0 ${isLoading ? 'bg-gray-400' : 'bg-white'
                                    }`}
                                onPress={handleSendPrompt}
                                disabled={isLoading}
                            >
                                <IoSend color={isLoading ? "#666666" : "#101010"} size={16} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white rounded-xl p-6 w-11/12 max-w-md">
                        <Text className="text-2xl font-space-grotesk-bold text-enhance-black mb-4 flex flex-row gap-2 items-center">
                            <CgDetailsMore />
                            Score Details
                        </Text>
                        <CircularProgressBar score={generatedScore?.score} sizeValue={120} widthValue={15} />
                        <View className="mb-6">
                            <Text className="text-sm font-space-grotesk-light text-gray-600">
                                {generatedScore?.explanation || 'Loading description'}
                            </Text>
                        </View>
                        <TouchableOpacity
                            className="bg-lime-green rounded-lg py-3 px-4"
                            onPress={() => setModalVisible(false)}
                        >
                            <Text className="text-enhance-black font-space-grotesk-semibold text-center">
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ExerciseWeb;