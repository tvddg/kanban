import Header from "@/components/UI/header/header";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <Header name="Kanban Tracker" />
            <section className="flex text-2xl flex-col mt-12 p-6 pb-8 rounded-xl bg-linear-to-br from-white/5 to-white/10 shadow-xl border border-white/20 backdrop-blur-md">
                <h2 className="text-3xl pb-3 font-medium">Your boards</h2>
                <div className="flex gap-8 overflow-scroll">
                    <div className="flex flex-col gap-2 items-center justify-center shrink-0 grow-0 w-96 h-40 rounded-xl bg-linear-to-br from-white/5 to-white/10 shadow-xl border border-white/20 backdrop-blur-md">
                        <p className="color-white">Create new board</p>
                        <Image src="/plus_icon.svg" alt="Create new list icon" width={30} height={30} />
                    </div>
                    <div className="flex flex-col align-start justify-around p-4 shrink-0 grow-0 w-96 h-40 rounded-xl bg-linear-to-b from-gray-900 to-gray-800 shadow-xl">
                        <div className="flex justify-between">
                            <p className="font-medium">Board 1 (name)</p>
                            <Image className="text-sm" src="/settings_icon.svg" alt="settings icon" width={40} height={40} />
                        </div>
                        <p className="text-xl opacity-60">Created at: 11:09, Aug 6th, 2026</p>            
                    </div>
                    <div className="flex flex-col align-start justify-around p-4 shrink-0 grow-0 w-96 h-40 rounded-xl bg-linear-to-b from-gray-900 to-gray-800 shadow-xl">
                        <div className="flex justify-between">
                            <p className="font-medium">Board 1 (name)</p>
                            <Image className="text-sm" src="/settings_icon.svg" alt="settings icon" width={40} height={40} />
                        </div>
                        <p className="text-xl opacity-60">Created at: 11:09, Aug 6th, 2026</p>            
                    </div>
                    <div className="flex flex-col align-start justify-around p-4 shrink-0 grow-0 w-96 h-40 rounded-xl bg-linear-to-b from-gray-900 to-gray-800 shadow-xl">
                        <div className="flex justify-between">
                            <p className="font-medium">Board 1 (name)</p>
                            <Image className="text-sm" src="/settings_icon.svg" alt="settings icon" width={40} height={40} />
                        </div>
                        <p className="text-xl opacity-60">Created at: 11:09, Aug 6th, 2026</p>            
                    </div>
                    <div className="flex flex-col align-start justify-around p-4 shrink-0 grow-0 w-96 h-40 rounded-xl bg-linear-to-b from-gray-900 to-gray-800 shadow-xl">
                        <div className="flex justify-between">
                            <p className="font-medium">Board 1 (name)</p>
                            <Image className="text-sm" src="/settings_icon.svg" alt="settings icon" width={40} height={40} />
                        </div>
                        <p className="text-xl opacity-60">Created at: 11:09, Aug 6th, 2026</p>            
                    </div>
                    <div className="flex flex-col align-start justify-around p-4 shrink-0 grow-0 w-96 h-40 rounded-xl bg-linear-to-b from-gray-900 to-gray-800 shadow-xl">
                        <div className="flex justify-between">
                            <p className="font-medium">Board 1 (name)</p>
                            <Image className="text-sm" src="/settings_icon.svg" alt="settings icon" width={40} height={40} />
                        </div>
                        <p className="text-xl opacity-60">Created at: 11:09, Aug 6th, 2026</p>            
                    </div>

                </div>
            </section>
        </>
    );
}
