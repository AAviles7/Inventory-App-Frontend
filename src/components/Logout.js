import { connect } from 'react-redux'
import { useEffect } from "react";

const Logout = ({ history, logout }) => {
  useEffect(() => {
    localStorage.removeItem("user");
    logout();
    history.push("/login");
  }, [history, logout]);

  return null;
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch({ type: 'LOGOUT_USER' })
    }
}
 
export default connect(null, mapDispatchToProps)(Logout);