import React, { Component } from 'react';
import AuthService from '../../auth/auth-service';
import { Link } from 'react-router-dom';

import { Form, Button, Grid } from 'semantic-ui-react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
    console.log(this.props.getUser)
  }

  handleFormSubmit = event => {
    event.preventDefault();
    
    const { username, password } = this.state;
    this.service
      .login(username, password)
      .then(response => {
        this.setState({ username: '', password: '' });
        this.props.getUser(response);
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (      
      <Grid.Column width={10}>
      {console.log(this.props)}
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Field>
            <Form.Input
              fluid
              name="username"
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={e => this.handleChange(e)}
            />
            <Form.Input
              fluid
              name="password"
              type="password"
              placeholder="User password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
            />
          </Form.Field>
          <Button type="submit" primary>
            Get in!
          </Button>
        </Form>
        <p>Don't have account? 
            <Link to={"/signup"}> Signup</Link>
        </p>
      </Grid.Column>
    );
  }
}

export default Login;