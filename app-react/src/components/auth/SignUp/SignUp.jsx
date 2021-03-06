import React, { Component } from 'react';
import AuthService from '../auth-service';
import { Tab, Form, Button, Icon, Grid, Divider, } from 'semantic-ui-react';
import './SignUp.css';
import NavBar from '../../dashboard/shared/NavBarLogged/NavBarLogged';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', username: '', password: ''};
    this.service = new AuthService();
    this.props.getUser();
  }

  handleFormSubmitDev = event => {
    event.preventDefault();
    const { name, username, password} = this.state;
    this.service
      .signupDev(name, username, password)
      .then(response => {
        this.setState({
          name: '',
          username: '',
          password: ''
        });
        this.props.getUser(response);
      })
      .catch(error => console.log(error));
  };

  handleFormSubmitEnt = event => {
    event.preventDefault();
    const { name, username, password } = this.state;
    this.service
      .signupEnt(name, username, password)
      .then(response => {
        this.setState({
          name: '',
          username: '',
          password: ''
        });
        this.props.getUser(response);
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const panes = [
      {
        menuItem: 'Developer',
        render: () => (
          <Tab.Pane>
            <Grid columns="equal">
              <Grid.Column>
                <Form onSubmit={this.handleFormSubmitDev} size="large">
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      name="name"
                      type="text"
                      label="Full Name"
                      placeholder="Your full name"
                      value={this.state.name}
                      onChange={e => this.handleChange(e)}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      name="username"
                      type="text"
                      label="Email"
                      placeholder="Your email"
                      value={this.state.username}
                      onChange={e => this.handleChange(e)}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="Create a password"
                      value={this.state.password}
                      onChange={e => this.handleChange(e)}
                    />
                  </Form.Group>
                  <Button type="submit" icon labelPosition="right" primary>
                    Submit
                    <Icon name="save" />
                  </Button>
                </Form>
              </Grid.Column>
              <Grid.Column width="1">
                <Divider vertical>Or</Divider>
              </Grid.Column>
              <Grid.Column id="Signup-Column" verticalAlign="middle">
                <Button id="Signup-Column-Item" color="facebook">
                  <Icon name="facebook" /> Facebook
                </Button>
                <Button id="Signup-Column-Item" color="github">
                  <Icon name="github" /> GitHub
                </Button>
                <Button id="Signup-Column-Item" color="linkedin">
                  <Icon name="linkedin" /> LinkedIn
                </Button>
              </Grid.Column>
            </Grid>
          </Tab.Pane>
        )
      },

      {
        menuItem: 'Enteprenurship',
        render: () => (
          <Tab.Pane>
            <Grid columns="equal">
              <Grid.Column>
                <Form onSubmit={this.handleFormSubmitEnt} size="large">
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      name="name"
                      type="text"
                      label="Full Name"
                      placeholder="Your full name"
                      value={this.state.name}
                      onChange={e => this.handleChange(e)}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      name="username"
                      type="text"
                      label="Email"
                      placeholder="Your email"
                      value={this.state.username}
                      onChange={e => this.handleChange(e)}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="Create a password"
                      value={this.state.password}
                      onChange={e => this.handleChange(e)}
                    />
                  </Form.Group>
                  <Button type="submit" icon labelPosition="right" primary>
                    Submit
                    <Icon name="save" />
                  </Button>
                </Form>
              </Grid.Column>
              <Grid.Column width={1}>
                <Divider vertical>Or</Divider>
              </Grid.Column>
              <Grid.Column id="Signup-Column" verticalAlign="middle">
                <Button id="Signup-Column-Item" color="facebook">
                  <Icon name="facebook" /> Facebook
                </Button>
                <Button id="Signup-Column-Item" color="linkedin">
                  <Icon name="linkedin" /> LinkedIn
                </Button>
              </Grid.Column>
            </Grid>
          </Tab.Pane>
        )
      }
    ];
    return (
      <div style={{ minWidth: '390px' }}>
        <Tab panes={panes} />
        <p>
          Already have account?
          <Link to={'/'}> Login</Link>
        </p>
      </div>
    );
  }
}

export default SignUp;
