import Image from "next/image";

export default async function Home() {

const result = await fetch("http://localhost:8080/api/v1/users")
const data = await result.json()

  return (
    <div>
      <p>{JSON.stringify(data)}</p>
    </div>
    
  )
}
