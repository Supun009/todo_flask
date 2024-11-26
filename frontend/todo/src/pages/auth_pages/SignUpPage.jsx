import React from 'react'

export default function SignUpPage() {
  return (
    <>
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-center">
                    Sign Up
                </h1>
            </header>
            
            <section className="w-full max-w-md px-4">
                <form className="flex flex-col items-center ">
                    <div className="w-full mb-4">
                        <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
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
                            Already have an account? {' '}
                            <a 
                                href="/login" 
                                className="text-blue-500 hover:underline"
                            >
                                Log in
                            </a>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    </>
  )
}