"use client";

export default function RegisterPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Đăng Ký Tài Khoản</h1>
        <form className="w-full max-w-lg">
          <div className="mb-6">
            <label htmlFor="fullname" className="block text-lg font-medium text-gray-700">
              Họ và Tên
            </label>
            <input
              id="fullname"
              type="text"
              placeholder="Nhập họ và tên"
              className="mt-3 p-4 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-lg"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Nhập email"
              className="mt-3 p-4 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-lg"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              className="mt-3 p-4 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-lg"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-lg font-medium text-gray-700">
              Xác nhận Mật khẩu
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Nhập lại mật khẩu"
              className="mt-3 p-4 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-lg"
            />
          </div>
          <div className="flex justify-between items-center gap-4">
            <button
              type="submit"
              className="w-full p-5 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600"
            >
              Đăng Ký
            </button>
          </div>
        </form>
      </div>
      <div className="w-full md:w-1/2 bg-red-500 flex flex-col justify-center items-center text-white p-8">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-yellow-300">Shopee 12.12</h2>
        <p className="text-xl md:text-2xl text-white">BIG CHRISTMAS SALE</p>
        <div className="mt-8">
          <p className="text-lg md:text-xl text-yellow-300">Ưu đãi lớn nhất mùa Giáng Sinh!</p>
        </div>
      </div>
    </div>
  );
}
