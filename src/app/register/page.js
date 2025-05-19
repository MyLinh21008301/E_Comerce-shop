// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";

// export default function RegisterPage() {
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const { kcRegister } = useAuth();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await kcRegister(); // Chuyển hướng đến Keycloak registration page
//       // Chuyển hướng được xử lý bởi Keycloak (quay lại /login sau khi đăng ký)
//     } catch (error) {
//       console.error("Lỗi đăng ký với Keycloak:", error);
//       setError("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Đăng Ký</h1>
//         <form onSubmit={handleRegister}>
//           {error && (
//             <p className="text-red-500 mb-4 text-center">{error}</p>
//           )}
//           <div className="mb-4">
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Tên đăng nhập
//             </label>
//             <input
//               id="username"
//               type="text"
//               placeholder="Nhập tên đăng nhập"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               disabled
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Nhập email"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               disabled
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="firstName"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Tên
//             </label>
//             <input
//               id="firstName"
//               type="text"
//               placeholder="Nhập tên"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               disabled
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="lastName"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Họ
//             </label>
//             <input
//               id="lastName"
//               type="text"
//               placeholder="Nhập họ"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               disabled
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="role"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Vai trò
//             </label>
//             <select
//               id="role"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               disabled
//             >
//               <option value="USER">Người dùng</option>
//               <option value="CUSTOMER">Khách hàng</option>
//               <option value="VENDOR">Nhà cung cấp</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Mật khẩu
//             </label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Nhập mật khẩu"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               disabled
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="confirmPassword"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Xác nhận mật khẩu
//             </label>
//             <input
//               id="confirmPassword"
//               type="password"
//               placeholder="Xác nhận mật khẩu"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               disabled
//             />
//           </div>
//           <div className="flex gap-4">
//             <button
//               type="button"
//               onClick={() => router.push("/login")}
//               className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
//               disabled={loading}
//             >
//               Đăng nhập
//             </button>
//             <button
//               type="submit"
//               className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
//               disabled={loading}
//             >
//               {loading ? "Đang chuyển hướng..." : "Đăng ký với Keycloak"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import userApi from '@/services/api/user';
import Link from 'next/link';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      setLoading(false);
      return;
    }

    try {
      console.log('Starting registration with username:', username);
      await userApi.register({
        username,
        email,
        firstName,
        lastName,
        role,
        password,
      });
      console.log('Registration successful');
      router.push('/login?success=Đăng ký thành công! Vui lòng đăng nhập.');
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      let errorMessage = 'Đã xảy ra lỗi khi đăng ký.';
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Lỗi mạng hoặc CORS. Vui lòng kiểm tra kết nối Keycloak.';
      } else if (error.response?.status === 409) {
        errorMessage = 'Username hoặc email đã tồn tại.';
      } else if (error.response?.data?.error_description) {
        errorMessage = error.response.data.error_description;
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Đăng Ký</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              Họ
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Tên
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Vai trò
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="CUSTOMER">Customer</option>
              <option value="VENDOR">Vendor</option>
              <option value="USER">User (Customer + Vendor)</option>
            </select>
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
          </button>
        </form>
        <p className="text-center mt-4">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}