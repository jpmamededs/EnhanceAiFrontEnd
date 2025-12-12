import api from "./api";

export const exerciseService = {

    sendPrompt: async (promptValue: string) => {
        const payload = {
            prompt: promptValue,
            n: 1,
            size: "1024x1024",
            quality: "low",
            background: "auto",
            outputFormat: "png"
        };
        
        const response = await api.post(`/api/ImageControllerTest/generate-image`, payload);
        return response.data;
    },
    compareGeneratedValue: async (imageUrl1: string, imageUrl2: string) => {
        const payload = {
            imageUrl1,
            imageUrl2
        };
        const response = await api.post(`/api/ImageComparison/compare`, payload);
        return response.data;
    },
    listRecentExercises: async () => {
        const response = await api.get('/api/Exercicios/recent');
        return response.data;
    },
    getExerciseById: async(exerciseId: number) =>{
        const response = await api.get(`/api/Exercicios/${exerciseId}`);
        return response.data;
    }

}