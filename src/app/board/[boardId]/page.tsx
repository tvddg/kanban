

// TODO firstly: divide the UI into components, 
// add interactions with DND kit

import Column from "../../../components/Column"
import Header from "../../../components/UI/header/header"
import ColumnWrapper from "@/components/ColumnWrapper";

export default function Board() {
    return <>
        <ColumnWrapper>
            <Column name="To do" items={[]}/>
            <Column name="In progress" items={[]}/>
            <Column name="Done" items={[]}/>
        </ColumnWrapper>
    </>
}