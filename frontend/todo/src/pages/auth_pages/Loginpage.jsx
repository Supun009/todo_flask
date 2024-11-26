import InputFeild from "../../components/authcomponents/InputFeild";
import AuthButton from "../../components/authcomponents/AuthButton";
import { useState, useRef } from 'react';
import validaotor from 'validator';
import DOMPurify from 'dompurify';


export default function LoginPage() {

    const usernameRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState({
        username: "",
        password: "",
    });



    const handleSubmit = (e)=> {
        e.preventDefault();

        const username = usernameRef.current.value.replace(/\s/g, "");;
        const password = passwordRef.current.value.replace(/\s/g, "");;

        let errors = {}

        if (!username || username.length < 5) {
            errors.username = "Please enter a valid username";
        }

        if (!password || password.length < 6)  {
            errors.password = "Please enter a stronge passwordPassword should be at least 6 characters long";
        }

        if (Object.keys(errors).length > 0) {
            setError(errors)
            return;
        }

        const sanitizedUsername = DOMPurify.sanitize(username); 
        const sanitizedPassword = DOMPurify.sanitize(password);

        const data = { username: sanitizedUsername, password: sanitizedPassword };
        console.log('Sanitized Data:', data);

    }
    


    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-center">
                    Login
                </h1>
            </header>
            
            <section className="w-full max-w-md px-4">
                <form onSubmit={handleSubmit} className="flex flex-col items-center ">
                    
                    <InputFeild name = "username" type = "text" htmlFor ="username" id="username" label="Username" refer={usernameRef}/>
                    {/* Display username error message */}
                    {error.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {error.username}
                            </p>
                        )}

                    <InputFeild name = "password" type = "password" htmlFor ="password" id="password" label="Password" refer={passwordRef}/>
                    {error.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {error.password}
                            </p>
                        )}
                        
                    <AuthButton buttonName = "Login"/>

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

