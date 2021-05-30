import React from "react";
import { Platform } from "react-native";
import { DataRoot, Versions } from "../logic/objects.js";
import { getData, getVersions, retrieveData, saveData } from "./data";

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
getVersions().then(async versionsJson=>{
    let versions = new Versions(versionsJson);
    let id = versions.currentId;
    /* let localData = await retrieveData(id); */
    let localData = null;
    // Turn off local data as the service worker handles serving the api offline for now.

    function handleNewData(json){
        let data = new DataRoot(json);
        UpdateGlobalState({
            timetableData: data,
            versions,
        })
        if (Platform.OS == "web"){
            console.log("data",data);
        }
    }

    if (localData != null){
        handleNewData(localData);
    }
    getData(id).then(json=>{
        handleNewData(json);
        saveData(id,json);
    })
})


export const GlobalContext = React.createContext({state:initalGlobalState, update:()=>{}});