import { connect } from 'react-redux'
import { useState } from 'react'
import { Segment, Grid, Form, Button, Divider, Container, Header } from 'semantic-ui-react'
import { API_LOGIN } from '../constants'

const Login = ({ login, history, set_restaurant }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleLogin = (event) =>{
        event.preventDefault();

        const loginUser = {
            username: username,
            password: password
        }

        const reqObj = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: loginUser }),
        }
        
        fetch(API_LOGIN, reqObj)
          .then((res) => {
            const jsonPromise = res.json();
    
            if (res.ok) {
              return jsonPromise;
                }
    
            return jsonPromise.then((error) => {
              return Promise.reject(error);
                });
            })
          .then((user) => {
            login(user.user);
            history.push("/mainmenu");
            })
          .catch(({ error }) => {
            setError(error);
            });

    }

    return(
        <Container>
            <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable >
                
                    <Grid.Column>
                        <Form>
                        <Form.Input
                            icon='user'
                            iconPosition='left'
                            label='Username'
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Form.Input
                            icon='lock'
                            iconPosition='left'
                            label='Password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button content='Login' primary onClick={handleLogin}/>
                        <Header as='h4' color='red'>{error}</Header>
                        </Form>
                    </Grid.Column>
                
                    <Grid.Column verticalAlign='middle'>
                    <Button content='Sign up' icon='signup' size='big' />
                    </Grid.Column>
                
                </Grid>
                <Divider vertical>Or</Divider>
            </Segment>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch({ type: 'LOGIN_USER', user})
    }
}

export default connect(null, mapDispatchToProps)(Login)