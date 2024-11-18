export type TSled = {
    id: string;
    parent: string;
    value: number;
};

export type TCharityProps = {
    image: string;
    title: string;
    link: string;
    id: string;
    parent: string;
    value: number;
    sliderKnob: string;
};

export type TDraggableProps = {
    id: string;
    src: string;
    // children: React.ReactNode;
};

export type TDroppableProps = {
    id: string;
    children: React.ReactNode;
    className?: string;
};

export type TSledContext = {
    sleds: TSled[];
    setSleds: (sleds: TSled[]) => void;
};

export type TTotalContext = {
    total: number;
    setTotal: (total: number) => void;
};

export type TDataToSubmit = Record<string, number> & { ip?: string };

export const API_URL_DEVELOPMENT = "https://nexon.dev.studiopresent.cloud/giveaway";
export const API_URL_STAGING = "https://nexon.stage.studiopresent.cloud/giveaway";
export const API_URL_PRODUCTION = "https://nexon.hu/giveaway";
