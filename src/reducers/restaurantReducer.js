const restaurantReducer = (state = {restaurant: null, incoming_orders: [], received_orders: [], outgoing_orders: [], inventory: [], all_restaurants: [], food_items: [] }, action) => {
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
        default:
            return state
    }
}

export default restaurantReducer