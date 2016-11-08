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
        this.setState({ username: e.target.value });
    }

    render() {
        const {fetch, isFetching, result} = this.props;
        const {username} = this.state;
        return (
            <div>
                <input type="text" placeholder="GitHub Username" value={username} onChange={this.handleInputChange} />
                <button type="button" onClick={e => fetch(username)} disabled={isFetching}>Fetch</button>
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
            dispatch({ type: 'FETCH_USER', username })
        }
    })
)(App);