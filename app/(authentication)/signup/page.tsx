"use client";
import { customUser, iCustomUser } from "@/app/_type/iCustomUser";
import { ChangeEvent, FormEvent, useState } from "react";

export default function SignUp() {
  const [customUser, setCustomUser] = useState<iCustomUser>({
    username: "",
    password: "",
    passwordCheck: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (customUser.password !== customUser.passwordCheck) {
      setFeedback("Passwords do not match.");
      return;
    }
    if (customUser.password.length < 8) {
      setFeedback("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);
    setFeedback(null);

    const newUser: customUser = {
      username: customUser.username,
      password: customUser.password,
    };

    try {
      const result = await fetch("http://localhost:8080/api/v1/users", {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(newUser),
      });

      if (result.ok) {
        setFeedback("Signup successful! Redirecting to login...");
        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = "/login"; // Adjust the path as per your project structure
        }, 1500);
      } else {
        const resultError = await result.json();
        setFeedback(resultError.message || "Signup failed.");
        console.error(resultError);
      }
    } catch (error) {
      setFeedback("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCustomUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-700">
  <form
    onSubmit={handleOnSubmit}
    method="post"
    className="flex flex-col max-w-sm gap-4 bg-white p-6 rounded shadow"
  >
    {/* Username Field */}
    <label htmlFor="username" className="text-black">
      Username
    </label>
    <input
      id="username"
      className="text-black p-2 border border-gray-300 rounded"
      type="text"
      name="username"
      value={customUser.username}
      onChange={handleChange}
      required
    />

    {/* Password Field */}
    <label htmlFor="password" className="text-black">
      Password
    </label>
    <input
      id="password"
      className="text-black p-2 border border-gray-300 rounded"
      type="password"
      name="password"
      value={customUser.password}
      onChange={handleChange}
      required
    />

    {/* Confirm Password Field */}
    <label htmlFor="passwordCheck" className="text-black">
      Confirm Password
    </label>
    <input
      id="passwordCheck"
      className="text-black p-2 border border-gray-300 rounded"
      type="password"
      name="passwordCheck"
      value={customUser.passwordCheck}
      onChange={handleChange}
      required
    />

    {/* Feedback Message */}
    {feedback && <p className="text-red-500">{feedback}</p>}

    {/* Submit Button */}
    <button
      className="bg-blue-600 p-4 rounded-md hover:bg-blue-500 text-white"
      type="submit"
      disabled={isLoading}
    >
      Sign Up{" "}
      {isLoading ? <span className="inline-block animate-spin">↻</span> : ""}
    </button>

    {/* Login Navigation */}
    <p className="mt-4 text-gray-400">
      Have an account?{" "}
      <a href="/login" className="text-blue-500 hover:underline">
        Login instead
      </a>
    </p>
  </form>
</div>

  );
}
