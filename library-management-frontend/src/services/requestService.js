import api from './api';

export const listIssueRequests = async () => {
    const response = await api.get('/admin/list-issue-requests');
    return response.data;
};

export const approveRequest = async (reqID) => {
    const response = await api.post(`/admin/approve-request/${reqID}`);
    return response.data;
};

export const rejectRequest = async (reqID) => {
    const response = await api.post(`/admin/reject-request/${reqID}`);
    return response.data;
};

export const raiseIssueRequest = async (requestData) => {
    const response = await api.post('/reader/raise-issue-request', requestData);
    return response.data;
};