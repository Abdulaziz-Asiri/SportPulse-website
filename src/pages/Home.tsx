import api from "@/api"
import NavBar from "@/components/NavigationBar"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button"
import { CardContent, Card, CardTitle, CardFooter } from "@/components/ui/card"
import { Product } from "@/types"
import { useContext } from "react"
import { GlobalContext } from "@/App"
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Link } from "react-router-dom"
import ErrorPage from "@/components/ErrorPage"
import LoadingPage from "@/components/LoadingPage"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
"use client"
import { TextGenerateEffect, TextGenerateEffect2 } from "../components/ui/text-generate-effect"
import { ImagesSlider } from "@/components/ui/images-slider"
import { motion } from "framer-motion"



export default function Home() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is not available")

  const { state, handleAddToCart } = context

  const queryClient = useQueryClient()
  const { toast } = useToast()

  const getProducts = async () => {
    // This function is defined as an asynchronous function that fetches the list of products from the API using the api.get method.
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

  if (isPending) {
    return (
      <div>
        <LoadingPage />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <ErrorPage />
      </div>
    )
  }

  const word1 = `Fuel Your Body with SportPuls Premium Nutrition Supplements`

  const supplementsProducts = data?.filter(
    (product) => product.categoryId === "c0e4b879-fca2-464e-a1cc-da704dd1cf87"
  )
  const vitaminsProducts = data?.filter(
    (product) => product.categoryId === "3ca82abe-df4f-4c8e-b276-577ec68b0c53"
  )
  const snacksProducts = data?.filter(
    (product) => product.categoryId === "dab23e55-2ba5-4450-9d45-183f5023e2d5"
  )
  const sportswearProducts = data?.filter(
    (product) => product.categoryId === "291a3106-563b-4aff-891f-fa882aa0a674"
  )
  const accessoriesProducts = data?.filter(
    (product) => product.categoryId === "a94743ed-e792-48a2-9390-c5841492923f"
  )

  const images = [
    "https://res.cloudinary.com/dp5hwcef0/image/upload/v1717440135/pexels-victorfreitas-841130_nvap2z.jpg",
    "https://res.cloudinary.com/dp5hwcef0/image/upload/v1717012632/dymatize_vanilla_ciysci.webp",
    "https://res.cloudinary.com/dp5hwcef0/image/upload/v1717012306/optimum-nutrition-gold-standard-100-whey-2lb-29-servings-double-rich-chocolate-info-image-02_vfpcxt.jpg",
    "https://res.cloudinary.com/dp5hwcef0/image/upload/v1717012493/maxresdefault_fqpq7s.jpg"
  ]

  return (
    <>
      <NavBar />
      <section className="w-full relative pt-38">
        <ImagesSlider className="h-[40rem]" images={images}>
          <motion.div
            initial={{
              opacity: 0,
              y: -80
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}
            className="z-50 flex flex-col justify-center items-center"
          >
            <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
              <TextGenerateEffect words={word1} />
              <p className="text-black-200 md:text-xl pt-8">
                Elevate your health and performance with our high-quality protein powders, vitamins,
                and supplements.
              </p>
            </motion.p>
            <Link to="/products">
              <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/60 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
                <span> Go Shopping !!</span>
                <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
              </button>
            </Link>
          </motion.div>
        </ImagesSlider>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 sm:grid-cols-1">
        <div className="container">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Products
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Explore our premier selection of top-selling sports nutrition essentials.
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="container mx-auto py-12 px-4 md:px-14">
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Supplements</h2>
                  <Carousel className="mt-6">
                    <CarouselContent>
                      {supplementsProducts.map((product) => (
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={product.id}>
                          <div className="p-1">
                            <Card key={product.id} className="w-[350px]">
                              <Link to={`/products/${product.id}`}>
                                <CardContent className="p-4">
                                  <img
                                    src={product.image}
                                    alt="Product Image"
                                    className="aspect-square object-contain rounded-t-lg"
                                  />
                                  <CardTitle>{product.name}</CardTitle>
                                  <p className="text-gray-500 dark:text-gray-400">
                                    SR {product.price}
                                  </p>
                                </CardContent>
                              </Link>
                              <CardFooter>
                                <Button
                                  className="w-full bg-indigo-500 hover:bg-green-600 text-white font-medium"
                                  onClick={() => {
                                    handleAddToCart(product)
                                    toast({
                                      variant: "success",
                                      title: "Product Has Been Add to cart Successfully.✅"
                                    })
                                  }}
                                >
                                  Add to cart
                                </Button>
                              </CardFooter>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Vitamins</h2>
                  <Carousel className="mt-6">
                    <CarouselContent>
                      {vitaminsProducts.map((product) => (
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={product.id}>
                          <div className="p-1">
                            <Card key={product.id} className="w-[350px]">
                              <Link to={`/products/${product.id}`}>
                                <CardContent className="p-4">
                                  <img
                                    src={product.image}
                                    alt="Product Image"
                                    className="aspect-square object-contain rounded-t-lg"
                                  />
                                  <CardTitle>{product.name}</CardTitle>
                                  <p className="text-gray-500 dark:text-gray-400">
                                    SR {product.price}
                                  </p>
                                </CardContent>
                              </Link>
                              <CardFooter>
                                <Button
                                  className="w-full bg-indigo-500 hover:bg-green-900 text-white font-medium"
                                  onClick={() => {
                                    handleAddToCart(product)
                                    toast({
                                      variant: "success",

                                      title: "Product Has Been Add to cart Successfully.✅"
                                    })
                                  }}
                                >
                                  Add to cart
                                </Button>
                              </CardFooter>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Snacks</h2>
                  <Carousel className="mt-6">
                    <CarouselContent>
                      {snacksProducts.map((product) => (
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={product.id}>
                          <div className="p-1">
                            <Card key={product.id} className="w-[350px]">
                              <Link to={`/products/${product.id}`}>
                                <CardContent className="p-4">
                                  <img
                                    src={product.image}
                                    alt="Product Image"
                                    className="aspect-square object-contain rounded-t-lg"
                                  />
                                  <CardTitle>{product.name}</CardTitle>
                                  <p className="text-gray-500 dark:text-gray-400">
                                    SR {product.price}
                                  </p>
                                </CardContent>
                              </Link>
                              <CardFooter>
                                <Button
                                  className="w-full bg-indigo-500 hover:bg-green-600 text-white font-medium"
                                  onClick={() => {
                                    handleAddToCart(product)
                                    toast({
                                      variant: "success",

                                      title: "Product Has Been Add to cart Successfully.✅"
                                    })
                                  }}
                                >
                                  Add to cart
                                </Button>
                              </CardFooter>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Sportswear</h2>
                  <Carousel className="mt-6">
                    <CarouselContent>
                      {sportswearProducts.map((product) => (
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={product.id}>
                          <div className="p-1">
                            <Card key={product.id} className="w-[350px]">
                              <Link to={`/products/${product.id}`}>
                                <CardContent className="p-4">
                                  <img
                                    src={product.image}
                                    alt="Product Image"
                                    className="aspect-square object-contain rounded-t-lg"
                                  />
                                  <CardTitle>{product.name}</CardTitle>
                                  <p className="text-gray-500 dark:text-gray-400">
                                    SR {product.price}
                                  </p>
                                </CardContent>
                              </Link>
                              <CardFooter>
                                <Button
                                  className="w-full bg-indigo-500 hover:bg-green-600 text-white font-medium"
                                  onClick={() => {
                                    handleAddToCart(product)
                                    toast({
                                      variant: "success",

                                      title: "Product Has Been Add to cart Successfully.✅"
                                    })
                                  }}
                                >
                                  Add to cart
                                </Button>
                              </CardFooter>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Accessories & Equipment</h2>
                  <Carousel className="mt-6">
                    <CarouselContent>
                      {accessoriesProducts.map((product) => (
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={product.id}>
                          <div className="p-1">
                            <Card key={product.id} className="w-[350px]">
                              <Link to={`/products/${product.id}`}>
                                <CardContent className="p-4">
                                  <img
                                    src={product.image}
                                    alt="Product Image"
                                    className="aspect-square object-contain rounded-t-lg"
                                  />
                                  <CardTitle>{product.name}</CardTitle>
                                  <p className="text-gray-500 dark:text-gray-400">
                                    SR {product.price}
                                  </p>
                                </CardContent>
                              </Link>
                              <CardFooter>
                                <Button
                                  className="w-full bg-indigo-500 hover:bg-green-600 text-white font-medium"
                                  onClick={() => {
                                    handleAddToCart(product)
                                    toast({
                                      variant: "success",

                                      title: "Product Has Been Add to cart Successfully.✅"
                                    })
                                  }}
                                >
                                  Add to cart
                                </Button>
                              </CardFooter>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
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
          <Link to="/products">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-medium">
              Shop All
            </Button>
          </Link>
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
