import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import { PointerSensor, PointerActivationConstraints } from "@dnd-kit/dom"
import { PropsWithChildren } from "react";
import handleDragEnd from "./handlers/handleDragEnd";
import handleDragOver from "./handlers/handleDragOver";
import { ListWithCards } from "@/types";
import { UnitedHandlers } from "@/hooks/useOptimisticLists/handlers";

interface DndCardsProviderProps {
    boardLists: ListWithCards[];
    refreshLists: () => Promise<void>;
    handlers: {
        previewMoveCard: UnitedHandlers["previewMoveCard"],
        commitCardPosition: UnitedHandlers["commitCardPosition"]
    };
}

export default function DndCardsProvider(
    { boardLists, refreshLists, handlers, children }: PropsWithChildren<DndCardsProviderProps>
) {
    return <DragDropProvider
        sensors={(defaults) => [
            ...defaults.filter((sensor) => sensor !== PointerSensor),
            PointerSensor.configure({
                activationConstraints: [new PointerActivationConstraints.Delay({ value: 300, tolerance: 10 })]
            })
        ]}
        onDragOver={(e) => handleDragOver(e, boardLists, handlers.previewMoveCard)}
        onDragEnd={(e) => handleDragEnd(e, boardLists, handlers.commitCardPosition, refreshLists)}
    >
        {children}
        <DragOverlay>
            {(source) => <span
                className="flex justify-between border-solid text-ellipsis whitespace-nowrap overflow-clip border-2 shadow-2xs border-cyan-500 rounded-xl p-2 bg-gray-800 text-lg"
            >
                {String(source.data?.title ?? "")}
            </span>}
        </DragOverlay>
    </DragDropProvider>
}