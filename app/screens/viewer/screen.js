import React from "react"
import { Text, View } from "react-native";
import { GlobalContext } from "../../GlobalState";


export function ViewerScreen({ navigation, route }){
    let { type, id } = route.params;

    return (
        <View>
            <GlobalContext.Consumer>
                {({state, update}) => {
                    let _class = state.timetableData.classes.find(e=>e.id == id);

                    return <View>
                        <Text>{_class.name}</Text>
                    </View>
                }}
            </GlobalContext.Consumer>
        </View>
    )
}