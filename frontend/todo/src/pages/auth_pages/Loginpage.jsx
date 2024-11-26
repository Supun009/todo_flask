export default function LoginPage() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-center">
                    Login
                </h1>
            </header>
            
            <section className="w-full max-w-md px-4">
                <form className="flex flex-col items-center ">
                    
                    <div className="w-full mb-4">
                        <label htmlFor="username" className="block mb-2 text-gray-700">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                           
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="w-full mb-4">
                        <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="w-full mb-4">
                        <button
                            type="submit"
                            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-600">
                            New to here? {' '}
                            <a 
                                href="/signup" 
                                className="text-blue-500 hover:underline"
                            >
                                Sign up
                            </a>
                        </p>
                    </div>

                    <div className="text-center mt-3">
                        <p className="text-gray-600">
                            Forget password? {' '}
                            <a 
                                href="/resetpassword" 
                                className="text-blue-500 hover:underline"
                            >
                                Reset
                            </a>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    )
}