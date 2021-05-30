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

export async function saveData(id,data){
    await AsyncStorage.setItem(`data/${id}`,JSON.stringify(data));
}
export async function retrieveData(id){
    let item = await AsyncStorage.getItem(`data/${id}`);
    return item == null ? null : JSON.parse(item);
}