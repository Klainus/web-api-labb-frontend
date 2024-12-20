"use client";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setFeedback(null);
  
    try {
      const result = await fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(credentials),
      });
  
      if (result.ok) {
        setTimeout(() => {
          window.location.href = "/homePage";
        }, 1500);
        
      } else {
        const errorData = await result.json();
        setFeedback(errorData.message || "Login failed.");
        console.error("Error data:", errorData);
      }
    } catch (error) {
      let errorMessage = "An error occurred while communicating with the server.";
      if (error instanceof Error) {
        errorMessage = `Network error: ${error.message}`;
      } else {
        console.error("Unexpected error:", error);
      }
      setFeedback(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCredentials((prevState) => ({
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
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          placeholder="Username"
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
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          placeholder="Password"
        />

        {/* Feedback Message */}
        {feedback && <p className="text-red-500">{feedback}</p>}

        {/* Submit Button */}
        <button
          className="bg-blue-600 p-4 rounded-md hover:bg-blue-500 text-white"
          type="submit"
          disabled={isLoading}
        >
          Login{" "}
          {isLoading ? <span className="inline-block animate-spin">↻</span> : ""}
        </button>

        {/* Signup Navigation */}
        <p className="mt-4 text-gray-400" >
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up instead
          </a>
        </p>
      </form>
    </div>
  );
}
