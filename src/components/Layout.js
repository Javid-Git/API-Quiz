import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router';
import {useStateContext} from "../hooks/useStateContext";

export default function Layout() {
    const { resetContext } = useStateContext()
    const navigate = useNavigate()

    const logout = () => {
        resetContext()
        navigate("/")
    }

    return (
        <>
            <AppBar position="sticky">
                <Toolbar className={'appBar'} sx={{ width: 640, m: 'auto' }}>
                    <Typography className={'resultCard'}
                        variant="h4"
                        align="center"
                        sx={{ flexGrow: 1 }}>
                        quiZZa
                    </Typography>
                    <Button className={'logout'} onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </>
    )
}