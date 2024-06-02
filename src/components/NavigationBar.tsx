import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { CircleUser, Dumbbell, Menu, MenuIcon } from "lucide-react"
import { Cart } from "./Cart"
import { useContext } from "react"
import { GlobalContext } from "@/App"
import { ROLE } from "@/types"
import { Link, useNavigate } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

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
      <Link className="flex items-center justify-center" to="/">
        <img
          className="h-19 w-20"
          src="https://res.cloudinary.com/dp5hwcef0/image/upload/v1717352170/Screenshot_2024-06-02_204913_gotfdm.png"
        />
      </Link>
      <nav className=" ml-auto hidden gap-4 sm:gap-6 lg:flex">
        <div className="sm:gap-10 flex  items-center   ">
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/products">
            Products
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/contactUs">
            Contact Us
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/aboutUs">
            About
          </Link>
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
          <Cart /> {/*Cart component */}
        </div>
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
                <Link to="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>
              <Link to="/contactUs">Settings</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link to="/contactUs">Support</Link>
            </DropdownMenuItem>
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
        {!state.user && (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleLoginClick}>
              Log In
            </Button>
            <Button size="sm" onClick={handleSignUPClick}>
              Sign Up
            </Button>
          </div>
        )}
        <Cart /> {/*Cart component */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="rounded-full" size="icon" variant="ghost">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium">
              <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                <img
                  className="h-20 w-22"
                  src="https://res.cloudinary.com/dp5hwcef0/image/upload/v1717352170/Screenshot_2024-06-02_204913_gotfdm.png"
                />
              </Link>
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
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem>
                    <Link to="/contactUs">Settings</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link to="/contactUs">Support</Link>
                  </DropdownMenuItem>
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
              <Link className="text-foreground hover:text-foreground" to="/">
                Home
              </Link>
              <Link className="text-foreground hover:text-foreground" to="/products">
                Products
              </Link>
              <Link className="text-foreground hover:text-foreground" to="/contactUs">
                Contact Us
              </Link>
              <Link className="text-foreground hover:text-foreground" to="/aboutUs">
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
