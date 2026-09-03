import { ListId } from "@/types/brands";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ListForm {
    name: string;
}

interface RenameListProps {
    id: ListId;
    initialValue: string;
    renameList: (name: string) => void;
    closeForm: () => void;
}

export default function RenameList({ initialValue, renameList, closeForm }: RenameListProps) {
    const { register, handleSubmit, reset, setFocus } = useForm<ListForm>({
        defaultValues: { name: initialValue }
    });

    useEffect(() => setFocus('name'), [setFocus]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onBlur: _, ...restRegistration } = register('name', { required: true }); 
    const onBlur = () => {
        closeForm();
        reset();
    };

    const onEscapeDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            e.currentTarget.blur();
        }
    }

    const onSubmit: SubmitHandler<ListForm> = ({ name }) => {
        renameList(name);
        closeForm();
    };

    return <form onSubmit={handleSubmit(onSubmit)} name="Rename list form" aria-label="Rename list form" className="border-b border-white/15 max-w-8/10">
        <input 
            onBlur={onBlur}
            {...restRegistration}
            onKeyDown={onEscapeDown}
            type="text" className="font-medium p-0.5 cursor-pointer outline-none hover:outline-none" 
        />
    </form>
}