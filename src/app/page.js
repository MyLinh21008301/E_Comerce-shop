export default function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section: Login Form */}
      <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Shopee New</h1>
        <form className="w-full max-w-md">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              placeholder="Nhập tên đăng nhập"
              className="mt-2 p-3 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              className="mt-2 p-3 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="mb-4 text-right">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Quên mật khẩu?
            </a>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="p-3 bg-gray-300 text-sm rounded-lg text-gray-800 hover:bg-gray-400"
            >
              Đăng ký
            </button>
            <button
              type="submit"
              className="p-3 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>

      {/* Right Section: Banner */}
      <div className="w-full md:w-1/2 bg-red-500 flex flex-col justify-center items-center text-white p-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-300">
          Shopee 12.12
        </h2>
        <p className="text-lg md:text-xl text-white">BIG CHRISTMAS SALE</p>
        <div className="mt-6">
          <p className="text-base md:text-lg text-yellow-300">
            Ưu đãi lớn nhất mùa Giáng Sinh!
          </p>
        </div>
      </div>
    </div>
  );
}
