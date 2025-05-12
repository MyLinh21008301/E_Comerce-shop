"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';


const defaultToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKcGNvM1ZIeFJTMVhrSm1mcVN3WXp4NHZLenFPUUhoTUlmaXJoRFYtVUZVIn0.eyJleHAiOjE3NDcwNTQ2NjMsImlhdCI6MTc0NzAxODY2NiwianRpIjoib25ydGFjOmUyMmU4OTllLTUxMmUtNDQwZC1hYTNiLWI2YTUzNjJlNzRiZCIsImlzcyI6Imh0dHA6Ly81ZWFjLTEyNS0yMzUtMjM5LTE5Ni5uZ3Jvay1mcmVlLmFwcC9yZWFsbXMvZGVtbyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZyb250ZW5kLWNsaWVudCIsInNpZCI6ImUyOTI5ZTZkLWI1OTktNDk4Zi05NWEzLWQwN2I5YTQ1ZDZkMiIsInNjb3BlIjoib3BlbmlkIHJvbGVzIHBob25lIiwicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJWRU5ET1IiLCJkZWZhdWx0LXJvbGVzLWRlbW8iLCJ1bWFfYXV0aG9yaXphdGlvbiIsIlVTRVIiXSwibGFzdF9uYW1lIjoicGhhbSIsInBob25lX251bWJlciI6IjA5NDQ3MTMwMTUiLCJmaXJzdF9uYW1lIjoibWFuaCIsImVtYWlsIjoicG1hbmhoMTdAZ21haWwuY29tIiwidXNlcm5hbWUiOiJoZWdvcGxheSJ9.3A1gU2TfZ5yrcm4j0QAx8zG6qnL_OI5UjvzGztFbLm4tS9vE0GmTR-UlmC1JYtitQKKh0f-7Z6BKfunrWeJ6VAU6EzZbtDpOa-fr-wZeE30E_lEYgqFYdDsMXvD-AEpiSkF1UWSZ8HjPZe4l5JfQHQxd_jpP6ZFsoUWOOZPPDqpdCV9X8p27F7-ietIly2iLkPr15AdywDggQBur9llfbpqsF8nIvGX4mtAOz_NZliqMecoH9rCuGL9DtD2KhZQAdo3BbYQPIaqLI_bLzTsywr_H3Prhi5p3j558pO-KmoN-4dAZ6j5oNibI31KV0gMN9BWBbeFBMPHpy_QZYijutQ";


export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  useEffect(() =>{
    localStorage.setItem("accessToken", defaultToken);
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Giả lập kiểm tra đăng nhập
    if (username === "admin" && password === "123") {
      // Đăng nhập thành công


      login({
        username: username,
        name: "Admin User", //chinh lai sang fullName
        role: "admin"
      });
      
      router.push('/home');
    }

    //   fetch(`${backendUrl}/api/users/me`, {
    //     method: 'GET',
    //     headers: {
    //       'Authorization': `Bearer ${defaultToken}`,
    //       'Content-Type': 'application/json'
    //     }
    //   }).then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error('Failed to fetch user data');
    //     }
    //   })
    //   .then((data) => {
    //     login(data);
    //     router.push('/home');
    //   }
    //   ).catch((error) => {
    //     console.error('Error:', error);
    //     setError("Đã xảy ra lỗi khi tải thông tin người dùng");
    //   });
    //   // const 
    //   // router.push('/home');
    // } else {
    //   setError("Tên đăng nhập hoặc mật khẩu không chính xác");
    // }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Đăng Nhập</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
            <input
              id="username"
              type="text"
              placeholder="Nhập tên đăng nhập"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <a href="#" className="text-sm text-blue-600 hover:underline">Quên mật khẩu?</a>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Đăng ký
            </button>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
