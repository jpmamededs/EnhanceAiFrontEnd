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
/* -------------------------------------------- */
import { useExercise } from "../hooks/useExercise";
import CircularProgressBar from "@/components/CircularProgressBar";
import DrawerUI from "@/components/DrawerUI";
import Navbar from "@/components/Navbar";

function ExerciseWeb() {

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
    } = useExercise();

    return (
        <>
            <View className="w-full h-full bg-enhance-black flex flex-col sm:flex-row p-2 sm:p-4 gap-2 sm:max-w-full sm:overflow-hidden">
                <View className="flex-1 rounded-xl px-4 sm:px-6 py-3 sm:py-4 h-full sm:min-w-0 sm:flex-shrink">
                    <View className="flex flex-row h-fit w-full items-top justify-between">
                        <View className="flex flex-col h-fit sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:flex-wrap">
                            <Text className="font-bold text-2xl sm:text-3xl font-space-grotesk-bold text-lime-green sm:flex-shrink-0">Nome do exercício 2</Text>
                            <Tag name="Image generation" />
                        </View>
                        <DrawerUI />
                    </View>

                    <Text className="font-space-grotesk-medium text-white text-sm sm:text-base">Lorem ipsum dolor sin amet</Text>

                    <View className=" sm:mt-4 w-full h-full flex-1 bg-medium-grey rounded-lg overflow-hidden">
                        <Image
                            source={{ uri: 'https://cdn.pixabay.com/photo/2013/12/12/03/09/kitten-227011_1280.jpg' }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                <View className="w-full sm:w-80 sm:max-w-[35%] sm:flex-shrink-0 h-80 sm:h-auto rounded-xl p-3 sm:p-4 border-2 border-white flex flex-col justify-start items-center gap-1">
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
                    <View className="w-full h-fit flex flex-col gap-2">
                        {generatedValue?.url && !isLoading && (
                            <TouchableOpacity className="rounded-lg bg-white w-full h-fit mb-2 flex flex-row items-center justify-between px-2 py-2" onPress={() => { setModalVisible(!modalVisible) }}>
                                <Text className="text-black font-space-grotesk-medium flex flex-row items-center w-fit gap-1"><TbNorthStar /> Instance status: {passedExercise == true ? (<FaCheckCircle className="text-[#8BFF7E]" />) : (<ImCross className="text-[#FF7E7E]" />)} </Text>
                                <CircularProgressBar score={generatedScore?.score} sizeValue={30} widthValue={4} fontSize={12} />
                                <HiChevronRight className="text-enhance-black" />
                            </TouchableOpacity>
                        )}
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
        </>
    )
}

export default ExerciseWeb;