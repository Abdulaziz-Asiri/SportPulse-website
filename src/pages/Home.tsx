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
  return (
    <>
      <NavBar />
      <section className="w-full relative pt-40">
        <div className="container grid lg:grid-cols-[1fr_500px] gap-12 items-center py-12 md:py-24 lg:py-32">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              Fuel Your Body with SportPuls Premium Nutrition Supplements
            </h1>
            <p className="text-gray-200 md:text-xl pb-4">
              Elevate your health and performance with our high-quality protein powders, vitamins,
              and supplements.
            </p>
            <Link to="/products">
              <Button size="lg">Shop Now!!</Button>
            </Link>
            <img
              alt="Hero image"
              className="absolute inset-0 z-[-1] h-full w-full object-cover"
              src="data:image/jpeg;base64,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"
              height="550"
              width="550"
            />
          </div>
        </div>
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
                <section className="w-full py-12 md:py-24 lg:py-32">
                  <div className="container flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2"></div>
                    <Button
                      size="lg"
                      className="bg-green-500 hover:bg-green-600 text-white font-medium"
                    >
                      Learn More
                    </Button>
                  </div>
                </section>
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
