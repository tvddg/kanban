import Image from "next/image"
import burgerIcon from "../../../../public/burger.svg"

export default function Header() {
    return <header className="flex justify-start content-center p-8 gap-6 bg-gray-900 rounded-b-xl">
            <Image src={burgerIcon} alt="Menu" width={50} height={50}/>
            <h1 className="text-3xl p-1.5 font-bold">My board</h1>
    </header>
}