import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Button, Grid, Header, Icon } from "semantic-ui-react"
import { API_INVENTORY_ITEMS } from '../constants'

const InventoryList = ({ food, inventory, add_item, subtract_item, restaurant }) => {
    const [count, setCount] = useState(0)
    const [itemExist, setExist] = useState(false)
    const [item, setItem] = useState(null)

    useEffect(() => {
        inventory.map((item) => {
            if(item.food_item_id === food.id){
                setCount(item.quantity)
                setExist(true)
                setItem(item)
            }
            return null
        })
    }, [food, inventory])

    const addItem = async () => {
        if(itemExist){
            const updateItem = {
                food_item_id: food.id,
                restaurant_id: restaurant.id,
                quantity: item.quantity+1
            }
            const reqObj = {
                headers: { "Content-Type": "application/json" },
                method: 'PATCH',
                body: JSON.stringify(updateItem)
            }
            const res = await fetch(API_INVENTORY_ITEMS+item.id, reqObj)
            const updatedData = await res.json()
            setCount(updatedData.quantity)
            setItem(updatedData)
        }else{
            const newItem = {
                food_item_id: food.id,
                restaurant_id: restaurant.id,
                quantity: 1
            }
            const reqObj = {
                headers: { "Content-Type": "application/json" },
                method: 'POST',
                body: JSON.stringify(newItem)
            }
            const res = await fetch(API_INVENTORY_ITEMS, reqObj)
            const newData = await res.json()
            setCount(newData.quantity)
            setItem(newData)
            add_item(newData)
            setExist(true)
        }
    }

    const subtractItem = async () => {
        if(itemExist && item.quantity > 0){
            const updateItem = {
                food_item_id: food.id,
                restaurant_id: restaurant.id,
                quantity: item.quantity-1
            }
            const reqObj = {
                headers: { "Content-Type": "application/json" },
                method: 'PATCH',
                body: JSON.stringify(updateItem)
            }
            const res = await fetch(API_INVENTORY_ITEMS+item.id, reqObj)
            const updatedData = await res.json()
            setCount(updatedData.quantity)
            setItem(updatedData)
        }
    }

    return(
        <Grid.Row>
            <Grid.Column width={4}>
                {food.store}
            </Grid.Column>
            <Grid.Column width={8}>
                {food.name}
            </Grid.Column>
            <Grid.Column width={1}>
                <Header as='b'>{count}</Header>
            </Grid.Column>
            <Grid.Column width={3}>
                <Button.Group widths='2'>
                    <Button positive icon labelPosition='left' onClick={addItem}>
                        <Icon name='minus circle'/>
                        Add
                    </Button>
                    <Button negative icon labelPosition='right' onClick={subtractItem}>
                        <Icon name='plus circle'/>
                        Subtract
                    </Button>
                </Button.Group>
            </Grid.Column>
        </Grid.Row>
    )
}

const mapStateToProps = (state) => {
    return {
        inventory: state.restaurant.inventory,
        restaurant: state.restaurant.restaurant
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add_item: (food_item) => dispatch({ type: 'ADD_ITEM', food_item}),
        subtract_item: (food_item) => dispatch({ type: 'SUBTRACT_ITEM', food_item})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryList)