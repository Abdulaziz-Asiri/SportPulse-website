import { ChangeEvent, FormEvent, useContext, useState } from "react"
import jwt from 'jwt-decode'
import NavBar from "@/components/NavigationBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import {reshapeUser} from '../lib/utils'
import api from "@/api"
import { GlobalContext } from "@/App"

export function Login() {
  const navigation = useNavigate()
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is not available")

  const { handleStoreUser } = context
  
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
    if (token) {
      const decodedToken =jwt(token)
      const user = reshapeUser(decodedToken)
      localStorage.setItem("token", token) // Store the token in localStorage of browser
      localStorage.setItem("user", JSON.stringify(user))//Store the decodedToken in localStorage of browser
      
      handleStoreUser(user)
      navigation("/")
    }
    console.log("repose:", token)
  }

  return (
    <>
      <NavBar />
      <Card className="mx-auto max-w-sm mt-36 ">
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
              Don&apos;t have an account?
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
