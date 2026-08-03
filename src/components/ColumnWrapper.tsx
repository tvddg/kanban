import { PropsWithChildren } from "react";

export default function ColumnWrapper({ children }: PropsWithChildren) {
    return <div className="p-8 flex flex-col justify-start h-auto">
                <section className="flex gap-2 text-3xl h-auto overflow-x-scroll content-start">
                        {children}
                </section>
            </div>
}