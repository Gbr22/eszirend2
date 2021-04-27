import { useLinkTo } from "@react-navigation/native";
import React from "react"
import { Platform, ScrollView, StatusBar, Text, TouchableWithoutFeedback, View } from "react-native";
import { TouchableFallback } from "../../components/TouchableFallback";
import { GlobalContext } from "../../GlobalState";
import { styles } from "../../styles";
import Day from "./day";
import Entry from "./entry";
import { Pager } from "../../components/Pager/PagerUniversal";
import { DayBar } from './dayBar';


export function ViewerScreen(props){
    const linkTo = useLinkTo();
    return <ViewerScreenClass {...props} linkTo={linkTo} />
}
export class ViewerScreenClass extends React.PureComponent {
    PagerRef = React.createRef();
    DayBarRef = React.createRef();
    render(){
        let { navigation, route, linkTo } = this.props;
        
        let { type, id } = route.params;
        
        let itemSpacing = styles.viewer.entry.spacing;
        let rowHeight = styles.viewer.row.height;
        let dayBarHeight = styles.viewer.dayBar.height;

        let initalDay = 0;

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
                        let filteredDays = state.timetableData.days.filter(e=>e.val != null)
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
                                    <Pager
                                        initialPage={initalDay}
                                        onPageSelected={(e)=>{
                                            let pos = e.nativeEvent.position;
                                            this.DayBarRef.current?.setIndex(pos);
                                        }}
                                        style={{
                                            flex: 1,
                                            width: "100%",
                                            height: "100%"
                                        }}
                                        ref={this.PagerRef}
                                    >
                                        { filteredDays.map(day=>{
                                            return (
                                                <View
                                                    key={day.val}
                                                    style={{
                                                        flex:1,
                                                        width: "100%",
                                                    }}
                                                >
                                                    <Day index={day.val} id={id} initalDay={initalDay} />
                                                </View>
                                            )
                                        }) }
                                    </Pager>
                                </View>
                                
                            </ScrollView>
                            <DayBar PagerRef={this.PagerRef} ref={this.DayBarRef} />
                        </View>
                        )
                    }}
                </GlobalContext.Consumer>
            </View>
        )
    }
}