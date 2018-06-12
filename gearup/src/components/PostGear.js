import React, { Component } from 'react'
import { Checkbox, TextArea, Card, Icon, Image, Button, Modal, Form, Header, Dropdown } from 'semantic-ui-react'

const gearCategories = [
  {text:'Camp',
   value:'Camp' ,
   image: {avatar:true, src:'http://szzljy.com/images/camping/camping2.jpg'}
  },
  {text:'Climb',
   value:'Climb' ,
   image: {avatar:true, src:'https://cdn.shopify.com/s/files/1/1554/2851/files/guisdebooks_pop2_580x.jpg'}
  },
  {text:'Cycle',
   value:'Cycle' ,
   image: {avatar:true, src:'https://pbs.twimg.com/media/DaHaELEUMAU8LEW.jpg'}
  },
  {text:'Paddle',
   value:'Paddle' ,
   image: {avatar:true, src:'https://upload.wikimedia.org/wikipedia/commons/9/96/Kayak_Playboat_ManchesterNH.jpg'}
  },
  {text:'Snow',
   value:'Hike' ,
   image: {avatar:true, src:'https://upload.wikimedia.org/wikipedia/commons/5/5d/Aviano_snowboarder_2.JPG'}
  },
  {text:'Camp',
   value:'Camp' ,
   image: {avatar:true, src:'http://honolulumagazine-images.dashdigital.com/images/2017/07-17/hike-of-the-month-ehukai-trail.jpg'}
  }
]

class PostGear extends Component {
  state = {
    postedItems: [],
    modalNewGearOpen: false
  }

  componentDidMount() {
    fetch(`https://gear-up-backend.herokuapp.com/gear/user/testemail@testemail.com`)
    .then(response => response.json())
    .then(response => this.setState({
      postedItems: response.gear,
    }))
    .then(response => console.log(this.state.postedItems))
  }

  handleNewGearOpen = (event) => this.setState({ modalNewGearOpen: true })
  handleNewGearClose = (event) => this.setState({ modalNewGearOpen: false })

  render() {
    return (
      <div>
        <h1> User Profile </h1>
        <Modal trigger={ <Button onClick={this.handleNewGearOpen} className='add-gear'>Add New Item</Button>} open={this.state.modalNewGearOpen}
        onClose={this.handleNewGearClose} basic size='small'>
          <Header Icon='add user' content='Add New Gear' />
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Image URL</label>
                <input id='new-gear-image-url' placeholder='Image Url' />
              </Form.Field>
              <Form.Field>
                <Dropdown id='new-gear-category' placeholder='Category' fluid selection options={ gearCategories } />
              </Form.Field>
              <Form.Field>
                <label>Gear Type</label>
                <input id='new-gear-gear-type' placeholder='Gear Type e.g. Tent' />
              </Form.Field>
              <Form.Field>
                <label>Manufacturer</label>
                <input id='new-gear-manufacturer' placeholder='Manufacturer' />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <TextArea id='new-gear-description' placeholder='Description' maxLength='140' />
              </Form.Field>
              <Form.Field>
                <label>Price per Day</label>
                <input id='new-gear-price' placeholder='Price Per Day' />
              </Form.Field>
              <Form.Field>
                <label>Availability</label>
                <Checkbox toggle id='new-gear-availability' />
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
