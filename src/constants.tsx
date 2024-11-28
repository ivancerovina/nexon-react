import {
    POPUP_AUTIZMUS_CONTENT,
    POPUP_LAMPAS_CONTENT,
    POPUP_NOE_CONTENT,
    POPUP_SZENTISTVANZENE_CONTENT,
} from "./popup_contents";

type TCharityContent = { [key: string]: string };

type TCharityPopupContent = { [key: string]: JSX.Element };

export const charityNames = {
    autizmus: "autizmus", lampas92: "lampas92", noe: "noe", szentistvanzene: "szentistvanzene",
};

export const MAIN_DESCRIPTION = "A csúszkán minden beosztás 400 000 forintot jelent. Húzza az ajándékokat aszerint, ahogyan Ön osztaná el az adományt az alapítványok között. A kiválasztott arányokat végül egyesítjük, s ennek megfelelően osztjuk szét a felajánlott összeget a négy szervezet között. Miután végzett, az „Elküldöm” gombra kattintva véglegesítse döntését."

export const CharityLinks: TCharityContent = {
    szentistvanzene: "https://www.szentistvanzene.hu/",
    noe: "http://www.noeallatotthon.hu/",
    autizmus: "https://www.autizmus.hu/",
    lampas92: "https://www.lampas92.hu/",
};

export const CharityTitles: TCharityContent = {
    szentistvanzene: "Szent István Király Zenei Alapítvány",
    autizmus: "Autizmus Alapítvány",
    noe: "NOÉ ÁLLATOTTHON KÖZHASZNÚ ALAPÍTVÁNY",
    lampas92: "Lámpás ’92 Közhasznú Alapítvány",
};

export const CharityImages: TCharityContent = {
    autizmus: "/assets/snow-bg/snow-1.svg",
    lampas92: "/assets/snow-bg/snow-2.svg",
    noe: "/assets/snow-bg/snow-1.svg",
    szentistvanzene: "/assets/snow-bg/snow-2.svg",
};

export const CharityPopupTexts: TCharityPopupContent = {
    autizmus: <POPUP_AUTIZMUS_CONTENT/>,
    lampas92: <POPUP_LAMPAS_CONTENT/>,
    noe: <POPUP_NOE_CONTENT/>,
    szentistvanzene: <POPUP_SZENTISTVANZENE_CONTENT/>,
};

export const CharityKnobs: { [key: string]: string } = {
    autizmus: "/assets/slider/slider-1.svg",
    lampas92: "/assets/slider/slider-2.svg",
    noe: "/assets/slider/slider-3.svg",
    szentistvanzene: "/assets/slider/slider-4.svg",
};

export const LandingText = `A szánkópályán minden beosztás 250 ezer forintot jelent. Húzza a szánkókat aszerint, ahogyan Ön osztaná el a NEXON 3 millió forint összegű adományát az alapítványok között. A kiválasztott arányokat végül egyesítjük, s ennek megfelelően osztjuk szét a felajánlott összeget a négy szervezet között. Az információs gombra kattintva megtudhatja, milyen célra kéri az alapítvány az idei támogatást.
Miután végzett, az "Elküldöm" gombra kattintva véglegesítse döntését.`;

export const SuccessText = `Köszönjük, hogy részt vett a szavazáson! A szavazatokat
                        összesítjük, s a felajánlott összeget az arányoknak
                        megfelelöen osztjuk szét a négy szervezet között.
                        Az eredményröl e-mailben értesítjük.`;

export const PRODUCTION_PATH = "/themes/custom/nexon/libraries/karacsony/build";

export const REQUIRED_DONATION_SUM = 4_000_000;
export const TOTAL_STEPS = 10 + 1;
export const STEP = REQUIRED_DONATION_SUM / 10;

const STAGE_URLS = {
    alt: "localhost",
    dev: "https://nexon.dev.studiopresent.cloud",
    stage: "https://nexon.stage.studiopresent.cloud",
    prod: "https://nexon.hu",
}

function getStage() {
    const url = window.location.href;

    for (const key in STAGE_URLS) {
        if (url.includes(STAGE_URLS[key])) {
            return key as "alt" | "dev" | "stage" | "prod";
        }
    }

    return "alt";
}

export const STAGE = getStage();