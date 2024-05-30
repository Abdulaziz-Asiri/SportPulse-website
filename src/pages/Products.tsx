import { GlobalContext } from "@/App"
import api from "@/api"
import NavBar from "@/components/NavigationBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext, useState } from "react"
import Home from "./Home"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "@/components/ErrorPage"
import SearchBar from "@/components/SearchBar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { useToast } from "@/components/ui/use-toast"
import { Link } from "react-router-dom"
import { TextGenerateEffect2 } from "../components/ui/text-generate-effect"
import { ImagesSlider } from "@/components/ui/images-slider"
import { motion } from "framer-motion"

export function Products() {
  const { toast } = useToast()
  const context = useContext(GlobalContext)
  if (!context) throw Error("Context is not available")

  const { state, handleAddToCart } = context

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
  const { data, error, isPending } = useQuery<Product[]>({
    // useQuery-> It provides a declarative and efficient way to handle data fetching, caching, and synchronization with the UI components.
    queryKey: ["products"],
    queryFn: getProducts // Query funciton
  })

  if (isPending) return <LoadingPage />
  if (error) return <ErrorPage />
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
    (product) => product.categoryId === "a94743ed-e792-48a2-9390-c5841492923"
  )
  
  const word1 = `Fuel Your Body with SportPuls Premium Nutrition Supplements`

   const images = [
     "https://res.cloudinary.com/dp5hwcef0/image/upload/v1717012632/dymatize_vanilla_ciysci.webp",
     "https://res.cloudinary.com/dp5hwcef0/image/upload/v1717012306/optimum-nutrition-gold-standard-100-whey-2lb-29-servings-double-rich-chocolate-info-image-02_vfpcxt.jpg",
     "https://res.cloudinary.com/dp5hwcef0/image/upload/v1717012493/maxresdefault_fqpq7s.jpg"
   ]

  return (
    <>
      <NavBar />
      {/* <SearchBar /> */}

      <div className="flex flex-col items-center space-y-4 text-center  mt-24">
        <div className="container grid lg:grid-cols-[1fr_500px] gap-12 items-center py-12 md:py-24 lg:py-32">
          <div className="space-y-20 bg-gradient-to-r rounded-3xl py-16 px-16">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-black">
              <TextGenerateEffect2 words={word1} />
            </h1>
            <p className="text-black-200 md:text-xl pb-4">
              Elevate your health and performance with our high-quality protein powders, vitamins,
              and supplements.
            </p>
            <img
              alt="Hero Background"
              className="absolute inset-0 z-[-1] h-full w-full object-cover"
              height={1080}
              src=""
              style={{
                aspectRatio: "1920/1080",
                objectFit: "cover"
              }}
              width={1920}
            />

            <Link to="/products">
              <Button
                size="lg"
                className="rounded-full items-center w-50% bg-indigo-500 hover:bg-green-900 text-white font-medium"
              >
                Shop Now!!
              </Button>
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Products</h2>

          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Explore our premier selection of top-selling sports nutrition essentials.
          </p>
        </div>
      </div>
      <div className="">
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
    </>
  )
}
