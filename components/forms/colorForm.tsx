"use client"
import { Button } from "@/components/ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { MoonLoader } from "react-spinners"
import React, { ChangeEvent, SyntheticEvent } from "react"
import { Color } from "@prisma/client"
import namedColors from 'color-name-list'
import {useState} from 'react'

interface CategoryFormProps {
  title: string;
  initialValue?: Color | null;
  isLoading: boolean;
  colors: string;
  Buttonlabel: string;
  LoadingLabel: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  valuColor: string;
  setValueColor: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: SyntheticEvent) => {}
}

type ColorList = {
  name: string
  hex: string
}

const ColorForm = ({title, isLoading, colors, Buttonlabel, LoadingLabel, setColor, valuColor, setValueColor, onSubmit}: CategoryFormProps) => {
  function handleChange() {
    const selectedColor: ColorList | undefined = namedColors.find((c: ColorList) => c.name.toLowerCase() === colors.toLowerCase())

    if(selectedColor) {
      setValueColor(selectedColor.hex)
    } else {
      setValueColor('No Color Value')
    }
  }

  return (
    <div className="mt-10">
      <Label className="text-lg font-ProExtraBold">{title}</Label>
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <div className="flex flex-col space-y-3">
              <Label className="text-md font-ProBold">
                  Color Name
              </Label>
              <div className="flex gap-4 items-center">
                <Input className="w-[70%]" value={colors} onChange={(e) => setColor(e.target.value)} placeholder="Red, Blue, Green and so on" autoComplete="false"/>
                <Button className="w-fit text-center font-ProLight bg-[#AB8F80] hover:bg-[#8b7366] duration-300" type="button" onClick={handleChange}>Find Color</Button>
              </div>
          </div>
          <div>
              <Label className="text-md font-ProBold">
                  Value
              </Label>
              <Input className="w-[70%]" value={valuColor} placeholder="Red, Blue, Green and so on" autoComplete="false"/>
          </div>
          <Button disabled={isLoading} className="w-fit text-center font-ProBold bg-[#AB8F80] hover:bg-[#8b7366] duration-300" type="submit">
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

export default ColorForm;
