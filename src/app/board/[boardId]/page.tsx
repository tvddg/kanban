 // add interactions with DND kit

import Column from "../../../components/Column"
import ColumnWrapper from "@/components/ColumnWrapper";

export default function Board() {
    return <>
        <ColumnWrapper>
            <Column name="To do" items={[ {name: "Do something"} ]}/>
            <Column name="In progress" items={[]}/>
            <Column name="Done" items={[]}/>
        </ColumnWrapper>
    </>
}