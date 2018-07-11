import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { NavLink } from 'react-router-dom'
import { 
    Button,
    Form,
    Message,
    Card,
    Input,
    Grid,
    Header,
    Image,
    Segment
} from 'semantic-ui-react'
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
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color="blue" textAlign='center'>
                            <Image src='/icon.png' /> Log-in to your account
                        </Header>
                        <Segment stacked>
                            <Form error={this.props.loginFailed} size='large'>
                                <Form.Field>
                                    <Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={(evt) => this.setState({ username: evt.target.value })} />
                                </Form.Field>
                                <Form.Field>
                                    <Input fluid icon='lock' iconPosition='left' type="password" placeholder='Password' onChange={(evt) => this.setState({ password: evt.target.value })} />
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
                        </Segment>
                        <Message>
                            New to us? <NavLink to='/register'>Sign Up</NavLink>
                        </Message>
                    </Grid.Column>
                </Grid>
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
    redirect: () => push('/register')
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
