import React, { Fragment } from "react";
import { Platform, Text, TouchableWithoutFeedback, View } from "react-native";
import { GlobalContext } from "../../GlobalState";
import { styles } from "../../styles";

export class DayBar extends React.PureComponent {
    state={
        currentDayIndex:0,
    }
    setIndex(index){
        this.setState({
            currentDayIndex:index,
        })
    }
    render(){
        let { PagerRef } = this.props;
        return (<Fragment><GlobalContext.Consumer
            style={{
                flex: 1,
            }}
        >
            {({state, update}) => {
                let filteredDays = state.timetableData.days.filter(e=>e.val != null)
                return (<View
                    style={{
                        flexDirection: "row",
                        height: styles.viewer.dayBar.height,
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
                        filteredDays.map(day=>{
                            let active = day.val == this.state.currentDayIndex;
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
                                            PagerRef.current.setPageWithoutAnimation(day.val);
                                            /* this.setState({
                                                currentDayIndex: day.val,
                                            }) */
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
                </View>);
            }}
        </GlobalContext.Consumer></Fragment>);
    }
}