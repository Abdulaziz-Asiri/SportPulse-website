import api from "@/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useToast } from "./ui/use-toast"
import { ChangeEvent, useState } from "react"
import { Category, Product } from "@/types"

export default function UpdateProductDailog({ product }: { product: Product }) {

  const queryClient = useQueryClient()
  const { toast } = useToast()

  const [updatedProduct, setUpdatedProduct] = useState(product)
  console.log("updatedProduct:", updatedProduct)

  const updateProduct = async () => {
    try {
      const res = await api.patch(`/products/${updatedProduct.id}`, updatedProduct)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleUpdatedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setUpdatedProduct({
      ...updatedProduct,
      name: value
    })
  }

  const handleUpdate = async () => {
    await updateProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  const getCategories = async () => {
    try {
      const res = await api.get("/categorys")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: getData, error: getError } = useQuery<Category[]>({
    queryKey: ["categorys"],
    queryFn: getCategories
  })
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update the details for this product.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Name
            </Label>
            <Input
              className="col-span-3"
              defaultValue={updatedProduct.name}
              name="name"
              onChange={handleUpdatedChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="category">
              Category
            </Label>
            <Select name="category" className="col-span-3" defaultValue={updatedProduct.categoryId}>
              <SelectTrigger>
                <SelectValue placeholder={product.categoryId} />
              </SelectTrigger>
              <SelectContent onChange={handleUpdatedChange}>
                {getData?.map((getCategories) => {
                  return (
                    <SelectItem key={getCategories.id} value={getCategories.id}>
                      {getCategories.type}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="price">
              Price
            </Label>
            <Input
              className="col-span-3"
              defaultValue={updatedProduct.price}
              name="price"
              type="number"
              onChange={handleUpdatedChange}
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right" htmlFor="image">
              Image
            </Label>
            <div className="col-span-3 grid gap-2">
              <img
                alt="Product Image"
                className="rounded-lg object-cover"
                height={200}
                src={updatedProduct.image}
                style={{
                  aspectRatio: "300/300",
                  objectFit: "contain"
                }}
                width={300}
              />
              <Button size="sm" variant="outline">
                Upload Image
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right" htmlFor="description">
              Description
            </Label>
            <Textarea
              name="description"
              className="col-span-3 min-h-[120px]"
              defaultValue={updatedProduct.description}
              onChange={handleUpdatedChange}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleUpdate}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
