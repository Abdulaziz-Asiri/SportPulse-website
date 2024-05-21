import api from "@/api"
import NavBar from "@/components/NavigationBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product, User } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { Link } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export function SingUp() {
  const navigation = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  })
  const handleSignUp = async () => {
    try {
      const res = await api.post(`/users/signup`, user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
    console.log("user:", user)
  }

  const handleSubmitUser = async (e: FormEvent) => {
    e.preventDefault()
    const response = await handleSignUp()
    if (response) {
      navigation("/login")
    }
  }

  // const { data, error, isPending } = useQuery<User[]>({
  //   //useQuery Hook is used to fetch the list of products using the getProducts function as the queryFn (query function). useQuery-> It provides a declarative and efficient way to handle data fetching, caching, and synchronization with the UI components.
  //   queryKey: ["products"], //The queryKey is set to ["products"], which is a unique identifier for this query.
  //   queryFn: getProducts // Query function
  // })
  return (
    <>
      <NavBar />
      <div className="mt-36">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <form action="POST" onSubmit={handleSubmitUser}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">Full name</Label>
                  <Input name="name"  required onChange={handleChange} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="first-name">Phone Number</Label>
                <Input
                  name="phone"
                  type="number"
                  placeholder="+966-00000000"
                  onChange={handleChange}
                  required
                />
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a href="/LogIn" className="underline">
                  Log In
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
