import { prismaClient } from "@/lib/prismaClient";

export const getProductCount = async (id: string | undefined) => {
  const productCount = await prismaClient.product.count({
    where: {
      adminId: id,
      isSoldOut: false,
    }
  });
  

  return productCount;
};
