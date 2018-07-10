import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getFromLocalStorage, logOut } from '../../modules/session'
import Home from '../home'
import About from '../about'
import Login from '../login'
import NavBar from '../../presentation/NavBar.jsx'
import Register from '../register'

const ProtectedRoute = (props) => {
    const { component: Component, ...otherProps } = props
    return (
        <Route
            {...otherProps}
            render={renderProps => (
                props.isLoggedIn ?
                    <Component {...renderProps} /> :
                    <Redirect to='/login' />
                )
            }
        />
    )
}


class App extends React.Component {

    componentDidMount () {
        if (!this.props.isLoggedIn) {
            this.props.getFromLocalStorage()
        }
    }

    render () {
        return (
            <div className="app-wrapper">
                <NavBar isLoggedIn={this.props.isLoggedIn} logOut={this.props.logOut} location={this.props.location}/>
                <main>
                    <Route exact path="/" component={Home} />
                    <ProtectedRoute 
                        exact 
                        path="/about-us"
                        component={About}
                        isLoggedIn={this.props.isLoggedIn}
                    />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.session.isLoggedIn
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getFromLocalStorage,
    logOut
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

