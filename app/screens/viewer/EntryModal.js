import React, { Fragment } from "react";
import { Modal, Text, TouchableWithoutFeedback, View } from "react-native";
import seedrandom from "seedrandom";



export class EntryModal extends React.PureComponent {

    state={
        data:null,
        visible:false,
    }

    open(data){
        this.setState({
            data,
            visible:true,
        })
    }
    close(){
        this.setState({
            visible: false,
        })
    }

    render(){
        let entry = null;
        let period = null;
        if (this.state.data){
            entry = this.state.data.entry;
            period = this.state.data.period;
        }

        return (
            <Fragment>
                { this.state.visible && <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.visible && this.state.data != null}
                    onRequestClose={() => {
                      this.close();
                    }}
                >
                    <TouchableWithoutFeedback
                        onPress={()=>{
                            this.close();  
                        }}
                    >
                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            position: "relative",
                        }}
                    >
                    {
                        this.state.data != null ?
                        (
                                <TouchableWithoutFeedback>
                                <View
                                    style={{
                                        backgroundColor: entry.getCustomColor(seedrandom) || "white",
                                        padding: 18.66,
                                        width: "100%",
                                        maxWidth: 266.66,
                                        flexDirection: "column",
                                        borderRadius: 17.66,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.18,
                                        shadowRadius: 1.00,
                                        
                                        elevation: 1,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 19,
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        {entry.lesson.subject.name}
                                    </Text>
                                    <View
                                        style={{
                                            marginVertical: 12.33,
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 21.33,
                                                fontWeight: "bold",
                                                marginRight: 11.16,
                                            }}
                                        >
                                            {
                                                entry.periods.length > 1 ?
                                                `${entry.periodObjects[0].name}-${entry.periodObjects[entry.periodObjects.length-1].name}` :
                                                entry.periodObjects[0].name
                                            }
                                        </Text>
                                        <View>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                }}
                                            >{`${entry.periodObjects[0].startTime}-${entry.periodObjects[entry.periodObjects.length-1].endTime}`}</Text>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    opacity: 0.75
                                                }}
                                            >{entry.classrooms.map(e=>e.shortName).join(", ")}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        {
                                            [
                                                ["Tanár", entry.lesson.teachers.map(e=>e.name).join(", ")],
                                                ["Tanterem", entry.classrooms.map(e=>e.name).join(", ")],
                                                ["Csoport", entry.lesson.formatGroups({shorten:false})],
                                                ["Hét", entry.week.name],
                                            ].map(([key,value])=>{
                                                return (
                                                    <View
                                                        key={key}
                                                        style={{
                                                            flexDirection: "row",
                                                        }}
                                                    >
                                                        <Text style={{fontSize: 14}}><Text style={{fontWeight: "bold"}}>{key}</Text>: {value}</Text>
                                                    </View>
                                                );
                                            })
                                        }
                                    </View>
                                </View>
                                </TouchableWithoutFeedback>
                        ) : null
                    }
                    </View>
                    </TouchableWithoutFeedback>
                    
                </Modal> }
            </Fragment>
        )
    }
}