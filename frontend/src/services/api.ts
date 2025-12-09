const API_BASE_URL = 'http://localhost:8080';

export const apiRequest = async (
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> => {

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
console.log("endpoint: ", endpoint)
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({
            message: 'Erro na requisição'
        }));

        throw new Error(errorData.error || errorData.message || `Erro: ${response.status}`);
    }

    return response;
};
