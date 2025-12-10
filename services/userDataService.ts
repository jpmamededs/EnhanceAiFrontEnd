import api from "./api";

export const userDataService = {
    editUserData : async (id: string) => {
        const response = await api.put(`/update/${id}`);
        return response.data;
    }
}