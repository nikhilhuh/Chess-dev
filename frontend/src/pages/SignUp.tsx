import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ErrorModal from "../components/Modals/ErrorModal";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { User } from "../utils/constants";
import { useAuth } from "../context/AuthContext";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<
    User & { confirmPassword: string }
  >({
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [isSubmitButtonDisabled, setisSubmitButtonDisabled] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const { signUp } = useAuth();

  useEffect(() => {
    setisSubmitButtonDisabled(
      !credentials.userName ||
        !credentials.email ||
        !credentials.password ||
        !credentials.confirmPassword
    );
  }, [credentials]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      setPasswordsMatch(false);
      setTimeout(() => {
        setPasswordsMatch(true);
      }, 2000);
      return;
    }
    setisSubmitButtonDisabled(true);
    if (
      !credentials.userName ||
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }
    try {
      await signUp(credentials);
      navigate("/");
    } catch (error) {
      setError("Sign up failed.");
    } finally {
      setisSubmitButtonDisabled(false);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      {error && <ErrorModal error={error} onClose={() => setError("")} />}

      <div className="text-center w-[80vw] mobile-m:w-[75vw] mobile-l:w-[65vw] mobile-tablet:w-[55vw] tablet:w-[50vw] laptop-sm:w-[40vw]">
        <div className="font-bold text-[4.5vw] mobile-m:text-[4vw] mobile-l:text-[3.5vw] mobile-tablet:text-[3vw] tablet:text-[2.5vw] laptop-l:text-[2vw]">
          Register for a Chess account
        </div>
        <hr className="border-1 border-gray-300 mt-5 mb-4" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-start gap-2"
        >
          <label className="font-mono text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] flex flex-col gap-1 4k:gap-2">
            Enter your name
            <input
              onChange={handleChange}
              value={credentials.name}
              aria-invalid={!!error}
              name="name"
              type="text"
              id="name"
              autoComplete="off"
              className="outline-none bg-transparent border-2 border-gray-200 rounded-lg laptop-sm:rounded-xl 4k:rounded-3xl text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] py-1 px-2 laptop-sm:px-4 4k:px-8"
              placeholder="Your name.."
            />
          </label>

          <label className="font-mono text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] flex flex-col gap-1 4k:gap-2">
            Enter a username
            <input
              onChange={handleChange}
              value={credentials.userName}
              aria-invalid={!!error}
              name="userName"
              type="text"
              id="userName"
              autoComplete="off"
              className="outline-none bg-transparent border-2 border-gray-200 rounded-lg laptop-sm:rounded-xl 4k:rounded-3xl text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] py-1 px-2 laptop-sm:px-4 4k:px-8"
              placeholder="Your username..."
            />
          </label>

          <label className="font-mono text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] flex flex-col gap-1 4k:gap-2">
            Enter Email
            <input
              onChange={handleChange}
              value={credentials.email}
              name="email"
              aria-invalid={!!error}
              type="email"
              id="email"
              autoComplete="off"
              className="outline-none bg-transparent border-2 border-gray-200 rounded-lg laptop-sm:rounded-xl 4k:rounded-3xl text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] py-1 px-2 laptop-sm:px-4 4k:px-8"
              placeholder="example@email.com"
            />
          </label>

          <label className={`font-mono text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] flex flex-col gap-1 4k:gap-2 ${!passwordsMatch? "relative" : ""}`}>
            Enter Password
            {!passwordsMatch && (
              <p className="absolute top-2 right-2 laptop-sm:right-3 laptop-sm:top-4 4k:top-6 4k:right-6 text-red-400 text-[2vw] mobile-m:text-[1.6vw] mobile-l:text-[1.4vw] mobile-tablet:text-[1.2vw] tablet:text-[1vw] laptop-sm:text-[0.8vw]">Passwords didn't match</p>
            )}
            <div className="relative">
              <input
                onChange={handleChange}
                aria-invalid={!!error}
                value={credentials.password}
                name="password"
                type={`${showPassword ? "text" : "password"}`}
                id="pass"
                className={`outline-none bg-transparent border-2 ${
                  !passwordsMatch ? "border-red-400" : "border-gray-200"
                } rounded-lg laptop-sm:rounded-xl 4k:rounded-3xl text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] py-1 px-2 pr-6 mobile-tablet:pr-8 laptop-sm:pr-10 4k:pr-16 laptop-sm:px-4 4k:px-8 w-full`}
                placeholder="*******"
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

          <label className={`font-mono text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] flex flex-col gap-1 4k:gap-2 ${!passwordsMatch? "relative" : ""}`}>
            Confirm Password
            {!passwordsMatch && (
              <p className="absolute top-2 right-2 laptop-sm:right-3 laptop-sm:top-4 4k:top-6 4k:right-6 text-red-400 text-[2vw] mobile-m:text-[1.6vw] mobile-l:text-[1.4vw] mobile-tablet:text-[1.2vw] tablet:text-[1vw] laptop-sm:text-[0.8vw]">Passwords didn't match</p>
            )}
            <div className="relative">
              <input
                onChange={handleChange}
                aria-invalid={!!error}
                value={credentials.confirmPassword}
                name="confirmPassword"
                type={`${showConfirmPassword ? "text" : "password"}`}
                id="confirmPassword"
                className={`outline-none bg-transparent border-2 ${
                  !passwordsMatch ? "border-red-400" : "border-gray-200"
                } rounded-lg laptop-sm:rounded-xl 4k:rounded-3xl text-[4vw] mobile-m:text-[3.5vw] mobile-l:text-[3vw] mobile-tablet:text-[2.5vw] tablet:text-[2vw] laptop-l:text-[1.5vw] py-1 px-2 pr-6 mobile-tablet:pr-8 laptop-sm:pr-10 4k:pr-16 laptop-sm:px-4 4k:px-8 w-full`}
                placeholder="*******"
              />
              <div
                title={`${
                  showConfirmPassword ? "Hide Password" : "Show Password"
                }`}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 -translate-y-1/2 right-2 mobile-tablet:right-3 4k:right-4 cursor-pointer z-40"
              >
                {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
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
            Sign Up
          </button>
        </form>

        <hr className="border-1 border-gray-300 mt-5 mb-4" />
        <div className="text-[3.5vw] mobile-m:text-[3vw] mobile-l:text-[2.5vw] mobile-tablet:text-[2vw] tablet:text-[1.5vw] laptop-l:text-[1vw]">
          Already have an account?
          <Link
            to="/signin"
            className="underline underline-offset-1 ml-1 hover:scale-105 hover:text-blue-800"
          >
            Log In here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
