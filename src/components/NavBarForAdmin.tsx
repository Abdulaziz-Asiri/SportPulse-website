import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CircleUser, Menu, Dumbbell } from "lucide-react"
import { Button } from "./ui/button"
import { useContext } from "react"
import { GlobalContext } from "@/App"
import { Link, useNavigate } from "react-router-dom"
export function NavBarForAdmin() {
  const navigation = useNavigate()

  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is not available")

  const { handleRemoveUser } = context

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    handleRemoveUser()
    navigation("/")
  }

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap- text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link className="flex items-center justify-center" to="/">
          <img
            className="h-12 w-20"
            src="https://res.cloudinary.com/dp5hwcef0/image/upload/v1717352170/Screenshot_2024-06-02_204913_gotfdm.png"
          />
        </Link>
        <Link to="/" className="text-foreground transition-colors hover:text-foreground">
          Home
        </Link>
        <Link to="/Dashboard" className="text-foreground transition-colors hover:text-foreground">
          Dashboard
        </Link>
        <Link
          to="/users_managment"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Users Management
        </Link>
        <Link
          to="/Add_products"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Products Management
        </Link>
        <Link
          to="/add_categories"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Category Management
        </Link>
        <Link
          to="/inventory_managment"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Inventory
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
              <Dumbbell className="h-12 w-12" />
            </Link>
            <Link to="/Dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link to="/products" className="text-muted-foreground hover:text-foreground">
              Products
            </Link>
            <Link to="/add_products" className="text-muted-foreground hover:text-foreground">
              Products Management
            </Link>
            <Link to="/users_managment" className="text-muted-foreground hover:text-foreground">
              Users Management
            </Link>
            <Link to="/add_categories" className="text-muted-foreground hover:text-foreground">
              Category Management
            </Link>
            <Link to="/inventory_managment" className="text-muted-foreground hover:text-foreground">
              Inventory
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
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
            <DropdownMenuItem>
              <Link to="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/contactUs">Settings</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link to="/contactUs">Support</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
