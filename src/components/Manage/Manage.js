import React, {useEffect} from "react";
import '../../manage.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faQuestion, faListNumeric , faCoffee, faUser,faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import {createAPIEndpoint, ENDPOINTS} from "../../api";


library.add(fab, faQuestion,faListNumeric,faUser,faHouse, faCoffee)

export function Manage(){


    return(
        <div className="sidebar-inner">
            <header className="sidebar-header">
                <button type="button" className="sidebar-burger buttons">
                    <FontAwesomeIcon icon="house"></FontAwesomeIcon>
                </button>
            </header>
            <div className="sidebar-tools-container">
                <nav className="sidebar-tools">
                    <Link to='/manage/question'>
                        <button type="button" className={'buttons'}>
                            <FontAwesomeIcon icon="question" size={'xs'}></FontAwesomeIcon>
                        </button>
                    </Link>
                    <Link to='/manage/options'>
                        <button type="button" className={'buttons'}>
                            <FontAwesomeIcon icon="list-numeric"></FontAwesomeIcon>
                        </button>
                    </Link>
                </nav>
                <footer className="sidebar-tools-footer">
                    <button type="button" className={'buttons'}>
                        <FontAwesomeIcon icon="user"></FontAwesomeIcon>
                    </button>
                </footer>
            </div>
            <div className="sidebar-menu-container"></div>
        </div>
    )
}

