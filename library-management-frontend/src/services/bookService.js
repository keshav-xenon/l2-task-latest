import api from './api';

export const addBook = async (bookData) => {
    const response = await api.post('/admin/add-book', bookData);
    return response.data;
};

export const removeBook = async (isbn) => {
    const response = await api.delete(`/admin/remove-book/${isbn}`);
    return response.data;
};

export const updateBook = async (isbn, bookData) => {
    const response = await api.put(`/admin/update-book/${isbn}`, bookData);
    return response.data;
};

export const searchBooks = async (query) => {
    const response = await api.get('/reader/search-book', { params: query });
    return response.data;
};