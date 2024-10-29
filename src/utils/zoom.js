export const isTokenExpired = (createdAt, expiresIn) => {
    const tokenExpiryTime = new Date(createdAt).getTime() + expiresIn * 1000;
    return Date.now() >= tokenExpiryTime;
};