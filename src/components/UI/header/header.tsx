import Image from "next/image"

interface HeaderProps {
    name: string;
}

export default function Header({ name }: HeaderProps) {
    return <header className="flex justify-start content-center p-4 gap-6 bg-linear-to-r drop-shadow-2xl border-gray-900 from-red-300 to-purple-600 rounded-b-xl max-h-2/14">
            <Image src="/burger.svg" alt="Menu" width={50} height={50}/>
            <h1 className="text-3xl p-1.5 font-bold">{name}</h1>
    </header>
}