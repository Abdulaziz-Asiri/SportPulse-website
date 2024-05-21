export type Product = {
  id: string
  name: string
  categoryId: string
  price: number
  image: string
  description: string
}
export type Category = {
   
    id: string
    type: string
  
}

export type  User = {

  name: string
  role: string
  password: string
  email: string
  phone: string
}
