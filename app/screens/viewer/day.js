import React, { Fragment } from "react";
import { Text, View } from "react-native";
import { GlobalContext } from "../../GlobalState";
import { styles } from "../../styles";
import Entry from "./entry";

export default class Day extends React.PureComponent {
    state={
        visible:false,
    }
    componentDidMount(){
        let {index, initalDay} = this.props;
        if (index == initalDay){
            this.setState({visible:true});
        } else {
            setTimeout(()=>{
                this.setState({visible:true});
            },0);
        }
    }
    render(){
        let {index, id, initalDay} = this.props;
        let itemSpacing = styles.viewer.entry.spacing;
        let rowHeight = styles.viewer.row.height;
        let dayBarHeight = styles.viewer.dayBar.height;
        let currentDayIndex = index;
        
        function getEntries(allentries,day,period, classId){
                    
            let entries = allentries.filter(
                e=>e.lesson.classIds.includes(classId) &&
                day.matches(e.days) &&
                e.periods.includes(period.period)
            );

            return entries;
        }

        if (!this.state.visible){
            return <Fragment></Fragment>;
        }

        return (
            <View
                style={{
                    flex:1,
                    width: "100%",
                }}
            >
            <GlobalContext.Consumer
                style={{
                    flex:1,
                }}
            >
                {({state, update}) => {
                    let day = state.timetableData.days.find(e=>e.val == currentDayIndex);
                    
                    let rows = state.timetableData.periods.map((period,i)=>{
                        let entries = getEntries(state.timetableData.entries,day,period,id);
                        if (entries.length > 0){
                            let division = entries[0].lesson.groups[0].division;
                            let newlist = division.groupIds;
                            entries = newlist.map(groupId=>{
                                return entries.find(e=>e.lesson.groups.filter(g=>g.id == groupId).length > 0) || null;
                            })
                        }
                        
                        return {
                            period,
                            entries,
                            emptyBefore:0,
                        };
                    });
                    let emptyRows = 0;
                    rows.forEach(row=>{
                        if (row.entries.length == 0){
                            emptyRows++;
                        } else {
                            row.emptyBefore = emptyRows;
                            emptyRows = 0;
                        }
                    })

                    return <Fragment>
                        { rows.map(({period,entries, emptyBefore})=>{
                            if (entries.length == 0){
                                return null;
                            }
                            return (
                                <View
                                    key={period.id}
                                    style={{
                                        marginTop: emptyBefore * (rowHeight + itemSpacing),
                                        marginBottom: itemSpacing,
                                        marginRight: itemSpacing,
                                        height: rowHeight,
                                        flexDirection: "row",
                                    }}
                                >
                                    { entries.map((entry,i)=>{
                                        return <Entry key={`${entry?.id}-${period?.id}-${i}`} entry={entry} period={period} index={i} />;
                                    }) }
                                </View>
                            )
                        }) }
                    </Fragment>
                }}
            </GlobalContext.Consumer>
            </View>
        );
    }
}