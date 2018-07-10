import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button, Form, Message, Card, Input } from 'semantic-ui-react'
import { loginRequest } from '../../modules/session'

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
            <div className="login-form">
                <h1>Sign in</h1>
                <Card>
                    <Card.Content>
                        <Form error={this.props.loginFailed}>
                            <Form.Field>
                                <Input icon='user' iconPosition='left' placeholder='Username' onChange={(evt) => this.setState({ username: evt.target.value })} />
                            </Form.Field>
                            <Form.Field>
                                <Input icon='lock' iconPosition='left' type="password" placeholder='Password' onChange={(evt) => this.setState({ password: evt.target.value })} />
                            </Form.Field>
                            <Message
                                error
                                content='Your username or password is incorrect.'
                            />
                            <Button
                                primary
                                fluid
                                type='submit'
                                onClick={this.submit.bind(this)}
                                disabled={this.props.isLoggingIn}
                            >Sign In</Button>
                        </Form>
                    </Card.Content>
                </Card>
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
