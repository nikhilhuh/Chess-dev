import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ErrorModal from "../components/Modals/ErrorModal";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { signInCredentials } from "../utils/constants";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<signInCredentials>({
    userName: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isSubmitButtonDisabled, setisSubmitButtonDisabled] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    setisSubmitButtonDisabled(!credentials.userName || !credentials.password);
  }, [credentials]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisSubmitButtonDisabled(true);
    try {
      await signIn(credentials)
      navigate("/");
    } catch (error) {
      setError("Sign in Failed");
    } finally {
      setisSubmitButtonDisabled(false);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      {error && <ErrorModal error={error} onClose={() => setError("")} />}

      <div className="text-center w-[80vw] mobile-m:w-[75vw] mobile-l:w-[65vw] mobile-tablet:w-[55vw] tablet:w-[50vw] laptop-sm:w-[40vw]">
        <div className="font-bold text-[4.5vw] mobile-m:text-[4vw] mobile-l:text-[3.5vw] mobile-tablet:text-[3vw] tablet:text-[2.5vw] laptop-l:text-[2vw]">
          Login to your Chess account
        </div>

        <hr className="border-1 border-gray-300 mt-5 mb-4" />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-start gap-4"
        >
          <label className="font-mono text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] flex flex-col gap-1 4k:gap-2">
            Username
            <input
              name="userName"
              id="userName"
              aria-invalid={!!error}
              onChange={handleChange}
              value={credentials.userName}
              type="text"
              autoComplete="username"
              className="outline-none bg-transparent border-2 border-gray-200 rounded-lg laptop-sm:rounded-xl 4k:rounded-3xl text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] py-1 px-2 laptop-sm:px-4 4k:px-8"
              placeholder="Your username..."
            />
          </label>

          <label className="font-mono text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] flex flex-col gap-1 4k:gap-2">
            Password
            <div className="relative">
              <input
                name="password"
                id="password"
                aria-invalid={!!error}
                onChange={handleChange}
                value={credentials.password}
                type={`${showPassword ? "text" : "password"}`}
                autoComplete="current-password"
                className="outline-none bg-transparent border-2 border-gray-200 rounded-lg laptop-sm:rounded-xl 4k:rounded-3xl text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] py-1 px-2 pr-6 mobile-tablet:pr-8 laptop-sm:pr-10 4k:pr-16 laptop-sm:px-4 4k:px-8 w-full"
                placeholder="******"
              />
              <div
                title={`${showPassword ? "Hide Password" : "Show Password"}`}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 -translate-y-1/2 right-2 mobile-tablet:right-3 4k:right-4 cursor-pointer z-40"
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </div>
            </div>
          </label>

          <button
            disabled={isSubmitButtonDisabled}
            type="submit"
            className={`font-bold p-2 rounded-full w-full text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] ${
              isSubmitButtonDisabled
                ? "bg-gray-400 text-gray-700"
                : "bg-primaryButtonBackground text-white hover:bg-primaryButtonBackgroundHover"
            }`}
          >
            Sign In
          </button>
        </form>

        <hr className="border-1 border-gray-300 mt-5 mb-4" />

        <div className="text-[3.5vw] mobile-m:text-[3vw] mobile-l:text-[2.5vw] mobile-tablet:text-[2vw] tablet:text-[1.5vw] laptop-l:text-[1vw]">
          Don't have an account?
          <Link
            to="/signup"
            className="underline underline-offset-1 ml-1 hover:scale-105 hover:text-blue-800"
          >
            Sign Up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
