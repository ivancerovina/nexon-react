import {useDraggable} from "@dnd-kit/core";
import {TDraggableProps} from "../types.ts";

export default function Draggable(props: TDraggableProps) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px,0, 0)`,
    } : undefined;

    return (<div className="draggabble-wrapper">
            <img
                {...listeners}
                {...attributes}
                ref={setNodeRef}
                src={props.src}
                alt={`${props.id} slider knob`}
                className="sled-image"
                style={{
                    touchAction: "none",
                    ...style,
                }}
            />
        </div>);
}
