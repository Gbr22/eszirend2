import { useLinkTo } from "@react-navigation/native";
import React from "react"
import { Platform, ScrollView, StatusBar, Text, TouchableWithoutFeedback, View } from "react-native";
import { TouchableFallback } from "../../components/TouchableFallback";
import { GlobalContext } from "../../GlobalState";
import { styles } from "../../styles";
import Entry from "./entry";


export function ViewerScreen(props){
    const linkTo = useLinkTo();
    return <ViewerScreenClass {...props} linkTo={linkTo} />
}
export class ViewerScreenClass extends React.PureComponent {
    state={
        currentDayIndex:0,
    }

    render(){
        let { navigation, route, linkTo } = this.props;
        
        let { type, id } = route.params;

        let { currentDayIndex } = this.state;
        
        let itemSpacing = styles.viewerEntry.spacing;
        let rowHeight = 67;
        let dayBarHeight = 50;

        function getEntries(allentries,day,period, classId){
                
            let entries = allentries.filter(
                e=>e.lesson.classIds.includes(classId) &&
                day.matches(e.days) &&
                e.periods.includes(period.period)
            );
            entries.sort((a,b)=>{
                a = a.lesson.groups[0].id;
                b = b.lesson.groups[0].id;
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            });

            return entries;
        }

        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <GlobalContext.Consumer
                    style={{
                        flex: 1,
                    }}
                >
                    {({state, update}) => {
                        let _class = state.timetableData.classes.find(e=>e.id == id);
                        let currentDay = state.timetableData.days.find(e=>e.val == currentDayIndex);
                        return (
                        <View
                            style={{
                                flexDirection: "column",
                                flex: 1,
                                position: "relative",
                            }}
                        >
                            <ScrollView
                                style={{
                                    paddingTop: StatusBar.currentHeight,
                                    flex: 1,
                                    overflow: "hidden",
                                }}
                            >
                                <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            margin: 10,
                                            backgroundColor: "#EDEDED",
                                            width: 84.66,
                                            borderRadius: 10.33,
                                            overflow: "hidden",
                                        }}
                                    >
                                        <TouchableFallback
                                            onPress={()=>{
                                                linkTo("/");
                                            }}
                                        >
                                            <View
                                                style={{
                                                    paddingVertical: 3.66,
                                                    width: "100%",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        color: "#515151"
                                                    }}
                                                >{_class.name}</Text>
                                            </View>
                                        </TouchableFallback>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 30.33,
                                            marginBottom: dayBarHeight + (StatusBar.currentHeight || 0),
                                        }}
                                    >
                                        { state.timetableData.periods.map(period=>{
                                            return (
                                                <View key={period.id}
                                                    style={{
                                                        marginBottom: itemSpacing,
                                                        height: rowHeight,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 18.38,
                                                            color: "#2F2F2F",
                                                        }}
                                                    >{period.name}</Text>
                                                </View>
                                            )
                                        }) }
                                        
                                    </View>
                                    <View
                                        style={{
                                            flex:1,
                                        }}
                                    >
                                    { state.timetableData.periods.map((period,i)=>{
                                        let entries = getEntries(state.timetableData.entries,currentDay,period,id);

                                        return (
                                            <View
                                                key={period.id}
                                                style={{
                                                    marginBottom: itemSpacing,
                                                    marginRight: itemSpacing,
                                                    height: rowHeight,
                                                    flexDirection: "row",
                                                }}
                                            >
                                                { entries.map((entry,i)=>{
                                                    return <Entry key={`${entry.id}-${period.id}`} entry={entry} period={period} index={i} />;
                                                }) }
                                            </View>
                                        )
                                    }) }
                                    </View>
                                </View>
                                
                            </ScrollView>
                            <View
                                style={{
                                    flexDirection: "row",
                                    height: dayBarHeight,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    position: Platform.select({web:"fixed",default: "absolute"}),
                                    bottom: 0,
                                    width: "100%",
                                    backgroundColor: "#fff",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.30,
                                    shadowRadius: 4.65,
                                    elevation: 8
                                }}
                            >
                                {
                                    state.timetableData.days.filter(e=>e.val != null).map(day=>{
                                        let active = day.val == currentDayIndex;
                                        return (
                                            <View key={day.id}
                                                style={{
                                                    marginHorizontal: 31.16/2,
                                                    width: 35.33,
                                                    height: 35.33,
                                                }}
                                            >
                                                <TouchableWithoutFeedback
                                                    onPress={()=>{
                                                        this.setState({
                                                            currentDayIndex: day.val,
                                                        })
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            width: 30.33,
                                                            height: 30.33,
                                                            borderRadius: 30.33,
                                                            backgroundColor: active ? "#0074D921" : "transparent",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 15.16,
                                                                fontWeight: "bold",
                                                                color: active ? "#0074D9" : "#3C3C3C"
                                                            }}
                                                        >{day.shortName}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        )
                    }}
                </GlobalContext.Consumer>
            </View>
        )
    }
}