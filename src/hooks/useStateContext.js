import React, {createContext, useState} from "react";

export const stateContext = createContext();

const getContext = () => {
    return{
        participantId: 0,
        timing: 0,
        selections: []
    }
}

const getFreshContext = () => {
    if (localStorage.getItem('context') === null)
        localStorage.setItem('context', JSON.stringify({
            participantId: 0,
            timing: 0,
            selections: []
        }))
    return JSON.parse(localStorage.getItem('context'))
}


// export function useStateContext() {
//     const { context, setContext } = React.useContext(stateContext)
//     return {
//         context,
//         setContext: obj => {
//             setContext({ ...context, ...obj }) },
//         resetContext: ()=>{
//             localStorage.removeItem('context')
//             setContext(getFreshContext())
//         }
//     };
// }
export function useStateContext(){
    const {context, setContext} = React.useContext(stateContext)

    React.useEffect(() => {
        localStorage.setItem('context', JSON.stringify(context))
    }, [context])

    return{
        context,
        setContext: object=> {
            setContext(
                {
                    ...context,
                    ...object
                })
        }
    }

}


// export function Context({children}){
//     const [context, setContext] = useState(getContext());
//
//
//     return(
//         <stateContext.Provider value={{context, setContext}}>
//             {children}
//         </stateContext.Provider>
//     )
// }

export function Context({ children }) {
    const [context, setContext] = useState(getFreshContext())

    React.useEffect(() => {
        localStorage.setItem('context', JSON.stringify(context))
    }, [context])

    return (
        <stateContext.Provider value={{ context, setContext }}>
            {children}
        </stateContext.Provider>
    )
}