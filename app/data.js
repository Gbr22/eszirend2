import { Platform } from "react-native";

let HOST = "";

export function getData(){
    return fetch(HOST+"/api/data").then(r=>r.json());
}