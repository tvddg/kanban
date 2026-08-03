"use client";

import Item from "./Item";

interface IColumnItem {
    name: string;
}

interface ColumnProps {
    name: string;
    items: IColumnItem[];
}

export default function Column({ name, items }: ColumnProps) {
    return <div className="flex flex-col gap-8 shrink-0 bg-gray-900 p-4 rounded-xl w-xs h-fit min-h-fit min-w-fit">
                    <header className="flex rounded-xl">
                        <h2 className="ml-0.5 font-medium">{name}</h2>
                    </header>
                    <div className="text-2xl flex flex-col gap-8">
                        {
                            items.length > 0 
                            ? items.map(item =>
                                    <Item key={item.name} name={item.name} />
                                )
                            : <p className="font-medium text-gray-700 self-center">
                                Nothing here yet
                            </p>
                        }
                    </div>
                    <button className="font-extralight text-xl border-solid border rounded-xl w-fit p-1.5 m-auto hover:border-cyan-400 active:border-cyan-400 active:scale-95 transition duration-200 cursor-pointer">Add new card</button>
            </div>
}