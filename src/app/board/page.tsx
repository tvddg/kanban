import Image from "next/image"
import burgerIcon from "../../../public/burger.svg"

export default function Board() {
    return <div className="bg-linear-to-br from-cyan-300 to-purple-600 h-screen text-white">
        <header className="flex justify-start content-center p-8 gap-6 bg-gray-900 rounded-b-xl">
            <Image src={burgerIcon} alt="Menu" width={50} height={50}/>
            <h1 className="text-3xl p-1.5 font-bold">My board</h1>
        </header>
        <div className="p-6 flex flex-col justify-start h-auto">
            <section className="flex gap-4 text-3xl h-auto overflow-x-scroll content-start">
                <div className="flex flex-col gap-8 shrink-0 bg-gray-900 p-4 rounded-xl w-xs h-fit min-h-fit min-w-fit">
                    <header className="flex rounded-xl">
                        <h2 className="ml-0.5 font-medium">To do</h2>
                    </header>
                    <div className="text-2xl flex flex-col gap-8">
                        <p className="border-solid border-2 border-cyan-200 rounded-xl p-4 bg-gray-600 hover:border-cyan-500 hover:scale-103 active:border-cyan-500 active:scale-95 transition duration-200 cursor-pointer">Task 1</p>
                        <p className="border-solid border-2 border-cyan-200 rounded-xl p-4 bg-gray-600 hover:border-cyan-500 hover:scale-103 active:border-cyan-500 active:scale-95 transition duration-200 cursor-pointer">Task 2</p>
                        <p className="border-solid border-2 border-cyan-200 rounded-xl p-4 bg-gray-600 hover:border-cyan-500 hover:scale-103 active:border-cyan-500 active:scale-95 transition duration-200 cursor-pointer">Task 3</p>
                    </div>
                    <button className="font-extralight text-xl border-solid border rounded-xl w-fit p-1.5 m-auto hover:border-cyan-400 active:border-cyan-400 active:scale-95 transition duration-200 cursor-pointer">Add new card</button>
                </div>
                <div className="flex flex-col gap-8 shrink-0 bg-gray-900 p-4 rounded-xl w-xs h-fit min-h-fit min-w-fit">
                    <header className="flex rounded-xl">
                        <h2 className="ml-0.5 font-medium">In progress</h2>
                    </header>
                    <div className="text-2xl flex flex-col gap-8">
                        <p className="border-solid border-2 border-cyan-200 rounded-xl p-4 bg-gray-600">Task 1</p>
                        <p className="border-solid border-2 border-cyan-200 rounded-xl p-4 bg-gray-600">Task 2</p>
                        <p className="border-solid border-2 border-cyan-200 rounded-xl p-4 bg-gray-600">Task 3</p>
                        <p className="border-solid border-2 border-cyan-200 rounded-xl p-4 bg-gray-600">Task 4</p>
                    </div>
                    <button className="font-extralight text-xl border-solid border rounded-xl w-fit p-1.5 m-auto">Add new card</button>
                </div>
                <div className="flex flex-col gap-8 shrink-0 bg-gray-900 p-4 rounded-xl w-xs h-fit min-h-fit min-w-fit">
                    <header className="flex rounded-xl">
                        <h2 className="ml-0.5 font-medium">Done</h2>
                    </header>
                    <div className="text-2xl flex flex-col gap-8">
                        <p className="border-solid border-2 border-cyan-200 rounded-xl p-4 bg-gray-600">Task 1</p>
                        <p className="border-solid border-2 border-cyan-200 rounded-xl p-4 bg-gray-600">Task 2</p>
                        <p className="border-solid border-2 border-cyan-200 rounded-xl p-4 bg-gray-600">Task 3</p>
                    </div>
                    <button className="font-extralight text-xl border-solid border rounded-xl w-fit p-1.5 m-auto">Add new card</button>
                </div>
            </section>
        </div>
    </div>
    
}