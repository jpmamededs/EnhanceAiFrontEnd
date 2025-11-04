import { useState } from "react";
import { exerciseService } from "../services/exerciseService";

export const useExercise = () => {
    const [generatedValue, setGeneratedValue] = useState<{ url?: string } | null>(null);
    const [generatedScore, setGeneratedScore] = useState<{ score?: number; explanation?: string } | null>(null);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [allGeneratedValues, setAllGeneratedValues] = useState<{ url?: string }[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSendPrompt = async () => {
        if (inputText.trim()) {
            setIsLoading(true);
            setInputText("");
            try {
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

                const retrievedComparisonData = await exerciseService.compareGeneratedValue(imageData?.url || '', 'https://cdn.pixabay.com/photo/2013/12/12/03/09/kitten-227011_1280.jpg')

                let comparisonData = null

                if (retrievedComparisonData && retrievedComparisonData.data && Array.isArray(retrievedComparisonData.data) && retrievedComparisonData.data.length > 0) {
                    // Pega o primeiro item do array data que contém a URL
                    comparisonData = retrievedComparisonData.data[0];
                } else if (Array.isArray(retrievedComparisonData) && retrievedComparisonData.length > 0) {
                    // Fallback para caso a resposta seja diretamente um array
                    comparisonData = retrievedComparisonData[0];
                } else if (retrievedComparisonData && retrievedComparisonData.score) {
                    // Fallback para caso a resposta tenha url diretamente
                    comparisonData = retrievedComparisonData;
                }

                setGeneratedScore(comparisonData);

                // Adiciona a URL gerada ao array de todos os valores
                if (imageData && imageData.url) {
                    setAllGeneratedValues(prev => [...prev, imageData]);
                }

            } catch (error) {
                // Erro ao processar requisição
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
        setModalVisible,
        setInputText,
        handleSendPrompt,
    };
};
