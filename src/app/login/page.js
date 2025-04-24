"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Giả lập kiểm tra đăng nhập
    if (username === "admin" && password === "123") {
      // Đăng nhập thành công
      login({
        username: username,
        name: "Admin User",
        role: "admin"
      });
      router.push('/home');
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không chính xác");
    }
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
