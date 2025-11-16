import api from './api';

export const authService = {

    register : async (userName:string ,     email: string, password: string) => {
        const payload = {
            userName,
            email,
            password}
        

        const response = await api.post('/cadastro', payload);
        return response.data;
    },
    login : async (email: string, password: string) => {
        const payload = {
            email,
            password}

        const response = await api.post('login', payload);
        return response.data;
    },
    logout : async () => {
        const response = await api.post('/logout');
        return response.data;
    }

}