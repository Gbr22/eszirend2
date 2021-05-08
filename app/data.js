import { Platform } from "react-native";

let HOST = "";

export function getData(id){
    return fetch(HOST+"/api/data?id="+id).then(r=>r.json());
}
export function getVersions(){
    return fetch(HOST+"/api/versions").then(r=>r.json());
}