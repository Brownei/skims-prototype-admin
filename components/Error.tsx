'use client';

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


interface ErrorProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const Error: React.FC<ErrorProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset
}) => {
  const router = useRouter();

  return ( 
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <h1 className="text-center">{title}</h1>
      <h2 className="text-center font-ProLight">{subtitle}</h2>
      <div>
        {showReset && (
          <Button
          className="w-fit text-center font-ProBold bg-[#AB8F80] hover:bg-[#8b7366] duration-300"
          variant='outline'
          onClick={() => router.refresh()}>
            Refresh Page
          </Button>
        )}
      </div>
    </div>
   );
}
 
export default Error;