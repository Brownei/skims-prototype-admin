"use client"
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { MoonLoader } from "react-spinners"
import React, { ChangeEvent, SyntheticEvent, useRef, useState } from "react"
import { Category, SubCategory } from "@prisma/client"
import { nanoid } from 'nanoid';


type subCategories = {
  name: string;
  id: string;
}


type CategoryFormProps = {
  title: string;
  isLoading: boolean;
  category: string;
  Buttonlabel: string;
  LoadingLabel: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  subCategory: subCategories[];
  setSubCategory: React.Dispatch<React.SetStateAction<subCategories[]>>;
  initialSubCategory?: SubCategory[] | null
  onSubmit: (e: SyntheticEvent) => {}
}

const CategoryForm = ({title, isLoading, category, Buttonlabel, LoadingLabel, setCategory, subCategory, setSubCategory, initialSubCategory, onSubmit}: CategoryFormProps) => {

  function handleAddInput() {
    let newSubCategory = [...subCategory]
    newSubCategory.push({
      name: "",
      id: nanoid()
    })
    setSubCategory(newSubCategory)
  };

  function handleRemoveInput(id: string) {
    let newSubCategory = [...subCategory]
    newSubCategory = newSubCategory.filter((singleNewSub) => singleNewSub.id !== id)
    setSubCategory(newSubCategory)
  };

  const handleInputChange = (id: string, event: ChangeEvent<HTMLInputElement>) => {
    const index = subCategory.findIndex((singleSubCategory) => singleSubCategory.id === id)
    let newSubCategory = [...subCategory] as any
    newSubCategory[index][event.target.name] = event.target.value
    setSubCategory(newSubCategory)
  };
  

  return (
    <div>
      <Label>{title}</Label>
        <form onSubmit={onSubmit} className="space-y-4 mt-8">
          <div className="flex flex-col space-y-3">
            <Label className="text-md font-ProBold">
              Category name
            </Label>
            <Input className="w-[70%]" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Swim, Bras, Underwear and so on" autoComplete="false"/>
          </div>
          <div className="flex flex-col space-y-3">
            <Label className="text-md font-ProBold"> Sub-Category name(s)</Label>
              <div className="grid gap-3">
                {subCategory.map((singleSubCategory, index) => (
                  <div className="flex items-center gap-3" key={index}>
                    <Input name='name' defaultValue={singleSubCategory.name} onChange={(e) => handleInputChange(singleSubCategory.id, e)} className="w-[50%]" placeholder="Add any"/>
                    {subCategory.length > 1 && (
                      <Button onClick={() => handleRemoveInput(singleSubCategory.id)} variant='ghost' type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </Button>
                    )}
                  </div>
                ))}
                <Button onClick={handleAddInput} className="w-fit text-sm font-ProLight bg-[#AB8F80] hover:bg-[#8b7366] duration-300" type="button">Add New Sub-Category </Button>
              </div>
          </div>
          <Button disabled={isLoading} className="text-md font-ProExtraBold bg-[#AB8F80] hover:bg-[#8b7366] duration-300" type='submit'>
            {isLoading ? (
              <div className="flex gap-2 items-center">
                <MoonLoader size={20} color="white" />
                {LoadingLabel}
              </div>
            ) : (
              <div>
                {Buttonlabel}
              </div>
            )}
          </Button>
        </form>
    </div>
  )
}

export default CategoryForm;


//subCategory[index].name
