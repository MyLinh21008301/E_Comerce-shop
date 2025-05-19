// // "use client";

// // import { useState } from "react";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import { useAuth } from "@/context/AuthContext";

// // export default function LoginPage() {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const successMessage = searchParams.get("success");
// //   const { login, kcLogin, authState } = useAuth();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     if (!username || !password) {
// //       setError("Vui lòng nhập tên đăng nhập và mật khẩu");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const userData = await login(username, password);
// //       if (userData.isVendor) {
// //         router.push("/dashboard");
// //       } else {
// //         router.push("/home");
// //       }
// //     } catch (error) {
// //       console.error("Lỗi đăng nhập:", error);
// //       setError(error.message || "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSSOLogin = () => {
// //     kcLogin(); // Chuyển hướng đến Keycloak login page
// //   };

// //   return (
// //     <div className="flex items-center justify-center h-screen bg-gray-100">
// //       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
// //         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Đăng Nhập</h1>
// //         <form onSubmit={handleLogin}>
// //           {successMessage && (
// //             <p className="text-green-500 mb-4 text-center">{successMessage}</p>
// //           )}
// //           {error && (
// //             <p className="text-red-500 mb-4 text-center">{error}</p>
// //           )}
// //           <div className="mb-4">
// //             <label
// //               htmlFor="username"
// //               className="block text-sm font-medium text-gray-700"
// //             >
// //               Tên đăng nhập
// //             </label>
// //             <input
// //               id="username"
// //               type="text"
// //               placeholder="Nhập tên đăng nhập"
// //               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //               value={username}
// //               onChange={(e) => setUsername(e.target.value)}
// //               required
// //               disabled={loading}
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label
// //               htmlFor="password"
// //               className="block text-sm font-medium text-gray-700"
// //             >
// //               Mật khẩu
// //             </label>
// //             <input
// //               id="password"
// //               type="password"
// //               placeholder="Nhập mật khẩu"
// //               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //               disabled={loading}
// //             />
// //           </div>
// //           <div className="flex items-center justify-between mb-4">
// //             <a href="#" className="text-sm text-blue-600 hover:underline">
// //               Quên mật khẩu?
// //             </a>
// //           </div>
// //           <div className="flex gap-4">
// //             <button
// //               type="button"
// //               onClick={() => router.push("/register")}
// //               className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
// //               disabled={loading}
// //             >
// //               Đăng ký
// //             </button>
// //             <button
// //               type="submit"
// //               className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
// //               disabled={loading}
// //             >
// //               {loading ? "Đang đăng nhập..." : "Đăng nhập"}
// //             </button>
// //           </div>
// //           <div className="mt-4">
// //             <button
// //               type="button"
// //               onClick={handleSSOLogin}
// //               className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
// //               disabled={loading}
// //             >
// //               Đăng nhập với Keycloak
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }



'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import userApi from '@/services/api/user';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { access_token } = await userApi.login({ username, password });
      const decodedToken = jwtDecode(access_token);
      const roles = decodedToken.realm_access?.roles || [];

      const user = {
        username,
        isCustomer: roles.includes('CUSTOMER'),
        isVendor: roles.includes('VENDOR'),
        isUser: roles.includes('USER'),
      };

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      router.push('/home');
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      let errorMessage = 'Đã xảy ra lỗi khi đăng nhập.';
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Lỗi mạng hoặc CORS. Vui lòng kiểm tra kết nối Keycloak.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Username hoặc password không đúng.';
      } else if (error.response?.data?.error_description) {
        errorMessage = error.response.data.error_description;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </button>
        </form>
        <p className="text-center mt-4">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}