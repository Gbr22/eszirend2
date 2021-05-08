import React from "react";
import { Platform } from "react-native";
import { DataRoot, Versions } from "../logic/objects.js";
import { getData, getVersions } from "./data";

export let initalGlobalState = {
    versions:null,
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
getVersions().then(versionsJson=>{
    let versions = new Versions(versionsJson);
    getData(versions.currentId).then(json=>{
        let data = new DataRoot(json);
        UpdateGlobalState({
            timetableData: data,
            versions,
        })
        if (Platform.OS == "web"){
            console.log("data",data);
        }
    })
})


export const GlobalContext = React.createContext({state:initalGlobalState, update:()=>{}});