import React, {useEffect} from "react";
import {createAPIEndpoint, ENDPOINTS} from "../../api";
import {ManageOptions} from "./ManageOptions";

export function QuestionLoop(props){
    const [isActive, setIsActive] = React.useState(false);
    const [questionData, setQuestionData] = React.useState({
        questionId: props.id,
        qtext: props.questions.qtext,
    })
    const [updateQtn, setUpdateQtn] = React.useState(false)

    function collapse(){
        setIsActive(!isActive);
    }


    const opts = props.option.map(opt => {
        if (props.questions.id === opt.questionId ){
            return (
                <ManageOptions  key={props.questions.id + opt.questionId + opt.qoption} id={props.questions.id}  opt={opt}/>
            )
        }

    })

    function deleteQuestion(){
            createAPIEndpoint(ENDPOINTS.question)
                .delete(props.id)
                .catch(err=> {console.log(err)})
    }

    function updateQuestion(e){
        e.preventDefault();
        setQuestionData(old=>({
            ...old,
            questionId: e.target.children[0].getAttribute('questionId')
        }))
        if (questionData.questionId !== 0){
            createAPIEndpoint(ENDPOINTS.question)
                .put(e.target.children[1].getAttribute('questionId'), questionData)
                .catch(err=>console.log(err))
        }
        setUpdateQtn(!updateQtn)
    }
    function handleOption(e){
        e.preventDefault()
        const {value} = e.target
        setQuestionData(old=>({
            ...old,
            qtext: value,
            // optionId: e.target.getAttribute('optionId'),
            questionId: e.target.getAttribute('questionId')

        }))
    }
    function editQtn(){
        setUpdateQtn(!updateQtn)
    }
    return(
        <tbody>
        <tr  className={isActive? "open view" : "view"} >
            <td onClick={collapse}>{props.questions.qtext}</td>
            <td><div className={!props.questions.isDeleted?'pcs qstate':'pcs qstate-negative'}>{props.questions.isDeleted? "deleted":"active"}</div></td>
            <td className="cur">
                <button className={'updateBtn'} onClick={editQtn}>update</button>
                <button className={'deleteBtn'}  onClick={deleteQuestion}>delete</button>
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
                        {opts}
                    </table>
                </div>
            </td>
        </tr>
        <tr>
            <td colSpan={6}>
                {updateQtn &&
                    <div className={'updateField'}>
                        <form onSubmit={updateQuestion} >
                            <label className={'updateLabel'} htmlFor="option">Change question </label>
                            <input
                                id={'update-field'}
                                name={'option'}
                                type="text"
                                placeholder={'New option'}
                                questionId={props.id}
                                value={questionData.qtext}
                                onChange={e=> {
                                    handleOption(e)
                                }}
                            />
                            <button className="btn btn-accept" >Accept</button>
                        </form>
                    </div>
                }
            </td>
        </tr>
        </tbody>

    )
}