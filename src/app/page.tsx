import BoardSlider from "@/components/BoardSlider";
import Header from "@/components/UI/header";

export default function Home() {
    return (
        <>
            <Header name="Kanban Tracker" />
            <BoardSlider />
        </>
    );
}
