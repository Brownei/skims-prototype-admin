import { prismaClient } from "@/lib/prismaClient";

export const getSales = async (id: string | undefined) => {
  const salesCount = await prismaClient.order.count({
    where: {
      adminId: id,
      isPaid: true
    },
  });

  return salesCount;
};


export const getSalesPercentage = async (id: string | undefined) => {
  const currentDate = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(currentDate.getMonth() - 1);

  const salesLastMonth = await prismaClient.order.findMany({
    where: {
      adminId: id,
      createdAt: {
        gte: lastMonthDate,
        lt: currentDate,
      }
    }
  })

  let totalValueBeginningOfMonth = 0;
  let totalValueEndOfMonth = 0;

  for (const order of salesLastMonth) {
    totalValueEndOfMonth += order.pricePaid; // Add up total purchase values
  }

  const percentageChange = ((totalValueEndOfMonth - totalValueBeginningOfMonth) / totalValueBeginningOfMonth) * 100;

  if(percentageChange === 0 || Number.isNaN(percentageChange)) {
    return 0
  } 

  return percentageChange
}

export const getSalesByCurrentMonth = async (id: string | undefined) => {
  const currentDate = new Date()
  const currentMonth = new Date()
  currentMonth.setMonth(currentDate.getMonth())

  const salesCountByMonth = await prismaClient.order.count({
    where: {
      adminId: id,
      isPaid: true,
      createdAt: {
        gte: currentMonth
      }
    },
  });

  return salesCountByMonth;
};

export const getSalesOrders = async (id: string | undefined) => {
  const currentDate = new Date()
  const currentMonth = new Date()
  currentMonth.setMonth(currentDate.getMonth())

  const sales = await prismaClient.order.findMany({
    where: {
      adminId: id,
      isPaid: true,
      createdAt: {
        gte: currentMonth
      }
    }, orderBy: {
      createdAt: 'desc'
    }
  });

  return sales
}