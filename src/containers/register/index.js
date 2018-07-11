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
import { registerRequest } from '../../modules/session'

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
            <div className="login-form">
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color="blue" textAlign='center'>
                            <Image src='/icon.png' /> Create a new account
                        </Header>
                        <Segment stacked>
                            <Form error={this.state.hasError}>
                                <Form.Field>
                                    <Input icon='user' iconPosition='left' placeholder='Username' onChange={(evt) => this.setState({ username: evt.target.value })} />
                                </Form.Field>
                                <Form.Field>
                                    <Input icon='lock' iconPosition='left' type="password" placeholder='Password' onChange={(evt) => this.setState({ password: evt.target.value })} />
                                </Form.Field>
                                <Form.Field>
                                    <Input icon='lock' iconPosition='left' type="password" placeholder='Confirm Password' onChange={(evt) => this.setState({ confirm: evt.target.value })} />
                                </Form.Field>
                                <Form.Field>
                                    <Input icon='address card outline' iconPosition='left' placeholder='First Name' onChange={(evt) => this.setState({ firstname: evt.target.value })} />
                                </Form.Field>
                                <Form.Field>
                                    <Input icon='address card outline' iconPosition='left' placeholder='Last Name' onChange={(evt) => this.setState({ lastname: evt.target.value })} />
                                </Form.Field>
                                <Message
                                    error
                                    content={this.state.errorMessage}
                                />
                                <Button
                                    primary
                                    fluid
                                    type='submit'
                                    onClick={this.submit.bind(this)}
                                    disabled={this.props.isRegistering}
                                >Sign Up</Button>
                            </Form>
                        </Segment>
                        <Message>
                            Already have an account? <NavLink to='/login'>Sign In</NavLink>
                        </Message>
                    </Grid.Column>
                </Grid>
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
