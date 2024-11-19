import {PropsWithChildren} from "react";

export type TModalProps = {
    title: string; description?: string[] | string
    onClose: () => void; open?: boolean;
} & PropsWithChildren;

export default function Modal({title, description, onClose, children, open = false}: TModalProps) {
    if (!open) {
        return null;
    }

    return <div className={"modal"}>
        <div className="content" style={{overflow: "hidden"}}>
            <div className="header">
                <button className="close" onClick={() => onClose?.()}>
                    <img src="/assets/buttons/close.svg" alt="close"/>
                </button>
            </div>
            <div className="texts custom-scrollbar">
                <h2 className="title">{title.toUpperCase()}</h2>
                {description && (Array.isArray(description)
                    ? description.map((desc, i) => <p key={i} className="description">{desc}</p>) :
                        <p className="description">{description}</p>)}
                {children}
            </div>
        </div>
    </div>
}