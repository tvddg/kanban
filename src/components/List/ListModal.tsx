"use client";

import { SubmitHandler, useForm } from "react-hook-form";

interface ListModalProps {
    addCard: (title: string, description?: string) => void;
    toggleModal: () => void;
}

interface ModalForm {
    title: string;
}

export default function ListModal({ addCard, toggleModal }: ListModalProps) {
    const { register, handleSubmit } = useForm<ModalForm>();

    const onSubmit: SubmitHandler<ModalForm> = ({ title }) => {
        addCard(title);
        toggleModal();
    };

    return <form 
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
    >
        <input 
            className="text-lg border-solid border-2 border-cyan-200 rounded-xl p-2 bg-gray-600 active:border-cyan-500 transition duration-200 cursor-pointer outline-none hover:outline-none" 
            {...register("title", { required: true })}
        />
        <div className="flex">
            <button 
                className="font-extralight bg-cyan-900 text-lg border-solid border rounded-xl w-fit p-1.5 mr-auto hover:border-cyan-400 active:border-cyan-400 active:scale-95 transition duration-200 cursor-pointer"
                type="submit"
            >
                Add
            </button>
            <button 
                type="button"
                className="font-extralight text-lg border-solid border rounded-xl w-fit p-1.5 ml-auto hover:border-cyan-400 active:border-cyan-400 active:scale-95 transition duration-200 cursor-pointer"
                onClick={() => toggleModal()}
            >
                Back
           </button>
        </div>
    </form>
}