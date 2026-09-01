"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";

interface INewListForm {
    name: string;
};

interface NewListProps {
    createList: (name: string) => void;
}

export default function NewList({ createList }: NewListProps) {
    const [isListCreating, setIsListCreating] = useState(false);
    const toggleNewListModal = () => {
        setIsListCreating(!isListCreating);
    };
    const { register, handleSubmit, reset } = useForm<INewListForm>();
    const onSubmit: SubmitHandler<INewListForm> = ({ name }) => {
        createList(name);
        toggleNewListModal();
        reset();
    };

    return <div data-testid="newListContainer" className="flex flex-col gap-8 ml-4 shrink-0 grow-0 overflow-clip bg-linear-to-br from-white/5 to-white/10 shadow-xl border border-white/20 backdrop-blur-md p-8 rounded-xl w-74 max-w-76 min-h-0 max-h-full">
        {
            isListCreating
                ? <form 
                    name="New list form"
                    aria-label="New list form"
                    className="flex flex-col justify-center items-center gap-4 text-xl"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        {...register('name', { required: true })}
                        className="outline-none border-2 border-white/20 max-w-full rounded-xl p-1.5 backdrop-blur-xl shadom-md"
                        placeholder="Type in name of the list"
                    />
                    <div className="flex justify-between w-full">
                        <button
                            className="hover:translate-y-0.5 hover:shadow-xs border-2 border-white/20 duration-150 cursor-pointer shadow-xl rounded-2xl pt-0.5 pb-0.5 pl-4 pr-4"
                        >OK</button>
                        <button
                            onClick={() => toggleNewListModal()}
                            className="hover:translate-y-0.5 hover:shadow-xs border-2 border-white/20 duration-75 cursor-pointer shadow-xl rounded-2xl pt-0.5 pb-0.5 pl-4 pr-4"
                        >Cancel</button>
                    </div>
                </form>
                : <div
                    onClick={() => toggleNewListModal()}
                    className="hover:translate-y-0.5 hover:scale-101 cursor-pointer duration-150 flex items-center gap-2 flex-col m-auto p-6"
                >
                    <p className="color-white">Create new list</p>
                    <Image src="/plus_icon.svg" alt="Create new list icon" width={30} height={30} />
                </div>
        }
    </div>
}