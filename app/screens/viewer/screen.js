import { useLinkTo } from "@react-navigation/native";
import React from "react"
import { Modal, Platform, ScrollView, StatusBar, Text, TouchableWithoutFeedback, View } from "react-native";
import { TouchableFallback } from "../../components/TouchableFallback";
import { GlobalContext } from "../../GlobalState";
import { styles } from "../../styles";
import Day from "./day";
import Entry from "./entry";
import { Pager } from "../../components/Pager/PagerUniversal";
import { DayBar } from './dayBar';
import { EntryModal } from "./EntryModal";


export function ViewerScreen(props){
    const linkTo = useLinkTo();
    return <ViewerScreenClass {...props} linkTo={linkTo} />
}
export class ViewerScreenClass extends React.PureComponent {
    PagerRef = React.createRef();
    DayBarRef = React.createRef();
    ModalRef = React.createRef();
    ScrollContainer = React.createRef();

    scrollTop = 0;
    firstSwipe = true;
    firstScroll = true;

    initalDay = 0;

    fixScrollJump(){
        if (Platform.OS == "android"){
            let scrollTop = 73;
            this.ScrollContainer.current?.scrollToEnd({animated:false});
            this.PagerRef.current?.setPageWithoutAnimation(1);
            this.PagerRef.current?.setPageWithoutAnimation(this.initalDay);
            this.ScrollContainer.current?.scrollTo({x:0,y:scrollTop, animated:false})
        }
    }


    render(){
        let { navigation, route, linkTo } = this.props;
        
        let { type, id } = route.params;
        
        let itemSpacing = styles.viewer.entry.spacing;
        let rowHeight = styles.viewer.row.height;
        let dayBarHeight = styles.viewer.dayBar.height;

        let that = this;

        

        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <EntryModal ref={this.ModalRef} />
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
                                ref={this.ScrollContainer}
                                style={{
                                    paddingTop: StatusBar.currentHeight,
                                    flex: 1,
                                    overflow: "hidden",
                                }}
                                
                                
                                
                                onScroll={(e)=>{
                                    that.scrollTop = e.nativeEvent.contentOffset.y;
                                    
                                    /* console.log(that.scrollTop); */
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
                                        initialPage={this.initalDay}
                                        onMounted={()=>{
                                            this.fixScrollJump();
                                        }}
                                        
                                        onPageSelected={(e)=>{
                                            let pos = e.nativeEvent.position;
                                            this.DayBarRef.current?.setIndex(pos);


                                            if (that.firstSwipe){
                                                that.fixScrollJump();
                                                that.firstSwipe = false;
                                            }
                                            
                                            
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
                                                    collapsable={false}
                                                >
                                                    <Day index={day.val} id={id} initalDay={this.initalDay} ModalRef={this.ModalRef} />
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