import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { FaArrowRight, FaPencilAlt, FaLightbulb, FaBookOpen } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import LoggedNavbar from "@/components/LoggedNavbar";
import LandingCard from "../components/LandingCard";
import ExerciseCard from "@/components/ExerciseCard";
import UnloggedCard from "@/components/UnloggedCard";
import ExerciseDetailsActionsheet from "@/components/ExerciseDetailsActionsheet";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { exerciseService } from "@/services/exerciseService";
import { Spinner } from "@/components/ui/spinner";

// ---------------------------------//

function HomeWeb() {
    const { isAuthenticated } = useAuth();
    const navigation = useNavigation();
    const [showDrawer, setShowDrawer] = useState(true);
    const [showExerciseDetails, setShowExerciseDetails] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null);
    const [recentExercises, setRecentExercises] = useState<any[]>([]);
    const [isLoadingExercises, setIsLoadingExercises] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            loadRecentExercises();
        }
    }, [isAuthenticated]);

    const loadRecentExercises = async () => {
        try {
            setIsLoadingExercises(true);
            const response = await exerciseService.listRecentExercises();
            setRecentExercises(response.items || []);
        } catch (error) {
            console.error("Error loading recent exercises:", error);
        } finally {
            setIsLoadingExercises(false);
        }
    };

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
            <View className="flex flex-row w-full flex-1 overflow-hidden">
                <View className="w-80 border-r border-gray-800 h-full bg-enhance-black">
                    <ScrollView className="flex-1">
                        <View className="p-6">
                            <Text className="text-white text-2xl font-space-grotesk-medium mb-6">
                                Activity
                            </Text>
                            <View className="flex flex-col gap-3">
                                <Text className="text-gray-400 font-space-grotesk-light text-sm">
                                    Your recent activity will appear here
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <ScrollView className="flex-1 h-full bg-enhance-black">
                    <View className="flex flex-col w-full px-8 py-6">
                        <View className="mb-8">
                            <Text className="text-white text-3xl font-space-grotesk-medium">
                                Home
                            </Text>
                        </View>

                        <View className="mb-8">
                            <View className="flex flex-row items-center justify-between mb-6">
                                <View className="px-4 py-2 border border-lightiest-grey rounded-full">
                                    <Text className="font-space-grotesk-light text-lightiest-grey">
                                        Recent exercises
                                    </Text>
                                </View>
                            </View>
                            
                            {isLoadingExercises ? (
                                <View className="h-40 w-full flex items-center justify-center">
                                    <Spinner size="large" color="#ecff5bff" />
                                </View>
                            ) : recentExercises.length > 0 ? (
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View className="flex flex-row gap-4">
                                        {recentExercises.map((exercise) => (
                                            <View key={exercise.id} style={{ width: 320 }}>
                                                <ExerciseCard
                                                    image={<FaLightbulb className="text-lime-green text-6xl" />}
                                                    title={exercise.nome}
                                                    description={exercise.descricao || "No description available"}
                                                    onPress={() => {
                                                        setSelectedExerciseId(exercise.id);
                                                        setShowExerciseDetails(true);
                                                    }}
                                                />
                                            </View>
                                        ))}
                                    </View>
                                </ScrollView>
                            ) : (
                                <View className="h-40 flex items-center justify-center border border-gray-800 rounded-lg">
                                    <Text className="text-gray-400 font-space-grotesk-light">
                                        no exercise found
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View className="mb-8">
                            <View className="flex flex-row justify-between items-center mb-4">
                                <Text className="text-white text-2xl font-space-grotesk-medium">
                                    Currently enrolled
                                </Text>
                                <TouchableOpacity>
                                    <Text className="text-lime-green text-sm font-space-grotesk-light">
                                        view more
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View className="h-40 flex items-center justify-center border border-gray-800 rounded-lg">
                                <Text className="text-gray-400 font-space-grotesk-light">
                                    you're not enrolled in any exercise yet
                                </Text>
                            </View>
                        </View>

                        <View className="mb-8">
                            <Text className="text-white text-2xl font-space-grotesk-medium mb-4">
                                Feed
                            </Text>
                            <View className="h-40 flex items-center justify-center border border-gray-800 rounded-lg">
                                <Text className="text-gray-400 font-space-grotesk-light">
                                    your feed will be here
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

            <ExerciseDetailsActionsheet
                showActionsheet={showExerciseDetails}
                handleClose={() => setShowExerciseDetails(false)}
                exerciseId={selectedExerciseId}
            />
        </View>
    )
}

export default HomeWeb;