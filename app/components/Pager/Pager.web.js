import React from "react";
import { ScrollView, View } from "react-native";



export class Pager extends React.PureComponent {
    setPageWithoutAnimation(index){
        this.scrollViewRef.current.scrollTo({
            x:this.containerRef.current.offsetWidth*index,
            animated: false,
        });
    }
    containerRef = React.createRef();
    scrollViewRef = React.createRef();
    childrenRefs = [];

    onresize(){
        
    };
    componentDidMount(){
        this.onresize = ()=>{
            let width = this.containerRef?.current.offsetWidth;
            this.childrenRefs.forEach(ref=>{
                ref.current.style.width = width+"px";
            })
        }
        window.addEventListener("resize",this.onresize);
        this.onresize();
        this.setPageWithoutAnimation(this.props.initialPage || 0);
    }
    componentWillUnmount(){
        window.removeEventListener("resize",this.onresize);
    }
    scrollPage = 0;
    render(){
        let {children, style, onPageSelected} = this.props;
        this.childrenRefs = children.map(()=>React.createRef());
        return (
            <View style={style} ref={this.containerRef}>
                <ScrollView
                    ref={this.scrollViewRef}
                    horizontal
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        scrollSnapType: "x mandatory",
                    }}
                    scrollEventThrottle={0}
                    onScroll={()=>{
                        let el = this.scrollViewRef.current.getScrollableNode();
                        let page = Math.round(el.scrollLeft/el.offsetWidth);
                        if (page != this.scrollPage){
                            this.scrollPage = page;
                            onPageSelected({
                                nativeEvent:{
                                    position:page,
                                }
                            });
                        }
                        
                    }}
                >
                    {children.map((child,i)=>{
                        return (
                            <View
                                ref={this.childrenRefs[i]}
                                key={child.key}
                                data-x-child="true"
                                style={{
                                    flex:1,
                                    scrollSnapAlign: "center",
                                }}
                            >
                                {child}
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
}