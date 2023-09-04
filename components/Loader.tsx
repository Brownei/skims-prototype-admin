"use client";

import { ClipLoader } from "react-spinners";
import { Skeleton } from "./ui/skeleton";

export const Loader = () => {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <ClipLoader size={20}/>
    </div>
  )
};
