export { default } from 'next-auth/middleware'

export const config = { matcher: [ "/dashboard/categories", "/dashboard/orders", "/dashboard/colors", "/dashboard/styles", "/dashboard/sizes", "/dashboard/overview", "/dashboard/products", "/dashboard/settings", "/dashboard/transactions"] }