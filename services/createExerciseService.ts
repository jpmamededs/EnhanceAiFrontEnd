import api from "./api";

export const createExerciseService = {

    createExercise: async (data: any) => {
        // TODO: Implementar a criação do exercício
        return await api.post('/exercicios', data);
    }
};