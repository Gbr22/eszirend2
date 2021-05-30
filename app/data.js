import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

let HOST = "";
if (__DEV__ && Platform.OS == "android"){
    HOST = "http://192.168.0.101:8888";
} else if (Platform.OS == "android"){
    HOST = "https://eszirend.kess.hu";
}

export function getData(id){
    return fetch(HOST+"/api/data?id="+id).then(r=>r.json());
}
export function getVersions(){
    return fetch(HOST+"/api/versions").then(r=>r.json());
}

export async function getStorage(id){
    let data = await AsyncStorage.getItem(id);
    if (data == null){
        return null;
    }
    try {
        return JSON.parse(data);
    } catch(err){
        return null;
    }
}
export async function setStorage(id,data){
    await AsyncStorage.setItem(id,JSON.stringify(data));
}
export async function saveData(id,data){
    return setStorage(`data/${id}`,data);
}
export async function retrieveData(id){
    return getStorage(`data/${id}`);
}