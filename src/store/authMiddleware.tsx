import { Middleware } from 'redux';
import {logout} from './Slices/authSlices'; 

const authMiddleware: Middleware =
  ({ getState, dispatch }) =>
  (next) =>
  (action: any) => { 
    const { auth } = getState();

    // Token süresi dolmuşsa kontrol et
    if (new Date() > auth.tokenExpireDate) {
      if (new Date() < auth.refreshTokenExpireDate) {

      } else {
        // Refresh token geçerli değilse çıkış yap
        if (action.type !== logout.type) {
          dispatch(logout());
        }
      }
    }

    return next(action); // Diğer middleware'lere ve reducer'lara geç
  };

export default authMiddleware;
