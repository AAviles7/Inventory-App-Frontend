import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { List } from "semantic-ui-react"

const OrderList = ({ order, select_order, history }) => {
    const [location, setLocation] = useState('')

    useEffect(() => {
        if(order.food_items.length > 0){
            setLocation(order.food_items[0].store)
        }
    }, [order])

    const handleClick = () => {
        select_order(order)
        history.push(`/orders/details_ordernum_${order.id}`)
    }

    return(
        <List.Item onClick={handleClick}>
            <List.Content>
                <List.Header as='a'>{`${order.date}:: ${location}`}</List.Header>
                <List.Description>{`creator: ${order.creator.username}`}</List.Description>
            </List.Content>
        </List.Item>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        select_order: (selected_order) => dispatch({ type: 'SELECT_ORDER', selected_order})
    }
}

export default connect(null, mapDispatchToProps)(OrderList)