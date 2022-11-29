import React, {useContext, useEffect} from "react";
import {createAPIEndpoint, ENDPOINTS} from "../api";
import {getFormattedTime} from "../helpers/timer";
import {Question} from "./Question";
import { useNavigate } from 'react-router';
import {Card} from "@mui/material";
import {LinearProgress} from "@mui/material";
import {CardHeader} from "@mui/material";
import {Box} from "@mui/material";
import {CardContent} from "@mui/material";
import {Typography} from "@mui/material";
import {ListItemButton} from "@mui/material";
import {List} from "@mui/material";
import {CardMedia} from "@mui/material";
import {useStateContext} from "../hooks/useStateContext";

export function Quiz(){
    const[qNs,setQns] = React.useState([]);
    const {context, setContext} = useStateContext();
    const [index, setIndex] = React.useState(0);
    const [timing, setTiming] = React.useState(0);
    let timer;
    const navigate = useNavigate()

    const totalTime = ()=>{
        timer = setInterval(()=>{
            setTiming(time=>time+=1)
        },[1000])
    }
    // const questions = qNs.map(question=>{
    //     return(
    //         <Question key={question.id} question = {question}/>
    //     )
    // })
    useEffect(()=>{
        createAPIEndpoint(ENDPOINTS.question)
            .fetch()
            .then(res=>{
                setQns(res.data)
                totalTime();
            })
            .catch(err=> {console.log(err)})
            return ()=> {clearInterval(timer)}
    }, [])

    const updateAnswer = (qnId, optionIdx) => {
        const temp = [...context.selections]
        temp.push({
            qnId,
            selected: optionIdx
        })
        if (index < 4) {
            setContext({ selections: [...temp] })
            setIndex(index + 1)
        }
        else {
            setContext({ selections: [...temp], timing: timing })
            // navigate("/result")
        }
    }
    return(
        <div>
            {qNs.length != 0?
                <Card
                    sx={{
                        maxWidth: 640, mx: 'auto', mt: 5,
                        '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' }
                    }}>

                    <CardHeader
                        title={'Question ' + (index + 1) + ' of 5'}
                        action={<Typography>{getFormattedTime(timing)}</Typography>}
                    />
                    <Box>
                        <LinearProgress variant="determinate" value={(index + 1) * 100 / 5} />
                    </Box>
                    {/*{qNs[index].qimage != null*/}
                    {/*    ? <CardMedia*/}
                    {/*        component="img"*/}
                    {/*        // image={BASE_URL + 'images/' + qNs[index].imageName}*/}
                    {/*        sx={{ width: 'auto', m: '10px auto' }} />*/}
                    {/*    : null}*/}
                    <CardContent>
                        <Typography variant="h6">
                            {qNs[index].qtext}
                        </Typography>
                        <List>
                            {qNs[index].qoptions.map((item, idx) =>
                                <ListItemButton disableRipple key={idx} onClick={()=>updateAnswer(qNs[index].id, idx)}>
                                    <div>
                                        <b>{String.fromCharCode(65 + idx) + " . "}</b>{item.qoption}
                                    </div>

                                </ListItemButton>
                            )}

                        </List>
                    </CardContent>
                </Card>
                : null
            }
        </div>

    )
}