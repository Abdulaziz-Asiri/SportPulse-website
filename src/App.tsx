import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { createContext, useEffect, useState } from "react"
import { AddProducts } from "./pages/AddProducts"
import { Dashboard } from "./pages/Dashboard"
import Home from "./pages/Home"
import { Login } from "./pages/LogIn"
import NotFoundPage from "./pages/NotFoundPage"
import { Products } from "./pages/Products"
import { SingUp } from "./pages/SingUp"
import { DecodedUser, Product, TypeInventory } from "./types"
import Testpage from "./pages/Testpage"
import { Toaster } from "./components/ui/toaster"
import UsersManagement from "./pages/UsersManagement"
import { PrivateRoute } from "./components/PrivateRoute"
import AddCategories from "./pages/AddCategories"
import InventoryManagment from "./pages/InventoryManagement"
import ProductDetails from "./pages/ProductDetails"
import Checkout from "./pages/CheckoutPage"
import ContactUs from "./pages/ContactUs"
import AboutUs from "./pages/AboutUs"
import React from "react"
import { WebChatContainer, setEnableDebug } from "@ibm-watson/assistant-web-chat-react"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  },
  {
    path: "/add_products",
    element: (
      <PrivateRoute>
        <AddProducts />
      </PrivateRoute>
    )
  },
  {
    path: "/contactUs",
    element: (
        <ContactUs />
    )
  },
  {
    path: "/aboutUs",
    element: (
        <AboutUs />
    )
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/singup",
    element: <SingUp />
  },
  {
    path: "/users_managment",
    element: (
      <PrivateRoute>
        <UsersManagement />
      </PrivateRoute>
    )
  },
  {
    path: "/add_categories",
    element: (
      <PrivateRoute>
        <AddCategories />
      </PrivateRoute>
    )
  },
  {
    path: "/inventory_managment",
    element: (
      <PrivateRoute>
        <InventoryManagment />
      </PrivateRoute>
    )
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />
  },
  {
    path: "/checkout",
    element: <Checkout />
  }
])

type GlobalContextType = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
  handleStoreUser: (user: DecodedUser) => void
  handleRemoveUser: () => void
}
type GlobalState = {
  cart: Product[]
  user: DecodedUser | null
}
export const GlobalContext = createContext<GlobalContextType | null>(null)


function App() {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    user: null
  })
  console.log('cart product:', state)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const decodedUser = JSON.parse(user)
      setState({
        ...state,
        user: decodedUser
      })
    }
  }, [])

  const handleAddToCart = (product: Product) => {
    // const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)
    // if (isDuplicated) return
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  const handleDeleteFromCart = (id: string) => {
    // const DeleteItem = state.cart.filter((item) => item.id !== id)
    const cart =state.cart 

    const index = state.cart.findIndex((item) => item.id === id)
    cart.splice(index, 1)
    
    setState({
      ...state,
      cart: cart
    })
  }
  const handleRemoveUser = () => {
    setState({
      ...state,
      user: null
    })
  }
  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user
    })
  }

  return (
    <>
      <div className="App">
        <GlobalContext.Provider
          value={{
            state,
            handleAddToCart,
            handleDeleteFromCart,
            handleStoreUser,
            handleRemoveUser
          }}
        >
          
          <RouterProvider router={router} />
          <Toaster />
          
        </GlobalContext.Provider>
      </div>
    </>
  )
}

export default App
