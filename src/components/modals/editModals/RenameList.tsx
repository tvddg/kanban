import { ListId } from "@/types/brands";
import { SubmitHandler, useForm } from "react-hook-form";

interface ListForm {
    name: string;
}

interface RenameListProps {
    id: ListId;
    initialValue: string;
    closeForm: () => void;
}

export default function RenameList({ id, initialValue, closeForm }: RenameListProps) {
    const { register, handleSubmit, setFocus } = useForm<ListForm>({
        defaultValues: { name: initialValue }
    });
    setFocus('name');

    const onSubmit = () => {
        
    };

    return <form onSubmit={handleSubmit(onSubmit)} name="Rename list form" aria-label="Rename list form">
        <input {...register('name', { required: true })}
        type="text" className="font-medium p-0.5 cursor-pointer outline-none hover:outline-none" />
    </form>
}