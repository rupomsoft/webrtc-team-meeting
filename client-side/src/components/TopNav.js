import React, {Component, Fragment} from 'react';
import {Container, Navbar} from "react-bootstrap";
import navIcon from '../assets/images/teams.svg'
class TopNav extends Component {
    render() {
        return (
            <Fragment>
                <Navbar className="sticky-top" bg="dark">
                    <Container fluid={true}>
                        <Navbar.Brand  href="#home"><img className="nav-icon" alt="" src={navIcon}/> <span className="nav-item mx-2"> Team Meet</span></Navbar.Brand>
                    </Container>
                </Navbar>
            </Fragment>
        );
    }
}

export default TopNav;