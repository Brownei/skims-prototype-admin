import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings"
}

const SettingsPage = () => {
  return (
    <section className='container relative mx-auto p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-screen lg:ml-[20vw]'>
      <h1>SettingsPage</h1>
    </section>
  )
}

export default SettingsPage