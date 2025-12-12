import { useState } from "react";
import { exerciseService } from "../services/exerciseService";

export const useExercise = (exerciseImageUrl?: string, exerciseContent?: string, exerciseType?: number) => {
    const [generatedValue, setGeneratedValue] = useState<{ url?: string; text?: string } | null>(null);
    const [generatedScore, setGeneratedScore] = useState<{ score?: number; explanation?: string } | null>(null);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [allGeneratedValues, setAllGeneratedValues] = useState<{ url?: string; text?: string }[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [passedExercise, setPassedExercise] = useState(false);

    const handleSendPrompt = async () => {
        if (inputText.trim()) {
            setIsLoading(true);
            setInputText("");
            try {
                // Tipo 1: Text
                if (exerciseType === 1) {
                    const retrievedData = await exerciseService.sendTextPrompt(inputText);

                    let textData = null;

                    // Verifica a estrutura da resposta
                    if (typeof retrievedData === 'string') {
                        textData = { text: retrievedData };
                    } else if (retrievedData && retrievedData.text) {
                        textData = retrievedData;
                    } else if (retrievedData && retrievedData.data) {
                        textData = { text: retrievedData.data };
                    }

                    setGeneratedValue(textData);

                    // Compara o texto gerado com o conteúdo do exercício
                    const retrievedComparisonData = await exerciseService.compareTextValues(
                        textData?.text || '',
                        exerciseContent || ''
                    );

                    let comparisonData = null;

                    if (retrievedComparisonData && retrievedComparisonData.score !== undefined) {
                        comparisonData = retrievedComparisonData;
                    } else if (retrievedComparisonData && retrievedComparisonData.data) {
                        comparisonData = retrievedComparisonData.data;
                    }

                    setGeneratedScore(comparisonData);

                    // Verifica se o exercício foi aprovado com base no score
                    if (comparisonData?.score !== undefined) {
                        setPassedExercise(comparisonData.score >= 80);
                    }

                    // Adiciona o texto gerado ao array
                    if (textData && textData.text) {
                        setAllGeneratedValues(prev => [...prev, textData]);
                    }
                } 
                // Tipo 2: Image
                else {
                    const retrievedData = await exerciseService.sendPrompt(inputText);

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

                    const retrievedComparisonData = await exerciseService.compareGeneratedValue(imageData?.url || '', exerciseImageUrl || '')

                    let comparisonData = null

                    if (retrievedComparisonData && retrievedComparisonData.data && Array.isArray(retrievedComparisonData.data) && retrievedComparisonData.data.length > 0) {
                        // Pega o primeiro item do array data que contém a URL
                        comparisonData = retrievedComparisonData.data[0];
                    } else if (Array.isArray(retrievedComparisonData) && retrievedComparisonData.length > 0) {
                        // Fallback para caso a resposta seja diretamente um array
                        comparisonData = retrievedComparisonData[0];
                    } else if (retrievedComparisonData && retrievedComparisonData.score) {
                        // Fallback para caso a resposta tenha score diretamente
                        comparisonData = retrievedComparisonData;
                    }

                    setGeneratedScore(comparisonData);

                    // Verifica se o exercício foi aprovado com base no score
                    if (comparisonData?.score !== undefined) {
                        setPassedExercise(comparisonData.score >= 80);
                    }

                    // Adiciona a URL gerada ao array de todos os valores
                    if (imageData && imageData.url) {
                        setAllGeneratedValues(prev => [...prev, imageData]);
                    }
                }

            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return {
        generatedValue,
        generatedScore,
        inputText,
        isLoading,
        allGeneratedValues,
        modalVisible,
        passedExercise,
        setPassedExercise,
        setModalVisible,
        setInputText,
        handleSendPrompt,
    };
};
