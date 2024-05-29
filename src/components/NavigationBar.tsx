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
          className="h-20 w-20"
          src="data:image/png;base64,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"
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
                  src="data:image/png;base64,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"
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
              <Link
                className="text-foreground hover:text-foreground"
                to="/products"
              >
                Products
              </Link>
              <Link
                className="text-foreground hover:text-foreground"
                to="/contactUs"
              >
                Contact Us
              </Link>
              <Link
                className="text-foreground hover:text-foreground"
                to="/aboutUs"
              >
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
