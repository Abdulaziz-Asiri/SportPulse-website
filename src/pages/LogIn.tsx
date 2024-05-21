// import Link from "next/link"

import api from "@/api"
import NavBar from "@/components/NavigationBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export function Login() {
  const navigation = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const handleLogIn = async () => {
    try {
      const res = await api.post(`/users/login`, user)
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

  const handleLogInUser = async (e: FormEvent) => {
    e.preventDefault()
    const token = await handleLogIn() // The response will be a token number from the server
    localStorage.setItem("token", token) // Store the token in localStorage of browser
    if (token) {
      navigation("/")
    }
    console.log("repose:", token)
  }

  return (
    <>
      <NavBar />
      <Card className="mx-auto max-w-sm mt-36">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="POST" onSubmit={handleLogInUser}>
            <div className="grid gap-4">
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input name="password" type="password" required onChange={handleChange} />
              </div>
              <a href="/singup" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/singup" className="underline">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
