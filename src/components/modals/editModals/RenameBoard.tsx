import { renameBoard } from "@/lib/supabase/queries/board";
import { BoardId } from "@/types/brands";
import showToastError from "@/utils/toasts/showToastError";
import { SubmitHandler, useForm } from "react-hook-form";

interface RenameBoardProps {
    id: BoardId;
    submitDisabled: boolean;
    setPending: (val: boolean) => void;
    refresh: () => void;
    closeForm: () => void;
}

export default function RenameBoard({ id, submitDisabled, setPending, refresh, closeForm }: RenameBoardProps) {
    const { register, handleSubmit } = useForm<{ name: string }>();
    const onSubmit: SubmitHandler<{ name: string }> = async ({ name }) => {
            try {
                setPending(true);
                await renameBoard(id, name);
                refresh();
            } catch(err) {
                if (err instanceof Error) 
                    showToastError(err.message);
                else 
                    showToastError();
            } finally {
                closeForm();
                setPending(false);
            }
        };
    
    return <form onSubmit={handleSubmit(onSubmit)} aria-label="Rename board form" name="Rename board form">
        <input {...register('name', { required: true })} className="text-lg border-solid border-2 border-cyan-200 rounded-xl p-2 bg-gray-600 active:border-cyan-500 transition duration-200 cursor-pointer outline-none hover:outline-none" />
        <div className="text-lg flex items-center justify-start gap-6 mt-1.5 ml-1.5">
            <button disabled={submitDisabled} type="submit" className="bg-cyan-900 text-lg border-solid border rounded-xl w-fit pl-1.5 pr-1.5 hover:border-cyan-400 active:border-cyan-400 active:scale-95 transition duration-200 cursor-pointer">
                OK
            </button>
            <button onClick={() => closeForm()} type="button">
                Back
            </button>
        </div>
    </form>
}