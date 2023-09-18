import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Skims Transactions is a comprehensive financial records and analytics platform that empowers organizations to manage and gain insights into their financial transactions efficiently.",
}

const TransactionsPage = () => {
  return (
    <section className='container relative mx-auto p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-[100dvh] lg:h-full lg:ml-[20vw]'>
      <h1>TransactionsPage</h1>
    </section>
  )
}

export default TransactionsPage;