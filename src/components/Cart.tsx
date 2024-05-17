import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { useContext } from "react";
import { GlobalContext } from "@/App";

export function Cart() {
    const context = useContext(GlobalContext)
    if (!context) throw Error("Context is not available")
    const { state, handleDeleteFromCart } = context

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="rounded-full" size="icon" variant="ghost">
            <ShoppingCartIcon className="h-6 w-6" />
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
            {state.cart.map((product) => {
              return (
                <div className="grid grid-cols-[80px_1fr_auto] items-center gap-4" key={product.id}>
                  <img
                    alt="Product Image"
                    className="rounded-md object-cover"
                    height={80}
                    src={product.image}
                    style={{
                      aspectRatio: "80/80",
                      objectFit: "cover"
                    }}
                    width={80}
                  />
                  <div className="space-y-1">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-gray-500 dark:text-gray-400">SR {product.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline">
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span>1</span>
                    <Button size="icon" variant="outline">
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive">
                      <TrashIcon className="h-4 w-4" onClick={() => handleDeleteFromCart(product.id)} />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
          <DrawerFooter >
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">SR 9.98</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">SR 5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-medium">SR 84.98</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <a href ="/">
                {" "}
                <Button variant="outline" >Continue Shopping</Button>
              </a>{" "}
              
              <Button>Proceed to Checkout</Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
}

