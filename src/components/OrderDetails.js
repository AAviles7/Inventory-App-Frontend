import { useEffect, useState } from "react"
import { Container, Grid } from "semantic-ui-react"
import { connect } from "react-redux"
import OrderDetailsList from "./OrderDetailsList"

const OrderDetails = ({ order }) => {
    const [location, setLocation] = useState('')

    useEffect(() => {
        if(order.food_items.length > 0){
            setLocation(order.food_items[0].store)
        }
    }, [order])

    return(
        <Container>
            <Grid celled divided>
                <Grid.Row>
                    <Grid.Column width={2}>Date:</Grid.Column>
                    <Grid.Column width={14}>{order.date}</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}>Store: </Grid.Column>
                    <Grid.Column width={14}>{location}</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}>Restaurant:</Grid.Column>
                    <Grid.Column width={14}>{order.restaurant.location}</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}>Creator:</Grid.Column>
                    <Grid.Column width={14}>{order.creator.username}</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}>Received:</Grid.Column>
                    <Grid.Column width={14}>{`${order.received}`}</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}>Receiver:</Grid.Column>
                    <Grid.Column width={14}>{order.receiver.username}</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}>Order Items:</Grid.Column>
                    <Grid.Column width={14}>{}</Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        order: state.restaurant.selected_order
    }
  }

export default connect(mapStateToProps)(OrderDetails)