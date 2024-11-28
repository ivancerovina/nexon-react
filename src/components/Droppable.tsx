import { useDroppable } from "@dnd-kit/core";
import { TDroppableProps } from "../types.ts";

export default function Droppable(props: TDroppableProps) {
    const { setNodeRef } = useDroppable({
        id: props.id,
    });

    return (
        <div ref={setNodeRef} className={props.className}>
            {props.children}
        </div>
    );
}
