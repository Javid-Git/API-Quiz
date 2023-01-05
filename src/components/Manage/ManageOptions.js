import React, {useEffect} from "react";
import {createAPIEndpoint, ENDPOINTS} from "../../api";

export function ManageOptions(props){
    const [updateOption, setUpdateOption] = React.useState(false)
    const [formData, setFormData] = React.useState({
        qoption: props.opt.qoption,
        // optionId: 0,
        questionId: 0,
    })


    function handleOption(e){
        e.preventDefault()
        const {value} = e.target
        setFormData(old=>({
            ...old,
            qoption: value,
            // optionId: e.target.getAttribute('optionId'),
            questionId: e.target.getAttribute('questionId')

        }))
        console.log(formData)
    }

    function edit(){
        setUpdateOption(!updateOption)
        console.log(updateOption)
    }

    function remove(){
        createAPIEndpoint(ENDPOINTS.option)
            .delete(props.opt.id)
            .catch(err=>console.log(err))

    }
    function updateOpt(e){
        e.preventDefault();
        setFormData(old=>({
            ...old,
            questionId: e.target.children[0].getAttribute('questionId')
        }))
        console.log(e.target.children[1].getAttribute('optionId'))
        if (formData.questionId !== 0){
            createAPIEndpoint(ENDPOINTS.option)
                .put(e.target.children[1].getAttribute('optionId'), formData)
                .catch(err=>console.log(err))
        }
        setUpdateOption(!updateOption)
    }
    return(
        <tbody key={props.id + props.opt.questionId + props.opt.qoption}>
        <tr >
            <td data-th="Company name">{props.opt.qoption}</td>
            <td><div className={!props.opt.isDeleted?'pcs qstate':'pcs qstate-negative'}>{props.opt.isDeleted? "deleted":"active"}</div></td>
            <td className="cur">
                <button name={'optionCheck'}  onClick={edit} className={'updateBtn'}>update</button>
                <button className={'deleteBtn'} onClick={remove}>delete</button>
                <button>recover</button>
            </td>
        </tr>

        <tr>
            <td colSpan={6}>
                {updateOption &&
                    <div className={'updateField'}>
                        <form onSubmit={updateOpt} >
                            <label className={'updateLabel'} htmlFor="option">Change option </label>
                            <input
                                id={'update-field'}
                                name={'option'}
                                type="text"
                                placeholder={'New option'}
                                optionId={props.opt.id}
                                questionId={props.opt.questionId}
                                value={formData.qoption}
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