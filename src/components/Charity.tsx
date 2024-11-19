import {DndContext, DragEndEvent} from "@dnd-kit/core";
import Draggable from "../components/Draggable";
import {SledContext} from "../context/sled-context";
import {useContext, useEffect, useState} from "react";
import {TotalContext} from "../context/total-context";
import {CharityPopupTexts, REQUIRED_DONATION_SUM, STEP, TOTAL_STEPS} from "../constants";
import {TCharityProps, TSled} from "../types.ts";
import Droppable from "./Droppable.tsx";
import {restrictToHorizontalAxis, restrictToWindowEdges} from "@dnd-kit/modifiers";
import Modal from "./Modal.tsx";

const Charity = ({title, image, link, id, parent, sliderKnob}: TCharityProps) => {
    const containers = Array.from({length: TOTAL_STEPS}, (_, i) => i.toString());
    const {sleds, setSleds} = useContext(SledContext);
    const {total, setTotal} = useContext(TotalContext);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        const main = document.querySelector("body");
        console.log("popupOpen", popupOpen);
        if (popupOpen) {
            main?.classList?.add("no-scroll");
        } else {
            main?.classList?.remove("no-scroll");
        }
    }, [popupOpen]);

    const draggableMarkup = <Draggable src={sliderKnob} id={id}/>;

    return (<>
        <div className="charity__content">
            <div className={"actual-content slider-gradient"}>
                <div className="charity__content-price">
                    <h1 className="charity__content-price-value">
                        {new Intl.NumberFormat("hu-HU", {
                            currency: "HUF", maximumFractionDigits: 0,
                        }).format(+parent * STEP)}
                    </h1>
                    <h2 className="charity__content-price-unit">Ft</h2>
                </div>
                <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToHorizontalAxis, restrictToWindowEdges]}>
                    <div className={"custom-slider"} style={{marginTop: "2em"}}>
                        <img src={image} alt={title} className="background"/>
                        <div className="content">
                            {containers.map((id: string) => (<Droppable key={id} id={id} className={"section"}>
                                {parent === id ? draggableMarkup : ""}
                            </Droppable>))}
                        </div>
                    </div>
                </DndContext>
            </div>
            <div className="charity-links">
                <img
                    className={"img-button info-button"}
                    src="/assets/buttons/info.svg"
                    alt="info"
                    onClick={() => setPopupOpen(true)}
                />
                <p className="fontMedium">{title.toUpperCase()}</p>
                <img
                    className={"img-button link-button"}
                    src="/assets/buttons/link.svg"
                    alt="link"
                    onClick={() => window.open(link, "_blank")?.focus()}
                />
            </div>
        </div>
        <Modal title={title.toUpperCase()} onClose={() => setPopupOpen(false)} open={popupOpen} children={CharityPopupTexts[id]} />
    </>);

    function handleDragEnd(event: DragEndEvent) {
        const {over} = event;

        let newSleds = null;
        const newTotal = +total - +parent * STEP;

        let newValue;
        if (!over || !over?.id) return;
        newSleds = sleds.map((sled: TSled) => {
            if (id === sled.id) {
                if (newTotal + +over.id * STEP > REQUIRED_DONATION_SUM) {
                    const maxParent = Math.floor((REQUIRED_DONATION_SUM - newTotal) / STEP);
                    newValue = maxParent * STEP;
                    return {
                        ...sled, parent: over ? maxParent.toString() : null, value: newValue,
                    };
                }
                return {
                    ...sled, parent: over ? over.id : null, value: over ? +over.id * STEP : 0,
                };
            }
            return sled;
        });

        setSleds(newSleds);
        setTotal(newTotal + (newValue ?? +over.id * STEP));
    }
};

export default Charity;
