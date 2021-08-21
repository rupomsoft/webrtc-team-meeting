import React, {Component, Fragment} from 'react';
import TopNav from "../components/TopNav";
import BottomNav from "../components/BottomNav";
import Peer from "peerjs";
import io from 'socket.io-client';
const socket= io.connect('/')
class HomePage extends Component {

    render() {
        return (
            <Fragment>
                <TopNav/>
                <div className="container-fluid">
                    <div className="row">

                    </div>
                </div>
                <BottomNav/>
            </Fragment>
        );
    }
}

export default HomePage;