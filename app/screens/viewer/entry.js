import React from "react"
import { Platform, Text, View } from "react-native"
import { TouchableFallback } from "../../components/TouchableFallback"
import { styles } from "../../styles";
import seedrandom from "seedrandom";

export default function Entry({entry, period, index, width, height}){
    let textStyle = {
        fontSize: 14,
        color: "#000000",
    }

    function getColorForEntry(entry){
        let map = {
            "Csoport1":"hsl(210, 100%, 66%)",
            "Csoport2":"hsl(0, 100%, 66%)",
            "Környezetvédelem":"hsl(156, 100%, 66%)",
            "Informatika":"hsl(204, 100%, 66%)",
            "Közgazdaság":"#F7AD94",
            "Ügyvitel":"#a1e3a1",
            "Pénzügy":"#7FDBFF",
            "Mechatronika":"hsl(180, 20%, 66%)",
        }
        let aliases = {
            "Csoport-1":"Csoport1",
            "Csoport-2":"Csoport2",
            "Csoprot-2":"Csoport2",
        };
        for(let key in aliases){
            map[key] = map[aliases[key]];
        }
        let groupName = entry.lesson.groups[0].name;

        if (entry.lesson.groups[0].entireClass){
            return null;
        } else if (map[groupName]) {
            return map[groupName];
        } else {
            return `hsl(${Math.floor(seedrandom(entry.lesson.groups[0].id)()*300)}, 100%, 75%)`;
            /* return entry.lesson.groups[0].color; */
        }
        
    }
    function shortenGroupName(name){
        let obj = {
            "Angol":"Ang",
            "Német":"Ném",
            "Környezetvédelem":"♻️",
            "Informatika":"🖱️",
            "Mechatronika":"🛠️",
            "Ügyvitel":"Ügyv",
            "Közgazdaság":"Közg",
        };
        for (let p in obj){
            name = name.replace(p,obj[p]);
        }
        return name;
    }
    if (entry == null){
        return (
        <View
            style={{
                flex: 1*width,
                marginLeft: index == 0 ? 0: styles.viewer.entry.spacing,
            }}
        >

        </View>
        );
    }
    return (
        <View
            style={{
                flex: 1*width,
                marginLeft: index == 0 ? 0: styles.viewer.entry.spacing,
                backgroundColor: getColorForEntry(entry) || "#EDEDED",
                borderRadius: 8.66,
                overflow: "hidden",
            }}
        >
            <TouchableFallback
                style={{
                    width: "100%",
                    height: "100%",
                }}
                onPress={()=>{
                    if(Platform.OS == "web"){
                        console.log(entry,width,height);
                    }
                }}
            >
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "space-between",
                        padding: 7,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: 16.33,
                        }}
                    >
                        <Text style={textStyle} numberOfLines={1}>{ entry.classrooms.map(e=>e.shortName).join(", ") }</Text>
                        { entry.lesson.groups[0].entireClass == false && <Text style={textStyle} numberOfLines={1}>{ [...new Set(entry.lesson.groups.map(e=>shortenGroupName(e.name)))].join(", ") }</Text> }
                    </View>
                    <View
                        style={{
                            alignItems: "center",
                            height: 16.33,
                        }}
                    ><Text styles={[textStyle]}
                        numberOfLines={1}
                    >{ entry.lesson.subject.name }</Text></View>
                    <View
                        style={{
                            alignItems: "flex-end",
                            height: 16.33,
                        }}
                    ><Text style={textStyle}
                        numberOfLines={1}
                    >{ entry.lesson.teachers.map(e=>e.name).join(", ") }</Text></View>
                    
                </View>
            </TouchableFallback>
        </View>
    )
}