import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loginRequest } from '../../modules/session'
import { push } from 'react-router-redux'

class Login extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            username: null,
            password: null
        }
    }

    submit () {
        this.props.loginRequest(this.state.username, this.state.password)
    }

    componentDidMount () {
        if (this.props.isLoggedIn === true) {
            this.props.redirect()
        }
    }

    componentDidUpdate () {
        if (this.props.isLoggedIn === true) {
            this.props.redirect()
        }
    }

    render () {
        return (
            <div>
                <h1>Login</h1>
                <input type="text" placeholder="Username" onChange={(evt) => this.setState({username: evt.target.value})}/><br/>
                <input type="password" placeholder="Password" onChange={(evt) => this.setState({password: evt.target.value})}/><br/>
                {this.props.loginFailed ? <div>Your username or password is incorrect.</div> : null}
                <input 
                    type="submit"
                    onClick={this.submit.bind(this)}
                    disabled={this.props.isLoggingIn}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userName: state.session.userName,
    isLoggingIn: state.session.isLoggingIn,
    isLoggedIn: state.session.isLoggedIn,
    loginFailed: state.session.loginFailed
})

const mapDispatchToProps = dispatch => bindActionCreators({
    loginRequest,
    redirect: () => push('/')
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
