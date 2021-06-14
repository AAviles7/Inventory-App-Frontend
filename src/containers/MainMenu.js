import { useEffect } from "react"
import { connect } from "react-redux"
import { API_ORDERS, API_FOOD_ITEMS } from '../constants'
import { Button, Divider, Grid, Icon } from 'semantic-ui-react'

const MainMenu = ({ user, set_restaurant, set_incoming, set_received, set_outgoing, set_inventory, all_restaurants, history, set_food }) => {

    useEffect(() => {        
        const fetchOrders = async () => {
            // sets restaurant state
            const selectRestaurant = all_restaurants.find((restaurant) => restaurant.id === user.restaurant.id)
            set_restaurant(selectRestaurant)

            // gets order data
            const res = await fetch(API_ORDERS)
            const ordersData = await res.json()

            // sets sent orders state
            const sent = ordersData.filter((order) => selectRestaurant.sent_orders.find((o) => o.id === order.id))
            const sent_orders = sent.filter((order) => order.restaurant_id !== order.sent_restaurant_id)
            set_outgoing(sent_orders)

            // sets incoming orders state
            const orders = ordersData.filter((order) => selectRestaurant.orders.find((o) => o.id === order.id))
            const incoming_orders = orders.filter((order) => !order.received )
            set_incoming(incoming_orders)

            // sets received orders state
            const received_orders = orders.filter((order) => order.received )
            set_received(received_orders)

            // sets inventory state
            set_inventory(selectRestaurant.inventory_items)
        }
        fetchOrders()

        const fetchFood = async () =>{
            const res = await fetch(API_FOOD_ITEMS)
            const foodData = await res.json()
            set_food(foodData)
        }
        fetchFood()
    }, [user, set_restaurant, set_incoming, set_received, set_outgoing, set_inventory, all_restaurants, set_food])

    return(
        <Grid columns={2} celled='internally' doubling id='mainMenuGrid'>
            <Grid.Row id='mainGridBar' color='blue'>
                {'Nav Bar'}
            </Grid.Row>
            <Grid.Row id='mainGridRow' color='grey'>
                <Grid.Column>
                    <Button fluid size='massive' color='blue' id='mainbuttons'>
                        <Button.Content id='buttoncontent'>
                            <Icon name='send' size='massive' id='buttonicon'/>
                            <Divider hidden/>
                            Send Order
                        </Button.Content>
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button fluid size='massive' color='blue' id='mainbuttons'>
                        <Button.Content id='buttoncontent'>
                            <Icon name='paper plane outline' flipped='horizontally' size='massive' id='buttonicon'/>
                            <Divider hidden/>
                            Receive Order
                        </Button.Content>
                    </Button>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row id='mainGridRow' color='grey'>
                <Grid.Column>
                    <Button fluid size='massive' color='blue' id='mainbuttons'>
                        <Button.Content id='buttoncontent' onClick={() => history.push('/orders')}>
                            <Icon name='edit outline' size='massive' id='buttonicon'/>
                            <Divider hidden/>
                            Orders
                        </Button.Content>
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button fluid size='massive' color='blue' id='mainbuttons' onClick={() => history.push('/inventory')}>
                        <Button.Content id='buttoncontent'>
                            <Icon name='table' size='massive' id='buttonicon'/>
                            <Divider hidden/>
                            Inventory
                        </Button.Content>
                    </Button>
                </Grid.Column> 
            </Grid.Row>
            <Grid.Row id='mainGridBar' color='blue'>
                {'Info Bar'}
            </Grid.Row>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        all_restaurants: state.restaurant.all_restaurants
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      set_restaurant: (restaurant) => dispatch({ type: 'SET_REST', restaurant}),
      set_incoming: (incoming_orders) => dispatch({ type: 'SET_INCOMING', incoming_orders}),
      set_received: (received_orders) => dispatch({ type: 'SET_RECEIVED', received_orders}),
      set_outgoing: (outgoing_orders) => dispatch({ type: 'SET_OUTGOING', outgoing_orders}),
      set_inventory: (inventory) => dispatch({ type: 'SET_INVENTORY', inventory}),
      set_food: (food_items) => dispatch({ type: 'SET_FOOD', food_items})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu)