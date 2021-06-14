const restaurantReducer = (state = {restaurant: null, incoming_orders: [], received_orders: [], outgoing_orders: [], inventory: [], all_restaurants: [], food_items: [], selected_order: null }, action) => {
    switch(action.type){
        case 'ALL_REST':
            return{
                ...state,
                all_restaurants: action.all_restaurants
            }
        case 'SET_REST':
            return{
                ...state,
                restaurant: action.restaurant
            }
        case 'SET_INCOMING':
            return{
                ...state,
                incoming_orders: action.incoming_orders
            }
        case 'SET_OUTGOING':
            return{
                ...state,
                outgoing_orders: action.outgoing_orders
            }
        case 'SET_RECEIVED':
            return{
                ...state,
                received_orders: action.received_orders
            }
        case 'SET_INVENTORY':
            return{
                ...state,
                inventory: action.inventory
            }
        case 'SET_FOOD':
            return{
                ...state,
                food_items: action.food_items
            }
        case 'ADD_ITEM':
            return{
                ...state,
                inventory: [...state.inventory, action.food_item]
            }
        case 'SUBTRACT_ITEM':
            return{
                ...state,
                inventory: state.inventory.filter((item) => item !== action.food_item)
            }
        case 'UPDATE_ITEM_SUB':
            return{
                ...state,
                
            }
        case 'SELECT_ORDER':
            return{
                ...state,
                selected_order: action.selected_order
            }
        default:
            return state
    }
}

export default restaurantReducer