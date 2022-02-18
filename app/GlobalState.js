import React from "react";
import { Platform } from "react-native";
import { DataRoot, Versions } from "../logic/objects.js";
import { getData, getStorage, getVersions, retrieveData, saveData, setStorage } from "./data";
import * as Network from 'expo-network';


export let initalGlobalState = {
    versions:null,
    timetableData:null,
    timetables:null,
    selectedVersionId:null,
};



var _update;
export function setUpdate(func){
    _update = func;
}
export function UpdateGlobalState(){
    _update(...arguments);
}
async function setVersion(id){
    let localData = await retrieveData(id);

    function handleNewData(json){
        let data = new DataRoot(json);
        UpdateGlobalState({
            timetableData: data,
            selectedVersionId:id
        });
        if (Platform.OS == "web"){
            console.log("data",data);
        } else {
            console.log("data",typeof data);
        }
    }

    if (localData != null){
        handleNewData(localData);
    }
    let online = (await Network.getNetworkStateAsync()).isConnected;
    if (online){
        getData(id).then(json=>{
            handleNewData(json);
            saveData(id,json);
        }).catch(err=>{
            console.warn(err);
            alert("Hiba: "+err.message);
        })
    }
}
async function processVersions(versionsJson){
    let versions = new Versions(versionsJson);
    console.log("versions",versions);
    let id = versions.currentId;
    setVersion(id);
    UpdateGlobalState({
        versions,
    });
}

export async function handleData(){
    let localVersions = await getStorage("versions");
    if (localVersions != null){
        processVersions(localVersions);
    }
    let online = (await Network.getNetworkStateAsync()).isConnected;
    console.log("online",online);
    if (online){
        console.log("Processing versions");
        getVersions().then(async versionsJson=>{
            processVersions(versionsJson);
            setStorage("versions",versionsJson);
        })
    }
}
handleData();


export const GlobalContext = React.createContext({state:initalGlobalState, update:()=>{}});