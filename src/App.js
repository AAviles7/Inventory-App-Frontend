import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { connect } from 'react-redux'
import { useEffect } from "react";
import { API_USERS, API_RESTAURANTS } from './constants'
import Login from './containers/Login'
import MainMenu from "./containers/MainMenu";

const App = ({ user, set_all_users, set_all_restaurants }) => {

  useEffect(()=>{
    const fetchUsers = async () => {
      const res = await fetch(API_USERS)
      const usersData = await res.json()
      set_all_users(usersData)
    }
    const fetchRestaurants = async () => {
      const res = await fetch(API_RESTAURANTS)
      const restaurantsData = await res.json()
      set_all_restaurants(restaurantsData)
    }
    fetchUsers()
    fetchRestaurants()
  }, [set_all_users, set_all_restaurants])

  return(
    <Router>
      <Switch>
        {/* Login Path */}
        <Route
          exact path="/login"
          render={(routeProps) => (
            <Login {...routeProps} />
          )}
        />

        {/* Redirects if user is not logged in */}
        {!user && (
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          )}

        {/* Main Menu Path */}
        <Route
          exact path="/mainmenu"
          render={(routeProps) => (
            <MainMenu {...routeProps} />
          )}
        />

      </Switch>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
      user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      set_all_users: (all_users) => dispatch({ type: 'ALL_USERS', all_users}),
      set_all_restaurants: (all_restaurants) => dispatch({ type: 'ALL_REST', all_restaurants})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
