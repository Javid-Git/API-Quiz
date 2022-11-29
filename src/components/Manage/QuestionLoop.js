import React, {useEffect} from "react";
import {createAPIEndpoint, ENDPOINTS} from "../../api";
import {ManageOptions} from "./ManageOptions";

export function QuestionLoop(props){
    const [isActive, setIsActive] = React.useState(false);
    function collapse(){
        setIsActive(!isActive);
    }
    const [option, setOption] = React.useState([]);

    useEffect(()=>{
        createAPIEndpoint(ENDPOINTS.option)
            .fetch()
            .then(res=>{
                setOption(res.data)
                console.log(res.data)
            })
            .catch(err=> {console.log(err)})
    }, [])

    // const options = option.map(opt => {
    //     if (opt.questionId === props.questions.id){
    //         return (
    //             <ManageOptions key={props.questions.id + opt.questionId} id={props.questions.id}  opt={opt}/>
    //         )
    //     }
    // })

    return(
        <tbody>
        <tr  className={isActive? "open view" : "view"} onClick={collapse}>
            <td>{props.questions.qtext}</td>
            <td className={!props.questions.isDeleted?'pcs qstate':'pcs qstate-negative'}>{props.questions.isDeleted? "deleted":"active"}</td>
            <td className="cur">
                <button>update</button>
                <button>delete</button>
                <button>recover</button>
            </td>
        </tr>
        <tr className={isActive? "open fold" : "fold"} >
            <td colSpan="7">
                <div className="fold-content">
                    <h3>{props.questions.qtext}</h3>
                    <table className="small-friendly">
                        <thead>
                        <tr>
                            <th><span className="visible-small" title="Company name">Option</span><span
                                className="visible-big">Option</span></th>
                            <th><span className="visible-small" title="Customer number">State</span><span
                                className="visible-big">State</span></th>
                            <th><span className="visible-small" title="Customer name">Settings</span><span
                                className="visible-big">Settings</span></th>

                        </tr>
                        </thead>
                        {option.map(opt => {
                            if (opt.questionId === props.questions.id){
                                return (
                                    <ManageOptions key={props.questions.id + opt.questionId} id={props.questions.id}  opt={opt}/>
                                )
                            }
                        })}
                    </table>
                </div>
            </td>
        </tr>
        </tbody>
    )
}