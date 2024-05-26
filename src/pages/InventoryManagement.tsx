import api from "@/api"
import { NavBarForAdmin } from "@/components/NavBarForAdmin"
import { SelectItem } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Inventory, Product } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
export default function InventoryManagment() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const [updatedProduct, setUpdatedProduct] = useState()

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

  return (
    <>
      <NavBarForAdmin />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-2" htmlFor="productId">
                Product ID
              </label>
              <input
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                id="productId"
                name="productId"
                placeholder="Enter product ID"
                type="text"
              />
            </div>
            <div>
              <label className="block font-medium mb-2" htmlFor="quantity">
                Quantity
              </label>
              <input
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                id="quantity"
                name="quantity"
                placeholder="Enter quantity"
                type="number"
              />
            </div>
            <div>
              <label className="block font-medium mb-2" htmlFor="flavor">
                Flavor
              </label>
              <input
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                id="flavor"
                name="flavor"
                placeholder="Enter flavor"
                type="text"
              />
            </div>
            <div>
              <label className="block font-medium mb-2" htmlFor="weight">
                Weight
              </label>
              <input
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                id="weight"
                name="weight"
                placeholder="Enter weight"
                type="text"
              />
            </div>
            <div className="col-span-1 md:col-span-3 flex justify-end">
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md"
                type="submit"
              >
                Add Product
              </button>
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
                {getInventoryData?.map((inventory) => {
                  return (
                    <tr className="border-b" key={inventory.id}>
                      {/* {getProductData?.map((product) => {
                        return (
                          <td className="px-4 py-2" key={product.id} value={inventory.id}>
                            {product.name}
                          </td>
                        )
                      })} */}
                      <td className="px-4 py-2">{inventory.productId}</td>
                      <td className="px-4 py-2">{inventory.quantity}</td>
                      <td className="px-4 py-2">{inventory.flavor}</td>
                      <td className="px-4 py-2">{inventory.wight}</td>
                      <td className="px-4 py-2 text-right">
                        <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-1 px-2 rounded-md mr-2">
                          Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-md">
                          Delete
                        </button>
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
