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

  // const handleProductClick = (product: Product) => {
  //   // Navigate to the product details page and pass the product data as a parameter
  //   router.push({
  //     pathname: "/product_details",
  //     query: {
  //       id: product.id,
  //       name: product.name,
  //       image: product.image,
  //       price: product.price
  //     }
  //   })
  // }
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
        <img
          className="absolute inset-0 z-[-1] h-full w-full object-cover"
          height={1500}
          style={{
            aspectRatio: "1920/1080",
            objectFit: "cover"
          }}
          width={1920}
          src="placeholder.svg"
        />
        <div className="container grid lg:grid-cols-[1fr_500px] gap-12 items-center py-12 md:py-24 lg:py-32 ">
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
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
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
          <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto flex-wrap">
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
                                      className="w-full"
                                      onClick={() => handleAddToCart(product)}
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
                        <div className="space-y-2">
                          <img
                            className="absolute inset-0 z-[-1] h-full w-full object-cover"
                            height={1500}
                            style={{
                              aspectRatio: "1920/1080",
                              objectFit: "cover"
                            }}
                            width={1920}
                            src="placeholder.svg"
                          />
                        </div>
                        <Button size="lg">Learn More</Button>
                      </div>
                    </section>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">Vitamins</h2>
                      <Carousel className="mt-6">
                        <CarouselContent>
                          {vitaminsProducts.map((product) => (
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={product.id}>
                              <div className="p-1">
                                <Link to={`/products/${product.id}`}>
                                  <Card key={product.id} className="w-[350px]">
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
                                    <CardFooter>
                                      <Button
                                        className="w-full"
                                        onClick={() => handleAddToCart(product)}
                                      >
                                        Add to cart
                                      </Button>
                                    </CardFooter>
                                  </Card>
                                </Link>
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
                                <Link to={`/products/${product.id}`}>
                                  <Card key={product.id} className="w-[350px]">
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
                                    <CardFooter>
                                      <Button
                                        className="w-full"
                                        onClick={() => handleAddToCart(product)}
                                      >
                                        Add to cart
                                      </Button>
                                    </CardFooter>
                                  </Card>
                                </Link>
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
                                <Link to={`/products/${product.id}`}>
                                  <Card key={product.id} className="w-[350px]">
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
                                    <CardFooter>
                                      <Button
                                        className="w-full"
                                        onClick={() => handleAddToCart(product)}
                                      >
                                        Add to cart
                                      </Button>
                                    </CardFooter>
                                  </Card>
                                </Link>
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
                                <Link to={`/products/${product.id}`}>
                                  <Card key={product.id} className="w-[350px]">
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
                                    <CardFooter>
                                      <Button
                                        className="w-full"
                                        onClick={() => handleAddToCart(product)}
                                      >
                                        Add to cart
                                      </Button>
                                    </CardFooter>
                                  </Card>
                                </Link>
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
            <Button size="lg">Shop All</Button>
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
