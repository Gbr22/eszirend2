import React from "react";
import { Platform } from "react-native";
import { DataRoot, Versions } from "../logic/objects.js";
import { getData, getStorage, getVersions, retrieveData, saveData, setStorage } from "./data";

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

async function processVersions(versionsJson){
    let versions = new Versions(versionsJson);
    let id = versions.currentId;
    let localData = await retrieveData(id);

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
    if (navigator.onLine){
        getData(id).then(json=>{
            handleNewData(json);
            saveData(id,json);
        })
    }
}

async function handleData(){
    let localVersions = await getStorage("versions");
    if (localVersions != null){
        processVersions(localVersions);
    }
    if (navigator.onLine){
        getVersions().then(async versionsJson=>{
            processVersions(versionsJson);
            setStorage("versions",versionsJson);
        })
    }
}
handleData();



export const GlobalContext = React.createContext({state:initalGlobalState, update:()=>{}});