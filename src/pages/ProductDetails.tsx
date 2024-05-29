import { GlobalContext } from "@/App"
import api from "@/api"
import NavBar from "@/components/NavigationBar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { StarIcon } from "lucide-react"
import { useContext } from "react"
import { useParams } from "react-router-dom"


export default function ProductDetails({ productDetiles }: { productDetiles: Product }) {
 const params = useParams()
 const context = useContext(GlobalContext)
 if (!context) throw Error("Context is not available")

 const { state, handleAddToCart } = context
 const getProduct = async () => {
   try {
     const res = await api.get(`/products/${params.productId}`)
     return res.data
   } catch (error) {
     console.error(error)
     return Promise.reject(new Error("Something went wrong"))
   }
 }
 // Queries
 const { data: product, error } = useQuery<Product>({
   queryKey: ["product"],
   queryFn: getProduct
 })
 if (!product) {
   return <p>Product not found</p>
 }
 console.log("product details ", product)
  return (
    <>
      <NavBar />
      <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto py-48 px-4 md:px-0">
        <div className="grid gap-6">
          <img
            alt="image"
            className="aspect-square object-contain rounded-t-lg"
            src={product.image}
          />
        </div>
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-yellow-500" />
                <StarIcon className="w-5 h-5 fill-yellow-500" />
                <StarIcon className="w-5 h-5 fill-yellow-500" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
              <span className="text-gray-500 text-sm">4.3 (125 reviews)</span>
            </div>
            <p className="text-gray-500 mt-2">{product.categoryId}</p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">SR {product.price}</span>
              <Button
                size="lg"
                className="bg-indigo-500 hover:bg-green-600 text-white font-medium"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
            <Separator />
            <div className="grid gap-2">
              <h2 className="text-xl font-semibold">Product Details</h2>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    Description:{" "}
                  </span>
                  {product.description}
                </li>
                <li>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Weight: </span>3
                  lbs
                </li>
              </ul>
            </div>
            <Separator className="mt-9" />

            <div className="grid gap-4 mt-8">
              <h2 className="text-xl font-semibold">Reviews</h2>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">John Doe</div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-4 h-4 fill-yellow-500" />
                        <StarIcon className="w-4 h-4 fill-yellow-500" />
                        <StarIcon className="w-4 h-4 fill-yellow-500" />
                        <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                      </div>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      This backpack is amazing! It's durable, stylish, and perfect for everyday use.
                      Highly recommend!
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Sarah Anderson</div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-4 h-4 fill-yellow-500" />
                        <StarIcon className="w-4 h-4 fill-yellow-500" />
                        <StarIcon className="w-4 h-4 fill-yellow-500" />
                        <StarIcon className="w-4 h-4 fill-yellow-500" />
                        <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                      </div>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      I've been using this backpack for a few months now and it's held up incredibly
                      well. The quality is top-notch.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Michael Johnson</div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-4 h-4 fill-yellow-500" />
                        <StarIcon className="w-4 h-4 fill-yellow-500" />
                        <StarIcon className="w-4 h-4 fill-yellow-500" />
                        <StarIcon className="w-4 h-4 fill-yellow-500" />
                        <StarIcon className="w-4 h-4 fill-yellow-500" />
                      </div>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      This is the best backpack I've ever owned. The craftsmanship is impeccable,
                      and it's so comfortable to wear.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto py-48 px-4 md:px-0">
        <div className="grid gap-6">
          <img
            alt="Leather Backpack"
            className="aspect-square object-contain rounded-t-lg"
            // height={800}
            src={product.image}
            // width={800}
          />
        </div>
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">SR{product.price}</span>
              <Button size="lg">Add to Cart</Button>
            </div>
            <Separator />
            <div className="grid gap-4">
              <h2 className="text-xl font-semibold">Product Details</h2>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <span className="font-medium text-gray-900 dark:text-gray-100">description:</span>
                  <p className="text-black-700 mt-2">{product.description}</p>
                </li>
                <li>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Category:</span>
                  Vitmines
                </li>
                <li>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Dimensions:</span>
                  15" x 12" x 5"
                </li>
                <li>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Weight:</span>3 lbs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}
