import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings"
}

const SettingsPage = () => {
  return (
    <section className='relative p-4 flex-grow ml-0 rounded-lg bg-[#eceaf2] h-[100dvh] lg:h-full lg:ml-[20vw]'>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-ProExtraBold">
        <p>SETTINGS PAGE</p>
        <p className="duration-200 transition-colors animate-bounce">Still in works</p>
      </div>
    </section>
  )
}

export default SettingsPage