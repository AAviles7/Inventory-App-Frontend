import { Fragment, useEffect } from "react"
import { connect } from "react-redux"
import { API_ORDERS } from '../constants'

const MainMenu = ({ user, set_restaurant, set_incoming, set_received, set_outgoing, set_inventory, all_restaurants, restaurant }) => {

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
    }, [user, set_restaurant, set_incoming, set_received, set_outgoing, set_inventory, all_restaurants])

    return(
        <Fragment>

        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        restaurant: state.restaurant.restaurant,
        all_restaurants: state.restaurant.all_restaurants
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      set_restaurant: (restaurant) => dispatch({ type: 'SET_REST', restaurant}),
      set_incoming: (incoming_orders) => dispatch({ type: 'SET_INCOMING', incoming_orders}),
      set_received: (received_orders) => dispatch({ type: 'SET_RECEIVED', received_orders}),
      set_outgoing: (outgoing_orders) => dispatch({ type: 'SET_OUTGOING', outgoing_orders}),
      set_inventory: (inventory) => dispatch({ type: 'SET_INVENTORY', inventory})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu)