import React from "react";
import {Options} from "./Options";

export function Question(props){
    const opts = props.question.qoptions.map(opt=>{
        return(
            <Options key={`${opt.qoption}${opt.id}`} opt = {opt} />
        )
    })
    if (props.length !== 0){
        return(
            <div>
                <div>{props.question.qtext}</div>
                {opts}
            </div>
        )
    }

}