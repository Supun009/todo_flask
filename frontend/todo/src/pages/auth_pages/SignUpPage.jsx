import React from "react";
import InputFeild from "../../components/authcomponents/InputFeild";
import AuthButton from "../../components/authcomponents/AuthButton";
import { useState, useRef } from 'react';
import validaotor from 'validator';
import DOMPurify from 'dompurify';




export default function SignUpPage() { 

    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();



    const handleSubmit = (e)=> {
        e.preventDefault();

        const email = emailRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        let errors = {}

        if (!email || !validaotor.isAlphanumeric(email)) {
            errors.username = "Please enter a valid username";
        }

        if (!username) {
            errors.username = "Please enter a valid username";
        }

        if (!password || password.length < 6)  {
            errors.password = "Please enter a stronge passwordPassword should be at least 6 characters long";
        }

        if (Object.keys(errors).length > 0) {
            console.log(errors);
            return;
        }

        const sanitizedUsername = DOMPurify.sanitize(username); 
        const sanitizedPassword = DOMPurify.sanitize(password);

        const data = { username: sanitizedUsername, password: sanitizedPassword };
        console.log('Sanitized Data:', data);

    }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center">Sign Up</h1>
        </header>

        <section className="w-full max-w-md px-4">
          <form onSubmit={handleSubmit} className="flex flex-col items-center ">
            <InputFeild
              type="email"
              htmlFor="email"
              id="email"
              label="Email"
              name = "email"
              refer={emailRef}
              
            />
            <InputFeild name = "username" type="text" htmlFor="username" id = "username" label="Username" refer={usernameRef}/>
            <InputFeild name = "password" type="password" htmlFor="password" id="password" label="Password" refer={passwordRef}/>

            <AuthButton buttonName="Signup" />

            

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 hover:underline">
                  Log in
                </a>
              </p>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
