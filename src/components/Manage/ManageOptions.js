import React from "react";

export function ManageOptions(props){
    if (props.opt != null){
        return(
            <tbody>
            <tr>
                <td data-th="Company name">{props.opt.qoption}</td>
                <td className={!props.opt.isDeleted?'pcs qstate':'pcs qstate-negative'}>{props.opt.isDeleted? "deleted":"active"}</td>
                <td className="cur">
                    <button>update</button>
                    <button>delete</button>
                    <button>recover</button>
                </td>
            </tr>
           </tbody>
        )
    }
}