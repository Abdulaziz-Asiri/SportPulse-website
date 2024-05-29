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
            src="data:image/png;base64,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"
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
