"use client";

import { PropsWithChildren } from "react";
import { DragDropProvider } from "@dnd-kit/react";

export default function ColumnWrapper({ children }: PropsWithChildren) {
    return <div className="pt-8 pl-4 flex flex-col justify-start h-auto">
                <DragDropProvider>
                     <section className="flex gap-2 text-3xl h-auto overflow-x-scroll content-start">
                        {children}
                        </section>
                </DragDropProvider>
            </div>
}