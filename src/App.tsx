import "./styles/global.scss";
import "./styles/modal.scss";
import "./styles/slider.scss";
import "./styles/typography.scss";
import axios from "axios";
import {
    CharityImages,
    CharityKnobs,
    CharityLinks,
    charityNames,
    CharityTitles,
    REQUIRED_DONATION_SUM
} from "./constants.tsx";
import {useState} from "react";
import {toast, Toaster} from "react-hot-toast";
import Charity from "./components/Charity.tsx";
import {SledContext} from "./context/sled-context.tsx";
import {TotalContext} from "./context/total-context.tsx";
import {TDataToSubmit, TSled} from "./types.ts";

const initialState: TSled[] = Object.values(charityNames).map((name) => ({
    id: name, parent: "0", value: 0,
}));

function App() {
    const [sleds, setSleds] = useState<TSled[]>(initialState);
    const [total, setTotal] = useState<number>(0);
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [variant, setVariant] = useState<"success" | "error" | "none">("none");

    async function handleSubmit() {
        if (total < REQUIRED_DONATION_SUM) return toast.error(`Total must be ${REQUIRED_DONATION_SUM} Ft`);

        const data: TDataToSubmit = Object.values(charityNames).reduce((acc, curr) => ({
            ...acc, [curr]: sleds.find((sled) => sled.id === curr)?.value,
        }), {});

        const res = await axios.get("https://api.ipify.org?format=json");
        const {ip} = res.data;
        data.ip = ip;

        // setPopupOpen(true);
        // setVariant("error");

        // return;

        const API_URL = "" // https://www.nexon.hu/giveaway";
        // if (process.env.NODE_ENV === "development") API_URL = API_URL_DEVELOPMENT;
        // if (process.env.NODE_ENV === "test") API_URL = API_URL_STAGING;
        // if (process.env.NODE_ENV === "production") API_URL = API_URL_PRODUCTION;

        try {
            const res = await axios.post(API_URL, {
                data,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status === 425) {
                setPopupOpen(true);
                setVariant("error");
                throw new Error("You have already submitted");
            }
            if (res.status === 403) {
                setPopupOpen(true);
                setVariant("error");
                throw new Error("You have already submitted");
            }
            if (!res.data) throw new Error("Something went wrong");
            if (res.status === 200) {
                setPopupOpen(true);
                setVariant("success");
            }
            setSleds(initialState);
            setTotal(0);
            // eslint-disable-next-line
        } catch (e: any) {
            if (e?.response?.status === 403) {
                setPopupOpen(true);
                setVariant("error");
                throw new Error("You have already submitted");
            }
            console.log(e.message);
        }
    }

    return (<div className="container">
        <Toaster position={"top-right"}/>
        <div
            className="main"
            style={{
                backgroundImage: "url(/themes/custom/nexon/libraries/karacsony/build/bgImage.png)",
            }}
        >
            <div className="main__hero">
                <img src={"/assets/header.svg"} style={{width: "100%"}}/>
            </div>

            <div className="main__content">
                <div className="main__content--wrapper">
                    <p className="fontMedium grayText">
                        A csúszkán minden beosztás 400 000 forintot jelent. Húzza az ajándékokat aszerint,
                        ahogyan Ön osztaná el az adományt az alapítványok között. A kiválasztott arányokat
                        végül egyesítjük, s ennek megfelelően osztjuk szét a felajánlott összeget a négy
                        szervezet között. Miután végzett, az „Elküldöm” gombra kattintva véglegesítse döntését.
                    </p>
                </div>
                <Toaster/>
                <div className="main__content-container">
                    <TotalContext.Provider value={{total, setTotal}}>
                        <SledContext.Provider value={{sleds, setSleds}}>
                            {sleds.map(({id, parent, value}) => {
                                return (<Charity
                                    image={CharityImages[id]}
                                    sliderKnob={CharityKnobs[id]}
                                    title={CharityTitles[id]}
                                    link={CharityLinks[id]}
                                    id={id}
                                    parent={parent}
                                    key={id}
                                    value={value}
                                />);
                            })}

                            <div className="main__content-container-buttons bottom-gradient">
                                {popupOpen ? (<div className="modal">
                                    <div className="content">
                                        <div className="header">
                                            <button
                                                className="popup__content-close-btn"
                                                onClick={() => {
                                                    setPopupOpen(false);
                                                }}
                                            >
                                                <img
                                                    src="../public/assets/buttons/close.svg"
                                                    width={35}
                                                    height={35}
                                                    alt="close btn"
                                                />
                                            </button>
                                        </div>
                                        {variant === "success" && (<>
                                            <h1 className="popup__title fontExtraBold">
                                                Köszönjük szavazatát!
                                            </h1>
                                            <button
                                                onClick={() => (window.parent.location.href = "https://www.nexon.hu/")}
                                                className="popup__content-home-btn"
                                            >
                                                <span className="fontExtraBold">Kezdőlap</span>
                                            </button>
                                        </>)}
                                        {variant === "error" && (<>
                                            <h1 className="popup__title fontExtraBold">
                                                Köszönjük!
                                            </h1>
                                            <p className="fontMedium">
                                                Már regisztráltuk az Ön szavazatát, kérjük
                                                próbálja meg később!
                                            </p>
                                            <button
                                                onClick={() => (window.parent.location.href = "https://www.nexon.hu/")}
                                                className="popup__content-home-btn"
                                            >
                                                <span className="fontExtraBold">Kezdőlap</span>
                                            </button>
                                        </>)}
                                    </div>
                                </div>) : null}
                                <button
                                    onClick={() => {
                                        setSleds(initialState);
                                        setTotal(0);
                                    }}
                                    disabled={total === 0}
                                    className="main__content-container-button-back  fontExtraBold"
                                >
                                    VISSZAÁLLÍTÁS
                                </button>
                                <button
                                    className="main__content-container-button-save  fontExtraBold"
                                    onClick={handleSubmit}
                                    disabled={(() => {
                                        console.log(total);
                                        return total < REQUIRED_DONATION_SUM
                                    })()}
                                >
                                    ELKÜLDÖM
                                </button>
                            </div>
                        </SledContext.Provider>
                    </TotalContext.Provider>
                </div>
            </div>
        </div>
    </div>);
}

export default App;
