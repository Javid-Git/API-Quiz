import React,{useState} from 'react'
import { Accordion, AccordionDetails, AccordionSummary, CardMedia, Chip, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BASE_URL } from '../api';
// import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { red, green,grey } from '@mui/material/colors';

export default function Answer({qnAnswers, qns}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    //
    const findAns = (qnId) =>{
        const tempAns = qns.find(x=>x.qnId === qnId)
        return tempAns;
    }
    const markCorrectOrNot = (qna, idx, qns) => {
        if (idx === qns.selected) {
            return { sx: { color: qna.answer === true ? green[500] : red[500] } }
        }
        else if (qna.answer === true){
            return { sx: { color: green[500]} }
        }
    }
    return (
        <Box className={'mainbox'} sx={{ mt: 5, width: '100%', maxWidth: 640, mx: 'auto' }}>
            {
                qnAnswers.map((item, j) => (<Accordion
                    disableGutters
                    key={j}
                    expanded={expanded === j}
                    onChange={handleChange(j)}>
                    <AccordionSummary >
                        <Typography
                            sx={{ width: '90%', flexShrink: 0 }}>
                            {item.qtext}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/*{item.imageName ?*/}
                        {/*    <CardMedia*/}
                        {/*        component="img"*/}
                        {/*        image={BASE_URL + 'images/' + item.imageName}*/}
                        {/*        sx={{ m: '10px auto', width: 'auto' }}*/}
                        {/*    /> : null}*/}
                        <List>
                            {item.qoptions.map((x, i) =>
                                <ListItem key={i}
                                >
                                    <Typography {...markCorrectOrNot(x, i, findAns(x.questionId))}>
                                        <b>
                                            {String.fromCharCode(65 + i) + ". "}
                                        </b >{x.qoption}
                                    </Typography>
                                </ListItem>
                            )}
                        </List>
                    </AccordionDetails>
                </Accordion>))
            }
        </Box >
    )
}