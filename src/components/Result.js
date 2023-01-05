import React, {useEffect, useState} from "react";
import {useStateContext} from "../hooks/useStateContext";
import {createAPIEndpoint, ENDPOINTS} from "../api";
import {Alert, Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import { useNavigate } from 'react-router';
import {green} from "@mui/material/colors";
import * as PropTypes from "prop-types";
import {getFormattedTime} from "../helpers/timer";
import Answer from "./Answers";
import '../App.css'

export function Result(){
    const {context, setContext} = useStateContext();
    const [showAlert, setShowAlert] = useState(false)
    const [qnAnswers, setQnAnswers] = useState([])
    const [score, setScore] = useState(0)
    const navigate = useNavigate()

    useEffect(()=>{
        const ids = context.selections.map(x=>x.qnId)
        createAPIEndpoint(ENDPOINTS.answers)
            .post(ids)
            .then(res=>{
                const qna = res.data.map(x => ({
                        ...x,
                        ...(context.selections.find(y => y.qnId === x.qnId))
                    }))
                const qns = context.selections
                    .map(x => ({
                        ...x,
                        ...(res.data.find(y => y.qnId === x.qnId))
                    }))
                setQnAnswers(qna)
                calculateScore(qna, qns)
            })

    },[])

    const restart = () => {
        setContext({
            timing: 0,
            selections: []
        })
        navigate("/question")
    }
    const calculateScore = (qna, qns) => {

        let tempScore = qna.reduce((acc, curr) => {
            const num = curr.qoptions.map((x, i)=>{
                const tempAns = qns.find(x=>x.qnId === curr.id)
                if (x.answer === true && tempAns.selected === i){
                    acc++;
                }
                return 0;
            })
            return acc;
        }, 0)
        setScore(tempScore)
    }
    const submitScore = () => {
        createAPIEndpoint(ENDPOINTS.participant)
            .put(context.participantId, {
                participantId: context.participantId,
                score: score,
                timeTaken: context.timing
            })
            .then(res => {
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false)
                }, 4000);
            })
            .catch(err => { console.log(err) })
    }
    console.log(context.timing)
    return(
        <>
            <Card  sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}>
                <Box  sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
                        <Typography variant="h4">Congratulations!</Typography>
                        <Typography  variant="h6">
                            YOUR SCORE
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            <Typography variant="span" color={green[500]}>
                                {score}
                            </Typography>/5
                        </Typography>
                        <Typography variant="h6">
                            Total time:  {getFormattedTime(context.timing) + (context.timing < 60 ? ' seconds' : ' minutes')}
                        </Typography>
                        <Button variant="contained"
                                sx={{ mx: 1 }}
                                size="small"
                                onClick={submitScore}>
                            Submit
                        </Button>
                        <Button variant="contained"
                                sx={{ mx: 1 }}
                                size="small"
                                onClick={restart}>
                            Re-try
                        </Button>
                        <Alert
                            severity="success"
                            variant="string"
                            sx={{
                                width: '60%',
                                m: 'auto',
                                visibility: showAlert ? 'visible' : 'hidden'
                            }}>
                            Score Updated.
                        </Alert>
                    </CardContent>
                </Box>
            </Card>
            <Answer qnAnswers={qnAnswers} qns={context.selections}/>
        </>
    )
}