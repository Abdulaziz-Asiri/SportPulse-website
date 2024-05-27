import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { useContext } from "react";
import { GlobalContext } from "@/App";
import { Product } from "@/types";
import { Link, Navigate } from "react-router-dom";
import NavBar from "./NavigationBar";


type OrderItem = {
  inventoryId: string
  orderId: string
  quantity: number
  totalPrice: number
}

type OrderCheckout = {
  userId: string
  date: string
  items: OrderItem[]
}
export function Cart() {
    const context = useContext(GlobalContext)
    if (!context) throw Error("Context is not available")
    const { state, handleDeleteFromCart, handleAddToCart } = context

    const groups = state.cart.reduce((acc, obj) => {
      const key = obj.id
      const curGroup = acc[key] ?? []
      return { ...acc, [key]: [...curGroup, obj] }
    }, {} as { [productId: string]: Product[] })

    const subTotal = state.cart.reduce((acc, curr) => {
      return acc + curr.price
    }, 0)

    const keys = Object.entries(groups)
    const total = subTotal + 5
    // type OrderCheckout = OrderItem[]
    // const checkoutOrder: OrderCheckout = []
    // keys.forEach((key) => {
    //   const products = groups[key]
    //   const product = products[0]
    //   checkoutOrder.push({
    //     productId: key,
    //     quantity: products.length,
    //     flavor: product.flavor,
    //     wight: product.wight
    //   })
    // }) 

    return (
      <>
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="rounded-full  relative" size="icon" variant="ghost">
              <ShoppingCartIcon className="h-6 w-6" />
              <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
                {state.cart.length}
              </div>
              <span className="sr-only">Open cart</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Your Cart</DrawerTitle>
              <DrawerDescription>
                Review the items in your cart and proceed to checkout.
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid gap-4 py-4">
              {state.cart.length === 0 && <p> No items</p>}
              {Object.keys(groups).map((key) => {
                const products = groups[key]
                const product = products[0]
                const subTotal = products.reduce((acc, curr) => {
                  return acc + curr.price
                }, 0)
                return (
                  <div
                    className="grid grid-cols-[80px_1fr_auto] items-center gap-4"
                    key={product.id}
                  >
                    <img
                      alt="Product Image"
                      className="rounded-md object-cover"
                      src={product.image}
                      style={{
                        objectFit: "cover"
                      }}
                    />
                    <div className="space-y-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-gray-500 dark:text-gray-400">SR {product.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleDeleteFromCart(product.id)}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span>{products.length}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleAddToCart(product)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="destructive">
                        <TrashIcon
                          className="h-4 w-4"
                          onClick={() => handleDeleteFromCart(product.id)}
                        />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
            <DrawerFooter>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">SR{subTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">SR 5.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-medium">SR{total}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <DrawerClose>
                  <Button variant="outline">Continue Shopping</Button>
                </DrawerClose>
                <a href="/checkout">
                  <Button>
                    <Link to={`/checkout/${state.cart}`}>Proceed to Checkout</Link>
                  </Button>
                </a>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
}