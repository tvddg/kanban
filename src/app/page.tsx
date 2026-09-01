import BoardSlider from "@/components/BoardSlider";
import Header from "@/components/UI/Header";

export const dynamic = "force-dynamic";

export default async function Home() {
    return (
        <>
            <Header name="Kanban Tracker" />
            <BoardSlider />
        </>
    );
}