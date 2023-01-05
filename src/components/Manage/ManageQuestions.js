import React, {useEffect} from "react";
import {QuestionLoop} from "./QuestionLoop";
import {createAPIEndpoint, ENDPOINTS} from "../../api";
import '../../css/table.scss'

export function ManageQuestions(){
    const [option, setOption] = React.useState([]);

    useEffect(()=>{

        createAPIEndpoint(ENDPOINTS.option)
            .fetch()
            .catch(err=> {console.log(err)})
            .then(res=>{
                setOption(res.data)
            })
    }, [])
    const[qns, setQns] = React.useState([])

    useEffect(()=>{
        createAPIEndpoint(ENDPOINTS.question)
            .fetch()
            .then(res=> {
                setQns(res.data)
                console.log(res.data)

            })
            .catch(err=>console.log(err))
    },[])
    // const questions = qns.map(old=>{
    //     return(
    //         <QuestionLoop key={`${old.qtext}${old.id}`} questions = {old}/>
    //     )
    // })

    return(

        qns && option &&
        <div>

            <table className="fold-table">
                <thead>
                <tr>
                    <th>Question</th>
                    <th>State</th>
                    <th>Settings</th>
                </tr>
                </thead>
                {qns.map(old=>{
                    return(
                        <QuestionLoop key={`${old.qtext}${old.id}`} id={old.id} questions = {old} option={option}/>
                    )})
                }
            </table>
        </div>
    )
}