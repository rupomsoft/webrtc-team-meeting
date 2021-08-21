import React, {Component, Fragment} from 'react';
import TopNav from "../components/TopNav";
import JoinForm from "../components/JoinForm";

class JoinPage extends Component {
    render() {
        return (
            <Fragment>
                <TopNav/>
                <JoinForm/>
            </Fragment>
        );
    }
}
export default JoinPage;