import BoardSlider from "@/components/BoardSlider";
import Header from "@/components/UI/Header";

export default function Home() {
    return (
        <>
            <Header name="Kanban Tracker" />
            <BoardSlider />
        </>
    );
}
