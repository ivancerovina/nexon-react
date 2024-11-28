import { createContext } from "react";
import { TTotalContext } from "../types";

export const TotalContext = createContext<TTotalContext>({
    total: 0,
    // @ts-expect-error unused var
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTotal: (total) => {},
});
