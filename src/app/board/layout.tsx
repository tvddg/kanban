import Header from "@/components/UI/header/header";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return <>
        <Header />
        { children }
    </>
}