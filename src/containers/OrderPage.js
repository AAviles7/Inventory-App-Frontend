import { Grid, Header, List } from "semantic-ui-react"
import { connect } from "react-redux"
import OrderList from "../components/OrderList"

const OrderPage = ({ food_items, received, outgoing, incoming, history }) => {
    return(
        <Grid celled>
            <Grid.Row>
                <Grid.Column width={5}>
                    <Header as='h1'>Incoming Orders</Header>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Header as='h1'>Outgoing Orders</Header>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Header as='h1'>Received Orders</Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={5}>
                    <List divided relaxed size='huge'>
                        {incoming.map((order) => <OrderList order={order} key={order.id} history={history}/>)}
                    </List>
                </Grid.Column>
                <Grid.Column width={5}>
                    <List divided relaxed size='huge'>
                        {outgoing.map((order) => <OrderList order={order} key={order.id} history={history}/>)}
                    </List>
                </Grid.Column>
                <Grid.Column width={5}>
                    <List divided relaxed size='huge'>
                        {received.map((order) => <OrderList order={order} key={order.id} history={history}/>)}
                    </List>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        food_items: state.restaurant.food_items,
        received: state.restaurant.received_orders,
        outgoing: state.restaurant.outgoing_orders,
        incoming: state.restaurant.incoming_orders
    }
}


export default connect(mapStateToProps)(OrderPage)