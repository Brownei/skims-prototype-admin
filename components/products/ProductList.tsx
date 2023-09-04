"use client"
import { Label } from "@/components/ui/label"
import { ProductColumn } from "./columns"
import Error from "../Error"
import moment from "moment"
import { DataTableLoader } from "../DataTableLoader"
import { useProducts } from "@/hooks/use-products"
import { Product } from "@prisma/client"
import { DataTable } from "./data-table"
import { useCollections } from "@/hooks/use-collections"
import { useStyles } from "@/hooks/use-styles"
import { useColors } from "@/hooks/use-colors"
import { useState, useEffect } from "react"


const ProductList = () => {
  const {data: products, isError, isLoading} = useProducts()
  const [langitude, setLangitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const {data: collections} = useCollections()
  const {data:styles } = useStyles()
  const {data: colors} = useColors()
  // const location = 
  // const timeZone = Intl.supportedValuesOf("currency").filter((i) => i === 'NGN')
  useEffect(() => {
    if(navigator.geolocation) {
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          setLangitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
        })
      } catch (error) {
        console.log(error) 
      }
    }
  }, [])
  
  // console.log(products)
  console.log(langitude, longitude)

  if(isError) {
    return <Error />
  }

  if(isLoading) {
    return <DataTableLoader columnCount={8} />
  }

  const productDataItem: ProductColumn[] = products.map((product: Product) => ({
    id: product.id,
    adminId: product.adminId,
    category: product.categoryId,
    subCategory: product.subCategoryId,
    name: product.name,
    price: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(product.price),
    isFeatured: product.isFeatured ? 'Yes' : 'No',
    isSoldOut: product.isSoldOut ? 'Yes' : 'No',
    color: colors?.filter((i) => i.id === product.colorId).map(i => i.value),
    style: styles?.filter((i) => i.id === product.styleId).map(i => i.name),
    collection: collections?.filter((i) => i.id === product.collectionId).map(i => i.name),
    createdAt: moment(product.createdAt).format('MMMM DD, YYYY'),
    updatedAt: moment(product.updatedAt).format('MMMM DD, YYYY')
  }))

  return (
    <div>
      {/* List of Collections  */}
      <div className="mt-10">
        <Label className="text-lg font-ProExtraBold">List of Collections</Label>
        <DataTable productDataItem={productDataItem}/>
      </div>
    </div>
  )
}

export default ProductList;