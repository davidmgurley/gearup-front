import React, { Component } from 'react'
import { Card, Icon, Image, Button } from 'semantic-ui-react'


class PostGear extends Component {
  state = {
    postedItems: []
  }

  componentDidMount() {
    fetch(`https://gear-up-backend.herokuapp.com/gear/user/testemail@testemail.com`)
    .then(response => response.json())
    .then(response => this.setState({
      postedItems: response.gear,
    }))
    .then(response => console.log(this.state.postedItems))
  } 
  

  render() {
    return (
      <div>
        <h1> User Profile </h1>
        <Modal trigger={ <Button onClick={this.handleSignUpOpen} className='add-gear'>Add New Item</Button>} open={this.state.modalSignUpOpen}
        onClose={this.handleSignUpClose} basic size='small'>
          <Header Icon='add user' content='Sign Up' />
          <Modal.Content>
            <p>
              Enter your email address and new password to create an account.
            </p>
            <Form>
              <Form.Field>
                <label>Email Address</label>
                <input id='signup-email' placeholder='Email Address' />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input id='signup-password' type='password' placeholder='Password' />
              </Form.Field>
              <Button onClick={(event) => { this.props.signUp(event); this.handleSignUpClose(event); setTimeout(function () { this.visibleButton(event) }.bind(this), 500) } }>Submit</Button>
          </Form>
          </Modal.Content>
          <Modal.Actions>
          </Modal.Actions>
        </Modal>        
        <section>
          {this.state.postedItems.map((item,index) => {
            return <Card key={index}>
              <Image style={{height:'290px', width:'290px'}} src={item.image_url} />
              <Card.Content>
                <Card.Header>{item.gear_type} - {item.manufacturer}</Card.Header>
                <Card.Description>{item.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Card.Header>${item.cost_per_day} per day - {item.available ? 'available' : 'unavailable'} </Card.Header>
              </Card.Content>
              <Button>Edit</Button>
            </Card>
          })}        
        </section>
      </div>
    )
  }

}



export default PostGear