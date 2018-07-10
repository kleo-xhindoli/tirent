import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Dimmer, Loader, Card, Image, Icon } from 'semantic-ui-react'
import { fetchHouses } from '../../modules/houses'

class Home extends React.Component {
    componentDidMount () {
        this.props.fetchHouses()
    }

    loadPlaceholders (count) {
        return <div>yes</div>
    }

    renderHouses (items) {
        if (!items.length) return this.loadPlaceholders(5)
        return items.map(item => (
            <Card>
                <Image src={item.gallery[0].url} />
                <Card.Content>
                    <Card.Header>{item.title}</Card.Header>
                    <Card.Meta>
                        <span>{item.createdAt}</span>
                    </Card.Meta>
                    <Card.Description>{item.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                <a>
                    <Icon name='user' />
                    {item.createdBy.firstname + ' ' + item.createdBy.lastname}
                </a>
                </Card.Content>
            </Card>
        ))
    }
    
    render () {
        const { isFetching, items } = this.props.houses
        return (
            <Dimmer.Dimmable blurring dimmed={isFetching}>
                {this.renderHouses(items)}
                <Dimmer inverted active={isFetching}>
                    <Loader>Loading</Loader>
                </Dimmer>
            </Dimmer.Dimmable>
        )
    }
}

const mapStateToProps = state => ({
    houses: state.houses,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchHouses,
    changePage: () => push('/about-us')
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
