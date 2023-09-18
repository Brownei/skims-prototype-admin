"use client";

import { ClipLoader } from "react-spinners";
import { Skeleton } from "./ui/skeleton";

export const Loader = () => {
  return (
    <section className='p-4 flex-grow ml-2 rounded-lg bg-[#eceaf2] h-[100dvh] lg:h-full lg:ml-[20vw]'>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <ClipLoader size={20}/>
      </div>
    </section>
  )
};
