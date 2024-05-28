import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { CircleUser, Dumbbell, MenuIcon } from "lucide-react"
import { Cart } from "./Cart"
import { useContext } from "react"
import { GlobalContext } from "@/App"
import { ROLE } from "@/types"
import { useNavigate } from "react-router-dom"

export default function NavBar() {
   const navigation = useNavigate()
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is not available")

  const { state, handleRemoveUser } = context

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    handleRemoveUser()
    navigation("/")
  }
  const handleLoginClick = () => {
    navigation("/login")
  }
  const handleSignUPClick = () => {
    navigation("/SingUp")
  }

  return (
    <header className=" fixed top-0 left-0 right-0 z-50 flex h-20 w-full shrink-0 items-center px-4 md:px-6 border-b bg-white dark:bg-gray-950">
      <a className="flex items-center justify-center" href="/">
        <Dumbbell className="h-12 w-12" />
      </a>
      <nav className=" ml-auto hidden gap-4 sm:gap-6 lg:flex">
        <div className="sm:gap-10 flex  items-center   ">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/products">
            Products
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/contactUs">
            Contact Us
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/aboutUs"
          >
            About
          </a>
          {!state.user && (
            <div className="flex items-center gap-2">
              <Button
                className="hidden md:inline-flex"
                size="sm"
                variant="outline"
                onClick={handleLoginClick}
              >
                Log In
              </Button>
              <Button size="sm" onClick={handleSignUPClick}>
                Sign Up
              </Button>
            </div>
          )}
        </div>
        <Cart /> {/*Cart component */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {state.user?.role === ROLE.Admin && ( // Protect component from customers
              <DropdownMenuItem>
                <a href="/dashboard">Dashboard</a>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            {state.user && (
              <DropdownMenuItem>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="ml-auto flex items-center gap-2 lg:hidden">
        <Button className="rounded-full" size="icon" variant="ghost">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </div>
    </header>
  )
}
