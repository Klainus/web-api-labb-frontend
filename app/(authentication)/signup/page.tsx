"use client"
import { customUser, iCustomUser } from "@/app/_type/iCustomUser"
import { ChangeEvent, FormEvent, useState } from "react"

export default function SignUp() {
    const [customUser, setCustomUser] = useState<iCustomUser>({
        username: "",
        password: "",
        passwordCheck: "",
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleOnSubmit(event: FormEvent<HTMLFormElement>){

        event.preventDefault()
        
        setIsLoading(true)

        const newUser: customUser = {
            username: customUser.username,
            password: customUser.password,
        }

        //POST
        const result = await fetch("http://localhost:8080/api/v1/users", {
            method: "POST",
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(newUser),
        })

        if (result.ok) {
            const data = await result.text()
            console.log(data)
        } else {
            const resultError = await result.json()
            console.error(resultError)
        }

        setIsLoading(false)
    }
    function handleChange(event: ChangeEvent<HTMLInputElement>){
        
        setCustomUser(prevState =>({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    return <div className="h-screen justify-center items-center flex flex-col bg-slate-700">
        <form 
        onSubmit={handleOnSubmit}
         method="post" 
         className="flex flex-col max-w-sm gap-4">

            <label htmlFor="username">Username</label>
            <input 
            className="text-black"
            type="text" 
            name="username" 
            value={customUser.username} 
            onChange={handleChange}
            />

            <label htmlFor="password">Password</label>
            <input 
            className="text-black"
            type="password" 
            name="password" 
            value={customUser.password} 
            onChange={handleChange} 
            />

            <label htmlFor="passwordCheck">Confirm password</label>
            <input 
            className="text-black"
            type="password" 
            name="passwordCheck" 
            value={customUser.passwordCheck} 
            onChange={handleChange}
            />
            <p></p>


            <button
          className="bg-blue-600 p-4 rounded-md hover:bg-blue-500"
          type="submit"
          disabled={isLoading}
        >
          Sign Up{" "}
          {isLoading ? (
            <span className="inline-block animate-spin">↻</span>
          ) : (
            ""
          )}
        </button>
        </form>
    </div>
    
}