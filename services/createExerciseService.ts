import api from "./api";

export enum TipoExercicio {
    Texto = 1,
    Imagem = 2,
    Codigo = 3
}

export const createExerciseService = {
    createExercise: async (
        nome: string,
        tipo: TipoExercicio,
        descricao: string,
        conteudo: string,
        imagem?: File
    ) => {
        const formData = new FormData();
        formData.append('Nome', nome);
        formData.append('Tipo', tipo.toString());
        formData.append('Conteudo', conteudo);
        formData.append('Descricao', descricao);
        
        if (imagem) {
            formData.append('Imagem', imagem);
        }

        return await api.post('/api/Exercicios', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};