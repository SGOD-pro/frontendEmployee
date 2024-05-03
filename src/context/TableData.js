import { createContext, useContext } from "react";

export const DataContext = createContext({
    empTableData: [{
        _id: "",
        first_Name: "",
        middle_Name: "",
        last_Name: "",
        empId: "",
        gender: "",
        date_of_joining: "",
        department: "",
        designation: ""
    }],
    pushNewData: (obj) => { },
    popEmp: (obj) => { },

    shiftTableData: [{
        _id: "",
        shiftName: "",
        startTime: "",
        endTime: "",
        entryGP: "",
        exitGP: "",
        empCount: "",
    }],
    pushShiftTableData: (obj) => { },
    popShiftTableData: (id) => { },
    fiterTableData: (obj) => { }
})

export const DataContextProvider = DataContext.Provider

export function useEmpData() {
    return useContext(DataContext)
}