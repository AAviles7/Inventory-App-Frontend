import { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dropdown, Grid, Header, Search, Button } from "semantic-ui-react"
import InventoryList from '../components/InventoryList'

const Inventory = ({ food_items, history }) => {
    const [sortedList, setSortedList] = useState(food_items)
    const [sort, setSort] = useState('')
    const [storeList, setStoreList] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const tempList = food_items.filter((item) => item.store.includes(sort))
        setSortedList(tempList.filter((item) => item.name.includes(search)))
        const temp = []
        food_items.map((item) => {
            if(!temp.includes(item.store)){
                temp.push(item.store)
            }
            return null
        })
        const stores = [{
            key: 'All',
            text: 'All',
            value: 'All'
        }]
        for(let x=0; x < temp.length; x++){
            stores.push({
                key: temp[x],
                text: temp[x],
                value: temp[x]
            })
        }
        setStoreList(stores)
    }, [sort, search, food_items])

    const handleSort = (value) => {
        switch(value){
            case 'All':
                setSort('')
                break
            case 'International':
                setSort('International')
                break
            case 'Mega Mart':
                setSort('Mega Mart')
                break
            case 'Leonard Paper':
                setSort('Leonard Paper')
                break
            case 'Meat Market':
                setSort('Meat Market')
                break
            case 'Osorio':
                setSort('Osorio')
                break
            case 'Produce':
                setSort('Produce')
                break
            case 'Sysco':
                setSort('Sysco')
                break
            case "Sam's Club":
                setSort("Sam's Club")
                break
            case 'Restaurant Depot':
                setSort('Restaurant Depot')
                break
            case 'Central Kitchen':
                setSort('Central Kitchen')
                break
            default:
                setSort('')
                break
        }
    }

    return(
        <Fragment> 
            <Grid celled id='gridtopbar'>
                <Grid.Row color='grey'>
                    <Grid.Column width={4}>
                        <Header as='h2'>Store</Header>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Header as='h2'>Item Name</Header>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Header as='h2'>Quantity</Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid id='gridFilterbar'>
                <Grid.Row stretched>
                    <Grid.Column width={5}>
                        <Dropdown fluid selection options={storeList} placeholder='All' id='filterDropdown' onChange={(event) => handleSort(event.target.innerText)}/>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Search showNoResults={false} onSearchChange={(event) => setSearch(event.target.value)} fluid/>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Button onClick={() => {
                            history.push('/mainmenu')
                        }} > Back </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid celled id='inventoryGrid'>
                {sortedList.map((food) => <InventoryList food={food} key={food.id}/>)}
            </Grid>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        inventory: state.restaurant.inventory,
        food_items: state.restaurant.food_items
    }
}

export default connect(mapStateToProps)(Inventory)