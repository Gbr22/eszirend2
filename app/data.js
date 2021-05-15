import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

let HOST = "";

export function getData(id){
    return fetch(HOST+"/api/data?id="+id).then(r=>r.json());
}
export function getVersions(){
    return fetch(HOST+"/api/versions").then(r=>r.json());
}

export async function saveData(id,data){
    await AsyncStorage.setItem(`data/${id}`,JSON.stringify(data));
}
export async function retrieveData(id){
    let item = await AsyncStorage.getItem(`data/${id}`);
    return item == null ? null : JSON.parse(item);
}