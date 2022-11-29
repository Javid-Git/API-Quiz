import React, {useEffect} from "react";
import {QuestionLoop} from "./QuestionLoop";
import {createAPIEndpoint, ENDPOINTS} from "../../api";
import '../../css/table.scss'

export function ManageQuestions(){
    const[qns, setQns] = React.useState([])

    useEffect(()=>{
        createAPIEndpoint(ENDPOINTS.question)
            .fetch()
            .then(res=> {
                setQns(res.data)
            })
            .catch(err=>console.log(err))
    },[])
    const questions = qns.map(old=>{
        return(
            <QuestionLoop key={`${old.qtext}${old.id}`} questions = {old}/>
        )
    })

    return(
        <div>
            <table className="fold-table">
                <thead>
                <tr>
                    <th>Question</th>
                    <th>State</th>
                    <th>Settings</th>
                </tr>
                </thead>
                {questions}
            </table>
        </div>
    )
}