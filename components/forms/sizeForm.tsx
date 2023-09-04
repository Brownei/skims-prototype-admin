"use client"
import { Button } from "@/components/ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { MoonLoader } from "react-spinners"
import React, { SyntheticEvent } from "react"

interface CategoryFormProps {
  title: string;
  isLoading: boolean;
  size: string;
  Buttonlabel: string;
  LoadingLabel: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  valueSize: string;
  setValueSize: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: SyntheticEvent) => {}
}

const SizeForm = ({title, isLoading, size, Buttonlabel, LoadingLabel, setSize, valueSize, setValueSize, onSubmit}: CategoryFormProps) => {

  return (
    <div className="mt-10">
      <Label className="text-lg font-ProExtraBold">{title}</Label>
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <div className="flex flex-col space-y-3">
              <Label className="text-md font-ProBold">
                  Color Name
              </Label>
              <Input className="w-[70%]" value={size} onChange={(e) => setSize(e.target.value)} placeholder="Meduim, Small, Large and so on" autoComplete="false"/>
          </div>
          <div>
              <Label className="text-md font-ProBold">
                  Value
              </Label>
              <Input className="w-[70%]" value={valueSize} onChange={(e) => setValueSize(e.target.value)} placeholder="L, M, XXL and so on" autoComplete="false"/>
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

export default SizeForm;
