"use server"
import { prismaClient } from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
import getCurrentUser from "./getCurrentUser";

  
export default async function getStyles() {
    try {
      const currentUser = await getCurrentUser()
      const styles = await prismaClient.style.findMany({
        where: {
          adminId: currentUser?.id
        }
      });
  
      const StylesList = styles.map((style) => ({
        ...style
      }));

      revalidatePath('/dashboard/styles')
  
      return StylesList;
    } catch (error: any) {
      throw new Error(error);
    }
}
  