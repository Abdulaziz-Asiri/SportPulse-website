import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-label"
import { CircleUser, Link, Menu, Package2, Search } from "lucide-react"

export function AddProducts() {
  
  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap- text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </a>
          <a href="/" className="text-foreground transition-colors hover:text-foreground">
            Home
          </a>
          <a href="/Dashboard" className="text-foreground transition-colors hover:text-foreground">
            Dashboard
          </a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
            Orders
          </a>
          <a
            href="/products"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Add Products
          </a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
            Customers
          </a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
            Analytics
          </a>
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
              <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link href="#" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Orders
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Products
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Customers
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
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
                <a href="/dashboard">Dashboard</a>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Add a New Product
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Fill out the form below to add a new product to our supplement line.
              </p>
            </div>
            <div className="w-full max-w-md">
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" placeholder="Enter product name" type="text" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="protein">Protein Powder</SelectItem>
                      <SelectItem value="vitamin">Vitamins</SelectItem>
                      <SelectItem value="supplement">Supplements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" placeholder="Enter price" type="number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image</Label>
                  <Input id="image" type="file" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter product description" />
                </div>
                <Button size="lg" type="submit">
                  Add Product
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
