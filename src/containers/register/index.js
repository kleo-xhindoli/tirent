import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { registerRequest } from '../../modules/session'
import { push } from 'react-router-redux'

class Register extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            username: null,
            password: null,
            confirm: null,
            firstname: null,
            lastname: null,
            hasError: false,
            errorMessage: null
        }
    }

    submit () {
        this.setState({
            hasError: false,
            errorMessage: null
        })
        if (this.state.password === this.state.confirm) {
            this.props.registerRequest({
                username: this.state.username,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname
            })
        }
        else {
            this.setState({
                hasError: true,
                errorMessage: 'Passwords do not match!'
            })
        }
    }

    componentDidMount () {
        if (this.props.isLoggedIn === true) {
            this.props.redirect('/')
        }
    }

    componentDidUpdate () {
        if (this.props.isLoggedIn === true) {
            this.props.redirect('/')
        }
        if (this.props.isRegistered === true) {
            this.props.redirect('/login')
        }
        if (this.props.registerFailed === true && !this.state.hasError) {
            this.setState({
                hasError: true,
                errorMessage: 'The username you chose is already taken!'
            })
        }
    }

    render () {
        return (
            <div>
                <h1>Login</h1>
                <input type="text" placeholder="Username" onChange={(evt) => this.setState({username: evt.target.value})}/><br/>
                <input type="password" placeholder="Password" onChange={(evt) => this.setState({password: evt.target.value})}/><br/>
                <input type="password" placeholder="Confirm Password" onChange={(evt) => this.setState({confirm: evt.target.value})}/><br/>
                <input type="text" placeholder="First Name" onChange={(evt) => this.setState({firstname: evt.target.value})}/><br/>
                <input type="text" placeholder="Last Name" onChange={(evt) => this.setState({lastname: evt.target.value})}/><br/>
                {this.state.hasError ? <div>{this.state.errorMessage}</div> : null}
                <input 
                    type="submit"
                    onClick={this.submit.bind(this)}
                    disabled={this.props.isRegistering}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.session.isLoggedIn,
    isRegistering: state.session.isRegistering,
    isRegistered: state.session.isRegistered,
    registerFailed: state.session.registerFailed
})

const mapDispatchToProps = dispatch => bindActionCreators({
    registerRequest,
    redirect: (to) => push(to)
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)
