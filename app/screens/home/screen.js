import { useLinkTo } from "@react-navigation/native";
import React from "react";
import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import seedrandom from "seedrandom";
import { TouchableFallback } from "../../components/TouchableFallback";
import { GlobalContext } from "../../GlobalState";
import '@expo/match-media'
import { useMediaQuery } from "react-responsive";

export function HomeScreen({ navigation }){
    const linkTo = useLinkTo();
    const isBigScreen = useMediaQuery({    
        minWidth: 500
    });
    return (
        <GlobalContext.Consumer>
            {({state, update}) => {
              return <ScrollView
                style={{
                    width:"100%",
                    height:"100%",
                    paddingTop: StatusBar.currentHeight,
                    boxSizing: "border-box",
                }}
              >
                <View
                    style={{
                        margin: 20.66,
                        borderRadius: 10.33,
                        overflow: "hidden",
                    }}
                >
                    <TouchableFallback>
                        <View
                            style={{
                                
                                height: 36.33,
                                backgroundColor: "#EDEDED",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "#515151",
                                    fontSize: 16
                                }}
                            >{state.timetableData.info.headerText}</Text>
                        </View>
                    </TouchableFallback>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        paddingHorizontal: isBigScreen ? 20.66/2 : 20.66,
                        justifyContent: isBigScreen ? "center" : "space-between",
                    }}
                >
                    { state.timetableData.classes.map((_class,i)=>{
                        return (
                            
                            <View
                                key={_class.id}
                                style={{
                                    width: 87.33,
                                    height: 87.33,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 13.66,
                                    borderWidth: 2,
                                    borderColor: "#ECECEC",
                                    overflow: "hidden",
                                    marginBottom: 20.66,
                                    marginHorizontal: isBigScreen ? 20.66/2 : 0,
                                }}
                            >
                                <TouchableFallback
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    onPress={()=>{
                                        linkTo("/timetable/class/"+(_class.id))
                                    }}
                                >
                                    <View
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <View
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    borderRadius: 49,
                                                    backgroundColor: `hsl(${Math.floor(seedrandom(_class.id)()*360)}, 100%, 88%)`,
                                                    width: 49,
                                                    height: 49,
                                                }}
                                            >
                                                
                                            </View>
                                        </View>
                                        <Text
                                            style={{
                                                fontSize: 18.38,
                                                color: "#000000A6",
                                                fontWeight: "bold",
                                                zIndex: 1,
                                            }}
                                            numberOfLines={1}
                                        >{ _class.shortName || _class.name }</Text>
                                    </View>
                                </TouchableFallback>    
                            </View>
                            
                        );
                    }) }
                </View>
                <View
                    style={{
                        height: Platform.select({web: 0, default: 20.66}),
                        width: "100%",
                    }}
                ></View>
              </ScrollView>
            }}
          </GlobalContext.Consumer>
    );
}