const apiUrl = "http://localhost:5104";

const api = {
    post: async (endpoint: string, data: any) => {
        try {
            console.log('Fazendo requisição POST para:', `${apiUrl}${endpoint}`);
            console.log('Dados enviados:', JSON.stringify(data, null, 2));
            
            const response = await fetch(`${apiUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify(data),
            });
            
            console.log('Status da resposta:', response.status);
            console.log('Headers da resposta:', response.headers);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Resposta de erro:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            
            const result = await response.json();
            console.log('Resposta bem-sucedida:', result);
            return { data: result };
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    
    get: async (endpoint: string) => {
        try {
            const response = await fetch(`${apiUrl}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                mode: 'cors',
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            return { data: result };
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
};

export default api;