import React from "react";
import { Platform } from "react-native";
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
    let data = new DataRoot(json);
    UpdateGlobalState({
        timetableData: data,
    })
    if (Platform.OS == "web"){
        console.log("data",data);
    }
})

export const GlobalContext = React.createContext({state:initalGlobalState, update:()=>{}});