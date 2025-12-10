import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { FaArrowRight, FaPencilAlt } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import LoggedNavbar from "@/components/LoggedNavbar";
import LandingCard from "../components/LandingCard";
import ExerciseCard from "@/components/ExerciseCard";
import UnloggedCard from "@/components/UnloggedCard";
import ExerciseDetailsActionsheet from "@/components/ExerciseDetailsActionsheet";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

function HomeWeb() {
    const { isAuthenticated } = useAuth();
    const navigation = useNavigation();
    const [showExerciseDetails, setShowExerciseDetails] = useState(false);

    if (!isAuthenticated) {
        return (
            <View className="flex flex-col w-full h-screen bg-enhance-black">
                <Navbar />
                <ScrollView className="flex-1 w-full">
                    <View className="flex flex-col sm:flex-row w-full min-h-[80vh] items-center justify-center gap-4 sm:gap-0 px-4 py-8 sm:px-0 sm:py-0">
                        <View className="w-full sm:w-1/2 flex flex-col justify-center gap-4 sm:gap-8 p-4 sm:p-8 h-fit">
                            <Text className="font-space-grotesk-medium text-2xl sm:text-3xl md:text-4xl text-lime-green w-full">A new era arrived.
                                <Text className="font-space-grotesk-light text-lime-green flex text-xl sm:text-2xl md:text-4xl">Enhance your capabilities with AI with the best tool out there</Text>
                            </Text>
                            <Text className="font-space-grotesk-light text-white text-base sm:text-xl md:text-3xl w-full">
                                Write prompts, improve your skills and live technology upon your screen
                            </Text>
                            <TouchableOpacity className="bg-lime-green rounded-full p-2 flex flex-row items-center justify-between w-full sm:w-[60%] mt-2 sm:mt-0">
                                <Text className="text-enhance-black font-space-grotesk-medium text-base sm:text-lg md:text-xl ml-2 sm:ml-4">
                                    register now
                                </Text>
                                <View className="flex flex-col p-2 sm:p-4 rounded-full bg-enhance-black w-fit h-fit">
                                    <FaArrowRight className="text-white text-sm sm:text-base" />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View className="bg-red-600 w-full sm:w-1/2 flex items-center justify-center h-48 sm:h-64 md:h-96 mt-4 sm:mt-0">
                            <Text className="text-white text-xl sm:text-2xl md:text-3xl">Hi</Text>
                        </View>
                    </View>

                    <View className="w-full min-h-[40vh] flex items-center justify-center mt-4 px-4 py-12">
                        <View className="max-w-7xl w-full flex flex-row gap-6 justify-center">
                            <View className="w-1/3">
                                <UnloggedCard
                                    title="Inove"
                                    description="explore o mundo e disfrute do melhor da nossa tecnologia."
                                    callToActionText="primeiros passos"
                                    image={require('@/assets/icon.png')}
                                />
                            </View>
                            <View className="w-1/3">
                                <UnloggedCard
                                    title="Crie"
                                    description="desenvolva projetos incríveis com nossa plataforma intuitiva."
                                    callToActionText="começar agora"
                                    image={require('@/assets/icon.png')}
                                />
                            </View>
                            <View className="w-1/3">
                                <UnloggedCard
                                    title="Aprenda"
                                    description="domine novas habilidades com exercícios práticos e interativos."
                                    callToActionText="explorar"
                                    image={require('@/assets/icon.png')}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }

    return (
        <View className="flex flex-col w-full h-screen bg-enhance-black">
            <LoggedNavbar />
            <ScrollView className="flex-1 w-full">
                {/* Exercícios Section */}
                <View className="flex flex-col w-full px-4 sm:px-8 py-8">
                    {/* Header */}
                    <View className="mb-8">
                        <Text className="font-space-grotesk-light text-2xl sm:text-3xl text-white mb-2">
                            Exercises
                        </Text>
                        <TouchableOpacity className="bg-enhance-black border border-white rounded-full bg-medium-grey px-4 py-2 w-fit">
                            <Text className="font-space-grotesk text-white">Recent</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Grid de Cards */}
                    <View className="flex flex-row flex-wrap gap-2 justify-start">
                        <ExerciseCard
                            image={<FaPencilAlt className="text-white text-5xl" />}
                            title="Onde tudo começa - gerando imagens"
                            description="Aprenda a gerar e manipular prompts eficazes para criação de imagens."
                            onPress={() => setShowExerciseDetails(true)}
                        />
                        <ExerciseCard
                            image={<FaPencilAlt className="text-white text-5xl" />}
                            title="Prompts - lapidando a escrita"
                            description="Configure acertos textos precisos e objetivos para obter os melhores resultados."
                            onPress={() => setShowExerciseDetails(true)}
                        />
                        <ExerciseCard
                            image={<FaPencilAlt className="text-white text-5xl" />}
                            title="Onde tudo começa - gerando imagens"
                            description="Aprenda a gerar e manipular prompts eficazes para criação de imagens."
                            onPress={() => setShowExerciseDetails(true)}
                        />
                        <ExerciseCard
                            image={<FaPencilAlt className="text-white text-5xl" />}
                            title="Prompts - lapidando a escrita"
                            description="Configure acertos textos precisos e objetivos para obter os melhores resultados."
                            onPress={() => setShowExerciseDetails(true)}
                        />
                    </View>
                </View>
            </ScrollView>
            
            <ExerciseDetailsActionsheet 
                showActionsheet={showExerciseDetails}
                handleClose={() => setShowExerciseDetails(false)}
            />
        </View>
    )
}

export default HomeWeb;