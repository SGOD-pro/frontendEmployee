import { useContext, createContext } from "react";

export const TimeAtt = createContext({
    Shieft: {},
    putShieft: (obj) => { }
})

export const TimeAttProvider = TimeAtt.Provider
export function useTimeAtt() {
    return useContext(TimeAtt);
}
