import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { CardContent, Card, CardTitle, CardFooter } from "@/components/ui/card"
import { Product } from "@/types"
import videoH from "../assets/ProteinAd.mp4"
import api from "@/api"
import NavBar from "@/components/ui/NavigationBar"
import { useContext } from "react"
import { GlobalContext } from "@/App"

export default function Home() {
  const context  = useContext(GlobalContext)
  if(!context) throw Error("Context is not available")
    const {state , handleAddToCart} = context
  
  // Talk to backend through HTTP request using api using axios library
  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data 
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data, error } = useQuery<Product[]>({
    // useQuery-> It provides a declarative and efficient way to handle data fetching, caching, and synchronization with the UI components.
    queryKey: ["products"],
    queryFn: getProducts // Query funciton

  })
  return (
    <>
      <NavBar />
      <section className="w-full relative">
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
        <div className="container grid lg:grid-cols-[1fr_500px] gap-12 items-center py-12 md:py-24 lg:py-32 ">
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
          {error && <p className="text-red-500">{error.message}</p>}
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

function FacebookIcon(props) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon(props) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function TwitterIcon(props) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
   )
}
