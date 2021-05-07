import { Fragment, useEffect } from "react"
import { connect } from "react-redux"

const MainMenu = ({ user, set_restaurant, set_incoming, set_received, set_outgoing, set_inventory }) => {

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch()
        }
        fetchData()
    }, [set_restaurant, set_incoming, set_received, set_outgoing, set_inventory])

    return(
        <Fragment>

        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
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