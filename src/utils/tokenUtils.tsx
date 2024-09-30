export const isTokenExpired = (expiration: number | null) => {
    return expiration ? Date.now() >= expiration : true;
  };
  
  export const isRefreshTokenExpired = (refreshExpiration: number | null) => {
    return refreshExpiration ? Date.now() >= refreshExpiration : true;
  };