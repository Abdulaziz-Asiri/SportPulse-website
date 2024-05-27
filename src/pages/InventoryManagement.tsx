import api from "@/api"
import { NavBarForAdmin } from "@/components/NavBarForAdmin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Inventory, Product } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
export default function InventoryManagment() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [inventory, setInventory] = useState({
    productId: "",
    quantity: 0,
    flavor: "",
    wight: ""
  })

  const getInventories = async () => {
    try {
      const res = await api.get("/inventorys")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const {
    data: getInventoryData,
    error: ee,
    isPending: pp
  } = useQuery<Inventory[]>({
    queryKey: ["inventorys"],
    queryFn: getInventories
  })

  const getProducts = async () => {
    try {
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const {
    data: getProductData,
    error,
    isPending
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts
  })

  const postInventoty = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.post("/inventorys", inventory, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("There is require input"))
    }
  }

  const deleteInventorys = async (id: string) => {
    const token = localStorage.getItem("token")
    try {
      const res = await api.delete(`/inventorys/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Send token with request to check permissions
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong !! User you want to delete not found"))
    }
  }
  const handleDeleteInventorys = async (id: string) => {
    await deleteInventorys(id)
    queryClient.invalidateQueries({ queryKey: ["inventorys"] })
  }

  const handleChangeInventory = (e) => {
    const { name, value } = e.target
    setInventory({
      ...inventory,
      [name]: value
    })
    console.log('inventory:', inventory)
  }

   const handleProduct = (value: string) => {
     setInventory({
       ...inventory,
       productId: value
     })
   }

   const handleSubmit = async (e) => {
     e.preventDefault()
     await postInventoty()
     queryClient.invalidateQueries({ queryKey: ["inventorys"] })
   }

    const productWithInventories = getInventoryData?.map((inventory) => {
      const product = getProductData?.find((c) => c.id === inventory.productId)
      if (product)
        return {
          ...inventory,
          productId: product.name
        }
      return inventory
    })
  return (
    <>
      <NavBarForAdmin />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Product to Inventory</h2>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
            <div>
              <Label className="block font-medium mb-2" htmlFor="productId">
                Product ID
              </Label>
              <Select onValueChange={handleProduct} name="productId">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  {isPending && <p>Loading...</p>}
                  {getProductData?.map((product) => {
                    return (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block font-medium mb-2" htmlFor="quantity">
                Quantity
              </Label>
              <Input
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="quantity"
                placeholder="Enter quantity"
                type="number"
                onChange={handleChangeInventory}
              />
            </div>
            <div>
              <Label className="block font-medium mb-2" htmlFor="flavor">
                Flavor
              </Label>
              <Input
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="flavor"
                placeholder="Enter flavor"
                type="text"
                onChange={handleChangeInventory}
              />
            </div>
            <div>
              <Label className="block font-medium mb-2" htmlFor="wight">
                Weight
              </Label>
              <Input
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="wight"
                placeholder="Enter weight"
                type="text"
                onChange={handleChangeInventory}
              />
            </div>
            <div className="col-span-1 md:col-span-3 flex justify-end">
              <Button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md"
                type="submit"
              >
                Add Product
              </Button>
            </div>
          </form>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Existing Inventory</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Product ID</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Flavor</th>
                  <th className="px-4 py-2 text-left">Weight</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productWithInventories?.map((inventory) => {
                  return (
                    <tr className="border-b" key={inventory.id}>
                      <td className="px-4 py-2">{inventory.productId}</td>
                      <td className="px-4 py-2">{inventory.quantity}</td>
                      <td className="px-4 py-2">{inventory.flavor}</td>
                      <td className="px-4 py-2">{inventory.wight}</td>
                      <td className="px-4 py-2 text-right">
                        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-1 px-2 rounded-md mr-2">
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            handleDeleteInventorys(inventory.id)
                            toast({
                              variant: "destructive",
                              title: "Inventory Has Been Deleted Successfully."
                            })
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-md"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
