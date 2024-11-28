import "./styles/global.scss";
import "./styles/modal.scss";
import "./styles/slider.scss";
import "./styles/typography.scss";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {
    CharityImages,
    CharityKnobs,
    CharityLinks,
    charityNames,
    CharityTitles,
    MAIN_DESCRIPTION,
    REQUIRED_DONATION_SUM,
    STAGE
} from "./constants.tsx";
import {useState} from "react";
import Charity from "./components/Charity.tsx";
import {SledContext} from "./context/sled-context.tsx";
import {TotalContext} from "./context/total-context.tsx";
import {API_URLS, TDataToSubmit, TSled} from "./types.ts";
import {toast, ToastContainer} from "react-toastify";
import Modal from "./components/Modal.tsx";

const initialState: TSled[] = Object.values(charityNames).map((name) => ({
    id: name, parent: "0", value: 0,
}));

function App() {
    const [sleds, setSleds] = useState<TSled[]>(initialState);
    const [total, setTotal] = useState<number>(0);
    const [successModalShown, setSuccessModalShown] = useState<boolean>(false);

    async function handleSubmit() {
        if (total < REQUIRED_DONATION_SUM) return toast.error(`Total must be ${REQUIRED_DONATION_SUM} Ft`);

        const data: TDataToSubmit = Object.values(charityNames).reduce((acc, curr) => ({
            ...acc, [curr]: sleds.find((sled) => sled.id === curr)?.value,
        }), {});

        const res = await axios.get("https://api.ipify.org?format=json");
        const {ip} = res.data;
        data.ip = ip;

        const API_URL = API_URLS[STAGE];

        try {
            const res = await axios.post(API_URL, {
                data,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status === 425 || res.status === 403) {
                throw new Error("You have already submitted");
            }

            if (!res.data) throw new Error("");

            if (res.status === 200) {
                return Promise.resolve();
            }


            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            console.log("Error", e);
        } finally {
            setSuccessModalShown(true);
        }

        setSleds(initialState);
        setTotal(0);
    }

    return (<div className="container">
        <ToastContainer autoClose={5000}/>
        <Modal onClose={() => setSuccessModalShown(false)} open={successModalShown} fitContent hideHeader>
            <h3>Köszönjük szavazatát!</h3>
            <button onClick={() => {
                window.open("https://nexon.hu", "_blank")?.focus()
                setSuccessModalShown(false);
            }}>Kezdőlap</button>
        </Modal>
        <div
            className="main"
            style={{
                backgroundImage: "url(/themes/custom/nexon/libraries/karacsony/build/bgImage.png)",
            }}
        >
            <div className="main__hero">
                <img src={"/assets/header.svg"} alt={"Nexon header"} style={{width: "100%"}}/>
            </div>
            <div className="main__content">
                <div className="main__content--wrapper">
                    <p className="fontMedium grayText">{MAIN_DESCRIPTION}</p>
                </div>
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
                                <button
                                    onClick={() => {
                                        setSleds(initialState);
                                        setTotal(0);
                                    }}
                                    disabled={total === 0}
                                    className="main__content-container-button-back fontExtraBold bottom-button"
                                >
                                    VISSZAÁLLÍTÁS
                                </button>
                                <button
                                    className="main__content-container-button-save fontExtraBold bottom-button"
                                    onClick={() => handleSubmit()}
                                    disabled={(() => {
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
