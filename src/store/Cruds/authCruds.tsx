export const loginApi = async (username: string, password: string) => {
  return new Promise<{
    token: string;
    tokenExpireDate: Date;
    refreshToken: string;
    refreshTokenExpireDate: Date;
  }>((resolve, reject) => {
    setTimeout(() => {
      const tokenExpireDate = new Date(Date.now() + 3600 * 1000); // 1 hour
      const refreshTokenExpireDate = new Date(Date.now() + 7200 * 1000); // 2 hours
      resolve({
        token: 'fake-jwt-token',
        tokenExpireDate,
        refreshToken: 'fake-refresh-token',
        refreshTokenExpireDate,
      });
    }, 1000);
  });
};
