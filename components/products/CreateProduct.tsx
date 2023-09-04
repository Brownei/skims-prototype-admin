"use client"

import { Admin, Category, Collection, Color, Image as Images, Product, Size, Style, SubCategory } from '@prisma/client';
import { Button } from "@/components/ui/button"
import { Label } from '../ui/label';
import { Input } from "../ui/input"
import { MoonLoader } from "react-spinners"
import { SyntheticEvent, useState } from "react"
import ImageUpload from "@/components/upload"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { toast } from '../ui/use-toast';
import { useLoadingStore } from '@/hooks/useStore';
import { getErrorMessage } from '@/lib/error-handler';
import axios from 'axios';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from '../ui/select';
import { nanoid } from 'nanoid';
import { ArrowLeftIcon, TrashIcon } from '@radix-ui/react-icons';
import { Textarea } from '../ui/textarea';

type CreateProductsProps = {
    currentUser: Admin | null
    initialValue?: Product & {
        images: Images[]
    } | null;
    colors?: Color[];
    collections?: Collection[];
    styles?: Style[];
    sizes?: Size[];
    categories?: Category[];
    subCategories?: SubCategory[];
}

type Image ={
    url: string
    id: string
}

const CreateProducts: React.FC<CreateProductsProps> = ({ initialValue, currentUser, collections, colors, sizes, styles, subCategories, categories } ) => {
    const router = useRouter()
    const params = useParams()
    const { Loading, onLoading, notLoading } = useLoadingStore()
    const [name, setName] = useState(initialValue ? initialValue?.name : '')
    const [price, setPrice] = useState(initialValue ? initialValue?.price : 0)
    const [details, setDetails] = useState(initialValue ? initialValue.details : '')
    const [quantity, setQuantity] = useState(initialValue ? initialValue.quantity : 0)
    const [style, setStyle] = useState(initialValue ? initialValue?.styleId : '')
    const [category, setCategory] = useState(initialValue ? initialValue?.categoryId : '')
    const [subCategory, setSubCategory] = useState(initialValue ? initialValue?.subCategoryId : '')
    const [collection, setCollection] = useState(initialValue ? initialValue?.collectionId : '')
    const [color, setColor] = useState(initialValue ? initialValue?.colorId : '')
    const [image, setImage] = useState<Image[]>(initialValue ? initialValue?.images.map((i) => (i)) : [])
    const [size, setSize] = useState(initialValue ? initialValue?.sizeId.map((i) => (i)) : [])
    const [isFeatured, setIsFeatured] = useState(initialValue ? initialValue?.isFeatured : false)
    const [isSoldOut, setIsSoldOut] = useState(initialValue ? initialValue?.isSoldOut : false)
    const [isSelected, setIsSelected] =useState<string[]>([])
    const titleLabel = initialValue ? 'Update this product' : 'Create a new product'
    const ButtonTitle = initialValue ? 'Update product' : 'Create product'
    const LoadingTitle = initialValue ? 'Updating...' : 'Creating...'

    async function onSubmit(e: SyntheticEvent) {
        e.preventDefault()
        onLoading()
        try {
            if(initialValue) {
                await axios.patch(`/api/products/${params.productName}`, {
                    name: name as string,
                    price: price as number,
                    details: details as string,
                    categoryId: category as string,
                    subCategoryId: subCategory as string,
                    quantity: quantity as number,
                    isFeatured: isFeatured as boolean,
                    isSoldOut: isSoldOut as boolean,
                    adminId: currentUser?.id as string,
                    sizeId: size.map((i) => (i)),
                    colorId: color as string,
                    styleId: style as string,
                    collectionId: collection as string,
                    images: image.map((i) => (i))
                })
            } else {
                await axios.post('/api/products', {
                    name: name as string,
                    details: details as string,
                    categoryId: category as string,
                    subCategoryId: subCategory as string,
                    sizeId: size.map((i) => (i)),
                    styleId: style as string,
                    colorId: color as string,
                    images: image.map((i) => (i.url)),
                    collectionId: collection as string,
                    price: price as number,
                    isFeatured: isFeatured as boolean,
                    quantity: quantity as number,
                    isSoldOut: isSoldOut as boolean,
                    adminId: currentUser?.id as string,
                })
            }
            toast({
                title: initialValue ? 'Product updated!' : 'Product created!'
            })
            window.location.assign('/dashboard/products')
        } catch (error) {
            console.log(error)
            toast({
                title: getErrorMessage(error)
            })
        } finally {
            notLoading()
        }
    }

    function onSizeSelect(_id: string) {
        if(isSelected.includes(_id)) {
            setIsSelected(isSelected.filter(i => i !== _id));
            setSize(size.filter(i => i !== _id))
        } else {
            setIsSelected([...isSelected, _id])
            setSize([...size, _id])
        }
    }
    // console.log("category:", category, "sub-category:", subCategory, "collections:", collection, "color:", color, "style:", style, "size:", size, "quantity:", quantity, "price:", price, "details:", details )

  return (
    <section>
        <div className='grid gap-5'>
            <Button 
            variant='outline'
            onClick={() => router.back()}
            className='text-sm flex gap-1 font-ProMedium w-fit'>
                <ArrowLeftIcon/>
                Back
            </Button>
            <div className="mt-10">
                <h2 className="text-[2.5vw] font-ProExtraBold mb-5">{titleLabel}</h2>
                <form onSubmit={onSubmit} className="flex flex-col space-y-7">

                    {/* NAME */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-md font-ProBold">
                            Name
                        </Label>
                        <Input className="w-[70%]" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of product" autoComplete="false"/>
                    </div>

                    {/* DETAILS */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-md font-ProBold">
                            Description
                        </Label>
                        <Textarea className="w-[70%] bg-white" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Talk more about your product, what it will be displayed to the public..." autoComplete="false"/>
                    </div>

                    {/* IMAGES */}
                    <div className="flex flex-col">
                        <Label className="text-md font-ProBold mb-3">
                            Image
                        </Label>
                        <ImageUpload values={image} onRemove={url => setImage(image.filter((i) => i.id !== url))} onChange={url => setImage([...image, {
                                id: nanoid(),
                                url
                        }])} disabled={Loading} />
                    </div>

                    <div className='flex gap-3 items-center'>

                        {/* CATEGORIES */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-md font-ProBold">
                                Category
                            </Label>
                            <Select onValueChange={(e) => setCategory(e)}>
                                <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Categories</SelectLabel>
                                        {categories?.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* SUB-CATEGORIES */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-md font-ProBold">
                                Sub-Category
                            </Label>
                            <Select onValueChange={(e) => setSubCategory(e)}>
                                <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Select a sub-category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Sub-Category</SelectLabel>
                                        {subCategories?.filter((subCategory) => subCategory.categoryId === category).map((i) => (
                                            <SelectItem defaultValue={subCategory} key={i.id} value={i.id}>{i.name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className='flex gap-3 items-center'>
                        {/* COLLECTIONS */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-md font-ProBold">
                                Collections
                            </Label>
                            <Select onValueChange={(e) => setCollection(e)}>
                                <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Select a collection" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Collections</SelectLabel>
                                        {collections?.map((i) => (
                                            <SelectItem defaultValue={collection} key={i.id} value={i.id}>{i.name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* STYLE */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-md font-ProBold">
                                Style
                            </Label>
                            <Select onValueChange={(e) => setStyle(e)}>
                                <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Select a style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Styles</SelectLabel>
                                        {styles?.map((i) => (
                                            <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className='flex gap-3 items-center'>

                        {/* PRICE */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-md font-ProBold">
                                Price
                            </Label>
                            <Input className="w-[70%]" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} placeholder="Price of the product" autoComplete="false"/>
                        </div>

                        {/* QUANTITY */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-md font-ProBold">
                                Quantity
                            </Label>
                            <Input className="w-[70%]" value={quantity} onChange={(e) => setQuantity(parseFloat(e.target.value))} placeholder="Quantity of the product" autoComplete="false"/>
                        </div>
                    </div>

                    {/* COLOR */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-md font-ProBold">
                            Color
                        </Label>
                        <Select onValueChange={(e) => setColor(e)}>
                                <SelectTrigger className="w-[70%] bg-white">
                                    <SelectValue placeholder="Select a color" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Colors</SelectLabel>
                                        {colors?.map((color) => (
                                            <SelectItem key={color.id} value={color.id}>
                                                <div className='flex items-center gap-2'>
                                                    <div className='rounded-full w-5 h-5' style={{backgroundColor: `${color.value}`}} />
                                                    <span>{color.name}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>


                    {/* SIZES */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-md font-ProBold">
                            Sizes
                        </Label>
                        <div className='flex items-center gap-3'>
                            {sizes?.map((size) => (
                                <div key={size.id}>
                                    <p onMouseDown={() => onSizeSelect(size.id)} className={isSelected.includes(size.id) ? 'border-2 border-black bg-white h-10 w-10 rounded-full grid justify-center items-center cursor-pointer font-ProBold' : 'h-10 w-10 rounded-full bg-white grid justify-center items-center cursor-pointer font-ProBold'}>{size.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BOOLEAN LEVELS SOLDOUT OR FEATURED PRODUCT */}
                    <div className="flex gap-4 items-center">
                        <div className="flex gap-2 items-center">
                        <input defaultChecked={isSoldOut} className="h-4 w-5 bg-transparent text-black rounded-sm" onChange={(e) => setIsSoldOut(prev => !prev)} id="soldOut" type="checkbox"/>
                            <Label htmlFor="soldOut" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Sold Out
                            </Label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input defaultChecked={isFeatured} className="h-4 w-5 bg-transparent text-black rounded-sm" onChange={(e) => setIsFeatured(prev => !prev)} id="featured" type="checkbox"/>
                            <Label htmlFor="featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Featured
                            </Label>
                        </div>
                    </div>
                    <Button disabled={Loading} className="w-fit text-center font-ProBold bg-[#AB8F80] hover:bg-[#8b7366] duration-300">
                        {Loading ? (
                        <div className="flex gap-2 items-center">
                            <MoonLoader size={20} color="white" />
                            {LoadingTitle}
                        </div>
                    ) : (
                        <div>
                        {ButtonTitle}
                        </div>
                    )}
                    </Button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default CreateProducts;