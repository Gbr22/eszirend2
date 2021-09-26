import React, { Fragment } from "react";
import { Platform, Text, View } from "react-native";
import { GlobalContext } from "../../GlobalState";
import { styles } from "../../styles";
import Entry from "./entry";

export default class Day extends React.PureComponent {
    state={
        visible:this.isVisible(),
    }

    isVisible(){
        let {index, initalDay} = this.props;
        return index == initalDay;
    }
    
    componentDidMount(){
        if (!this.isVisible()) {
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

        return (
            <View
                style={{
                    flex:1,
                    width: "100%",
                }}
            >
            { this.state.visible && <GlobalContext.Consumer
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
                                let filter = entries.filter(e=>e.lesson.groups.filter(g=>g.id == groupId).length > 0);
                                if (filter.length > 0){
                                    return filter;
                                }
                                return null;
                            }).flat();
                            entries = entries.map(e=>{
                                return {
                                    entry:e,
                                    width: 1,
                                    height: 1,
                                }
                            })
                            /* entries.forEach((e,i)=>{
                                while (e.entry && entries.filter(fl=>fl.entry?.id == e.entry?.id).length > 1){
                                    entries.filter(fl=>fl.entry?.id == e.entry?.id).forEach(e=>{
                                        e.width++;
                                    })
                                    entries.splice(i,1);
                                }
                            }) */
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
                        { rows.map(({period,entries, emptyBefore}, index)=>{
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
                                        zIndex: Platform.select({web:100-index, default: undefined}),
                                    }}
                                >
                                    { entries.map(({entry,width,height},i)=>{
                                        return <Entry key={`${entry?.id}-${period?.id}-${i}`} entry={entry} width={width} height={height} period={period} index={i} ModalRef={this.props.ModalRef} />;
                                    }) }
                                </View>
                            )
                        }) }
                    </Fragment>
                }}
            </GlobalContext.Consumer> }
            </View>
        );
    }
}