import api from "@/api"
import NavBar from "@/components/NavigationBar"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { CardContent, Card, CardTitle, CardFooter } from "@/components/ui/card"
import { Product } from "@/types"
import videoH from "../assets/ProteinAd2.mp4"
import { useContext } from "react"
import { GlobalContext } from "@/App"
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is not available")

  const { state, handleAddToCart } = context

  const queryClient = useQueryClient()
  const { toast } = useToast()

  
  const getProducts = async () => { // This function is defined as an asynchronous function that fetches the list of products from the API using the api.get method.
    try {
      const res = await api.get("/products") // Talk to backend through HTTP request using api using axios library
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data, error, isPending } = useQuery<Product[]>({
    //useQuery Hook is used to fetch the list of products using the getProducts function as the queryFn (query function). useQuery-> It provides a declarative and efficient way to handle data fetching, caching, and synchronization with the UI components.
    queryKey: ["products"], //The queryKey is set to ["products"], which is a unique identifier for this query.
    queryFn: getProducts // Query function
  })

  if (isPending) return "Loading..."
  if (error) return "An error has occurred: " + error.message

  return (
    <>
      <NavBar />

      <section className="w-full relative">
        <div className="container grid lg:grid-cols-[1fr_500px] gap-12 items-center py-12 md:py-24 lg:py-32 ">
        <video
          className="absolute inset-0 z-[-1] h-full w-full object-cover"
          height={1500}
          style={{
            aspectRatio: "1920/1080",
            objectFit: "cover"
          }}
          width={1920}
          src={videoH}
          autoPlay
          loop
          muted
        />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Fuel Your Body with Premium Nutrition Supplements
            </h1>
            <p className="decoration-white md:text-xl dark:text-white-400">
              Elevate your health and performance with our high-quality protein powders, vitamins,
              and supplements.
            </p>
            <Button size="lg">Shop Now!!</Button>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Products
              </h2>
              <h3> Cart ({state.cart.length}) </h3>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Discover our top-selling sustainable fashion items.
              </p>
            </div>
          </div>
          <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto flex-wrap">
            {data?.map((product) => (
              <Card key={product.id} className="w-[350px]">
                <img
                  src={product.image}
                  alt="Product Image"
                  // aspect-square object-fit rounded-t-lg
                  className="aspect-square object-contain rounded-t-lg"
                  // height="200"
                  // width="200"
                />
                <CardContent className="p-4">
                  <CardTitle>{product.name}</CardTitle>
                  <p className="text-gray-500 dark:text-gray-400">SR {product.price}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleAddToCart(product)}>
                    Add to cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </section>
          {/* {error && <p className="text-red-500">{error.message}</p>} */}
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Explore Our Full Nutrition Supplements Line
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Browse our entire selection of high-quality protein powders, vitamins, and
              supplements.
            </p>
          </div>
          <Button size="lg">Shop All</Button>
        </div>
      </section>
      <footer className="flex flex-col gap-4 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Acme Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6 items-center">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
          <div className="flex gap-4">
            <a aria-label="Facebook" href="#">
              <FacebookIcon className="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
            </a>
            <a aria-label="Twitter" href="#">
              <TwitterIcon className="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
            </a>
            <a aria-label="Instagram" href="#">
              <InstagramIcon className="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
            </a>
          </div>
        </nav>
      </footer>
    </>
  )
}
