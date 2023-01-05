import React, {createContext, useState} from "react";

export const stateContext = createContext();
export const updateContext = createContext();

const getContext = () => {
    return{
        participantId: 0,
        timing: 0,
        selections: []
    }
}

const getOption = () => {
    if (localStorage.getItem('option') === null || localStorage.getItem('option') === undefined)
        localStorage.setItem('option', JSON.stringify({
            optionId: 0,
            questionId: 0
        }))
    return JSON.parse(localStorage.getItem('option'))
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
        },
        resetContext: () => {
            localStorage.removeItem('context')
            setContext(getFreshContext())
        }
    }

}

export function useUpdateContext(){
    const {context, setContext} = React.useContext(updateContext)
    console.log(context)

    React.useEffect(() => {
        localStorage.setItem('option', JSON.stringify(context))
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

export function Context({ children }) {
    const [option, setOption] = useState(getOption())
    const [context, setContext] = useState(getFreshContext())

    React.useEffect(() => {
        localStorage.setItem('option', JSON.stringify(option))
        localStorage.setItem('context', JSON.stringify(context))
    }, [context])

    return (
        <stateContext.Provider value={{ context, setContext, option, setOption }}>
            {children}
        </stateContext.Provider>
    )
}