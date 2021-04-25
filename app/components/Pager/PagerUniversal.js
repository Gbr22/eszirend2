import React from "react";
import { Platform } from "react-native"

let _Pager = null;
if (Platform.OS == "web"){
    _Pager = require("./Pager.web").Pager;
} else {
    _Pager = require("./Pager.native").Pager;
}
export const Pager = React.forwardRef((props,ref)=>{
    return <_Pager {...props} ref={ref}>{props.children}</_Pager>
})