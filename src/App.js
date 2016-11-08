import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.state = {
            username: ''
        }
    }

    handleInputChange(e) {
        const {fetch} = this.props;
        const username = e.target.value;
        this.setState({ username }, () => {
            fetch(username);
        });
    }

    render() {
        const {isFetching, result} = this.props;
        const {username} = this.state;
        return (
            <div>
                <input type="text" placeholder="GitHub Username" value={username} onChange={this.handleInputChange} />
                {isFetching ? <p>Fetching...</p> : <div />}
                <div>
                    {result ? <img src={result.avatar_url} /> : <div />}
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        isFetching: state.isFetching,
        result: state.result
    }),
    dispatch => ({
        fetch: (username) => {
            dispatch({ type: 'FETCH_USER_CANCEL' })
            dispatch({ type: 'FETCH_USER', username })
        }
    })
)(App);
