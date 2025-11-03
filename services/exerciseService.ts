import api from "./api";

interface apiProps {
    value: string
}

interface ImageGenerationPayload {
    prompt: string;
    n: number;
    size: string;
    quality: string;
    background: string;
    outputFormat: string;
}

export const exerciseService = {

    sendPrompt: async (prompt: apiProps) => {
        const payload: ImageGenerationPayload = {
            prompt: prompt.value,
            n: 1,
            size: "1024x1024",
            quality: "low",
            background: "auto",
            outputFormat: "png"
        };
        
        console.log("Enviando payload para API:", payload);
        
        const response = await api.post(`/api/ImageControllerTest/generate-image`, payload);
        return response.data;
    }

}