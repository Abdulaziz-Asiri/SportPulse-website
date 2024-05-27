/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6JDd9qWmC0G
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select
} from "@/components/ui/select"
import NavBar from "@/components/NavigationBar"
import { Product } from "@/types"

export default function Checkout({ cart }: { cart: Product }) {
  // const context = useContext(GlobalContext)
  // if (!context) throw Error("Context is not available")
  // const { state, handleDeleteFromCart, handleAddToCart } = context
  return (
    <>
      <NavBar />
      <div className="bg-gray-100 dark:bg-gray-800 py-48">
        <div className="max-w-6xl mx-auto px-4 md:px-0">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Cart</h2>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      alt="Leather Backpack"
                      className="rounded-lg"
                      height={80}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover"
                      }}
                      width={80}
                    />
                    <div>
                      <h3 className="font-medium">$</h3>
                      <p className="text-gray-500">$199</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost">
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span>1</span>
                    <Button size="icon" variant="ghost">
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">$199</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">$10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax</span>
                  <span className="font-medium">$15</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">$224</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Checkout</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" type="email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter your address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter your city" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="Enter your state" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="zip">Zip</Label>
                    <Input id="zip" placeholder="Enter your zip code" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="Enter your country" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="payment">Payment Method</Label>
                  <Select id="payment">
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" size="lg">
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
