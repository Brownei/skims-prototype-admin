import { prismaClient } from "@/lib/prismaClient";

export const getTotalRevenue = async (id: string | undefined) => {
  const paidOrders = await prismaClient.order.findMany({
    where: {
      adminId: id,
      isPaid: true
    },
    include: {
        product: true
    }
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.product.reduce((orderSum, item) => {
      return orderSum + item.price;
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};


export const getTotalRevenuePercentage = async (id: string | undefined) => {
  const currentDate = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(currentDate.getMonth() - 1);

  const totalRevenueLastMonth = await prismaClient.order.findMany({
    where: {
      adminId: id,
      isPaid: true,
      createdAt: {
        gte: lastMonthDate,
        lt: currentDate,
      }
    }, include: {
      product: true
    }
  })

  let totalValueBeginningOfMonth = 0;
  let totalValueEndOfMonth = 0;

  for (const order of totalRevenueLastMonth) {
    totalValueEndOfMonth += order.pricePaid; // Add up total purchase values
  }

  const percentageChange = ((totalValueEndOfMonth - totalValueBeginningOfMonth) / totalValueBeginningOfMonth) * 100;

  if(percentageChange === 0 || Number.isNaN(percentageChange)) {
    return 0
  } 

  return percentageChange
}
