import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { createContext, useEffect, useState } from "react"
import { AddProducts } from "./pages/AddProducts"
import { Dashboard } from "./pages/Dashboard"
import Home from "./pages/Home"
import { Login } from "./pages/LogIn"
import NotFoundPage from "./pages/NotFoundPage"
import { Products } from "./pages/Products"
import { SingUp } from "./pages/SingUp"
import { DecodedUser, Product } from "./types"
import Testpage from "./pages/Testpage"
import { Toaster } from "./components/ui/toaster"
import UsersManagement from "./pages/UsersManagement"
import { PrivateRoute } from "./components/PrivateRoute"
import AddCategories from "./pages/AddCategories"

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
    path: "/addproducts",
    element: (
      <PrivateRoute>
        <AddProducts />
      </PrivateRoute>
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
    path: "/testpage",
    element: <Testpage />
  },
  {
    path: "/usersmanagment",
    element: (
      <PrivateRoute>
        <UsersManagement />
      </PrivateRoute>
    )
  },
  {
    path: "/addcategories",
    element: (
      <PrivateRoute>
        <AddCategories />
      </PrivateRoute>
    )
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
    const isDuplicated = state.cart.find((cartItem) => cartItem.id === product.id)
    if (isDuplicated) return
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  const handleDeleteFromCart = (id: string) => {
    const DeleteItem = state.cart.filter((item) => item.id !== id)
    setState({
      ...state,
      cart: DeleteItem
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
