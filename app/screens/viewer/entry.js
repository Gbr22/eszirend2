import React from "react"
import { Platform, Text, View } from "react-native"
import { TouchableFallback } from "../../components/TouchableFallback"
import { styles } from "../../styles";
import seedrandom from "seedrandom";

export default function Entry({entry, period, index, width, height, ModalRef}){
    let textStyle = {
        fontSize: 14,
        color: "#000000",
    }

    function getColorForEntry(entry){
        return entry.getCustomColor(seedrandom);
    }
    
    if (entry == null || period?.id != entry?.period){
        return (
        <View
            pointerEvents="none"
            style={{
                flex: 1*width,
                marginLeft: index == 0 ? 0: styles.viewer.entry.spacing,
            }}
        >

        </View>
        );
    }
    if (period.id == entry.period){
        height = entry.periods.length;
    }
    
    return (
        <View
            style={{
                flex: 1*width,
                marginLeft: index == 0 ? 0: styles.viewer.entry.spacing,
                
                overflow: "visible",
                position: "relative",
                height: styles.viewer.row.height,
            }}
        >
            <View
                style={{
                    width: "100%",
                    height: (styles.viewer.row.height) * height + styles.viewer.entry.spacing * (height-1),
                    borderRadius: 8.66,
                    position: "absolute",
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
                        console.log(entry,width,height,period);
                    }
                    ModalRef.current.open({entry,period});
                }}
            >
                <View
                    style={{
                        backgroundColor: getColorForEntry(entry) || "#EDEDED",
                        width: "100%",
                        height: "100%",
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
                                /* justifyContent: "space-between", */
                                height: 16.33,
                            }}
                        >
                            <Text style={textStyle} numberOfLines={1}>{ entry.classrooms.map(e=>e.shortName).join(", ") }</Text>
                            <View style={{flex:1}}></View>
                            { entry.lesson.groups[0].entireClass == false && <Text style={textStyle} numberOfLines={1}>{ entry.lesson.formatGroups({shorten:true}) }</Text> }
                            {
                                entry.week.type != "all" &&
                                <View
                                    style={{
                                        marginLeft: 7,
                                        backgroundColor: "rgba(0,0,0,0.25)",
                                        paddingHorizontal: 8,
                                        paddingVertical: 1,
                                        borderRadius: 5
                                    }}
                                >
                                    <Text
                                        style={{...textStyle,...{
                                            color: "white",
                                            fontWeight: "bold"
                                        }}}
                                        numberOfLines={1}>{ entry.week.shortName }
                                    </Text> 
                                </View>
                            }
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
                </View>
            </TouchableFallback>
            </View>
        </View>
    )
}