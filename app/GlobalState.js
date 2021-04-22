import React from "react";
import { DataRoot } from "../logic/objects.js";
import { getData } from "./data";

export let initalGlobalState = {
    timetableData:null,
    timetables:null,
};

var _update;
export function setUpdate(func){
    _update = func;
}
export function UpdateGlobalState(){
    _update(...arguments);
}

getData().then(json=>{
    UpdateGlobalState({
        timetableData: new DataRoot(json),
    })
})

export const GlobalContext = React.createContext({state:initalGlobalState, update:()=>{}});