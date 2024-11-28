import { createContext } from "react";
import { TSledContext } from "../types.ts";

export const SledContext = createContext<TSledContext>({
    sleds: [],
    // @ts-expect-error unused var
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSleds: (sleds) => {},
});
