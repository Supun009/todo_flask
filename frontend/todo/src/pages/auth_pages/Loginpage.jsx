import InputFeild from "../../components/authcomponents/InputFeild";
import AuthButton from "../../components/authcomponents/AuthButton";
import { useState, useRef } from "react";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { login } from "../../services/AuthService";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate();

  const useremailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = useremailRef.current.value.replace(/\s/g, "");
    const password = passwordRef.current.value.replace(/\s/g, "");

    let errors = {};

    if (!email || email.length < 5) {
      errors.email = "Please enter a valid username";
    }

    if (!password || password.length < 6) {
      errors.password = "Please enter password";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const sanitizedUsername = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    const data = { email: sanitizedUsername, password: sanitizedPassword };
    handleLogin(data);
  };

  const handleLogin = async (data) => {
    
    try {
      const response = await login(data.email, data.password);
      console.log(response);

      navigate("/", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">Login</h1>
      </header>

      <section className="w-full max-w-md px-4">
        <form onSubmit={handleSubmit} className="flex flex-col items-center ">
          <InputFeild
            name="email"
            type="email"
            htmlFor="email"
            id="email"
            label="Email"
            refer={useremailRef}
            error={error.email ? error.email : ""}
          />

          <InputFeild
            name="password"
            type="password"
            htmlFor="password"
            id="password"
            label="Password"
            refer={passwordRef}
            error={error.password ? error.password : ""}
          />

          <AuthButton buttonName="Login" />

          <div className="text-center">
            <p className="text-gray-600">
              New to here?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <div className="text-center mt-3">
            <p className="text-gray-600">
              Forget password?{" "}
              <Link
                to="/resetpassword"
                className="text-blue-500 hover:underline"
              >
                Reset
              </Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
