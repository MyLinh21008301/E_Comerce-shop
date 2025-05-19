// "use client";

// import keycloak from '@/lib/keycloak';
// import { createContext, useContext, useEffect, useState } from 'react';
// import userApi from '@/services/api/user';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [authState, setAuthState] = useState({
//     isAuthenticated: false,
//     user: null,
//     token: null,
//     isLoading: true,
//   });

//   useEffect(() => {
//     const initializeKeycloak = async () => {
//       try {
//         console.log('Initializing Keycloak...');
//         const authenticated = await keycloak.init({
//           onLoad: 'check-sso',
//           silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
//           pkceMethod: 'S256',
//         });

//         console.log('Keycloak init result:', authenticated);

//         if (authenticated) {
//           const token = keycloak.token;
//           localStorage.setItem('accessToken', token);

//           // Lấy thông tin người dùng từ backend
//           const userData = await userApi.getCurrentUser(token);

//           // Kiểm tra vai trò
//           let isVendor = false;
//           let isCustomer = false;
//           let isUser = true;

//           try {
//             await userApi.getVendorById(userData.userId, token);
//             isVendor = true;
//             isUser = false;
//           } catch (error) {
//             if (error.response?.status !== 404) {
//               console.error('Lỗi kiểm tra vendor:', error);
//             }
//           }

//           try {
//             await userApi.getCustomerById(userData.userId, token);
//             isCustomer = true;
//             isUser = false;
//           } catch (error) {
//             if (error.response?.status !== 404) {
//               console.error('Lỗi kiểm tra customer:', error);
//             }
//           }

//           const fullUserData = { ...userData, token, isVendor, isCustomer, isUser };
//           setUser(fullUserData);
//           localStorage.setItem('user', JSON.stringify(fullUserData));

//           setAuthState({
//             isAuthenticated: true,
//             user: keycloak.tokenParsed,
//             token,
//             isLoading: false,
//           });
//         } else {
//           setAuthState({
//             isAuthenticated: false,
//             user: null,
//             token: null,
//             isLoading: false,
//           });
//         }
//       } catch (error) {
//         console.error('Keycloak initialization error:', error);
//         setAuthState({
//           isAuthenticated: false,
//           user: null,
//           token: null,
//           isLoading: false,
//         });
//       }
//     };

//     initializeKeycloak();

//     // Load user từ localStorage nếu có
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error('Failed to parse stored user data:', error);
//         localStorage.removeItem('user');
//         localStorage.removeItem('accessToken');
//       }
//     }

//     // Xử lý Keycloak events
//     keycloak.onAuthSuccess = () => {
//       console.log('Authenticated');
//       initializeKeycloak(); // Re-run để cập nhật trạng thái
//     };

//     keycloak.onAuthLogout = () => {
//       setUser(null);
//       localStorage.removeItem('user');
//       localStorage.removeItem('accessToken');
//       setAuthState({
//         isAuthenticated: false,
//         user: null,
//         token: null,
//         isLoading: false,
//       });
//     };

//     return () => {
//       keycloak.onAuthSuccess = null;
//       keycloak.onAuthLogout = null;
//     };
//   }, []);

//   const kcLogin = () => keycloak.login();
//   const kcLogout = () => keycloak.logout({ redirectUri: window.location.origin });
//   const kcRegister = () => keycloak.register();
//   const kcRefreshToken = async () => {
//     try {
//       const refreshed = await keycloak.updateToken(30);
//       if (refreshed) {
//         localStorage.setItem('accessToken', keycloak.token);
//         setAuthState((prev) => ({ ...prev, token: keycloak.token }));
//       }
//       return refreshed;
//     } catch (error) {
//       console.error('Lỗi refresh token:', error);
//       return false;
//     }
//   };

//   const login = async (username, password) => {
//     try {
//       const loginResponse = await userApi.login(username, password);
//       const token = loginResponse.access_token;
//       localStorage.setItem('accessToken', token);

//       const userData = await userApi.getCurrentUser(token);

//       let isVendor = false;
//       let isCustomer = false;
//       let isUser = true;

//       try {
//         await userApi.getVendorById(userData.userId, token);
//         isVendor = true;
//         isUser = false;
//       } catch (error) {
//         if (error.response?.status !== 404) {
//           throw new Error('Lỗi kiểm tra vai trò vendor');
//         }
//       }

//       try {
//         await userApi.getCustomerById(userData.userId, token);
//         isCustomer = true;
//         isUser = false;
//       } catch (error) {
//         if (error.response?.status !== 404) {
//           throw new Error('Lỗi kiểm tra vai trò customer');
//         }
//       }

//       const fullUserData = { ...userData, token, isVendor, isCustomer, isUser };
//       setUser(fullUserData);
//       localStorage.setItem('user', JSON.stringify(fullUserData));

//       setAuthState({
//         isAuthenticated: true,
//         user: keycloak.tokenParsed || userData,
//         token,
//         isLoading: false,
//       });

//       return fullUserData;
//     } catch (error) {
//       console.error('Lỗi đăng nhập:', error);
//       throw error;
//     }
//   };

//   const logout = () => {
//     kcLogout();
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         authState,
//         kcLogin,
//         kcLogout,
//         kcRegister,
//         kcRefreshToken,
//         hasRole: (role) => keycloak.hasRealmRole(role),
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser(JSON.parse(storedUser));
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Lỗi giải mã token:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}