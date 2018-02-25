import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import * as authenticationActions from '../../actions/authenticationActions';
import * as socketActions from '../../actions/socketActions';
import LoginForm from "./LoginForm";
import toastr from 'toastr';

class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: {},
            logging: false,
            account: Object.assign({}, this.props.account)
        };
        this.login = this.login.bind(this);
        this.updateAccountState = this.updateAccountState.bind(this);
    }

    updateAccountState(event) {
        const field = event.target.name;
        let account = this.state.account;
        account[field] = event.target.value;
        return this.setState({account: account});
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.authentication.loggedIn) {
            this.props.redirect('/');
            return;
        }
        if (this.state.logging) {
            let account = this.state.account;
            account.password = '';
            toastr.error('User does not exist or password is not correct');
            this.setState({ logging: false, account: account });
        }
    }

    loginFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.account.user.length < 1) {
            errors.user = 'User name is obligatory';
            formIsValid = false;
        }
        if (this.state.account.password.length < 6) {
            errors.password = 'Password must contain at least 6 characters';
            formIsValid = false;
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    login(event) {
        event.preventDefault();
        if (!this.loginFormIsValid()) {
            return;
        }

        this.setState({logging: true});
        this.props.socket.sendSocketLogin(this.state.account);

    }

    render() {
        return (
            <LoginForm
                account={this.state.account}
                onLogin={this.login}
                logging={this.state.logging}
                errors={this.state.errors}
                onChange={this.updateAccountState}
            />
        );
    }
}

function mapStateToProps(state, ownProps) {
    let account = {user: '', password: ''};
    return {
        account: account,
        authentication: state.authentication
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authenticationActions, dispatch),
        socket: bindActionCreators(socketActions, dispatch),
        redirect: (path) => dispatch(push(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
