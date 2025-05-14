export const authHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: token,
        },
    };
};