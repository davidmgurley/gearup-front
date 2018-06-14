import React, { Component } from 'react'
import { Card, Icon, Image, Grid , Button, Divider, Tab } from 'semantic-ui-react'
import { Header, Modal } from 'semantic-ui-react'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

class BrowseGear extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      showCategories: true,
      categoryItems: [],
      open: false
    }
  }

  componentDidMount() {
    fetch('../gearCategories.json')
    .then(response => response.json())
    .then(response => this.setState({categories: response}))
  }

  loadItems = (event) => {
    fetch(`https://gear-up-backend.herokuapp.com/gear/category/${event}`)
    .then(response => response.json())
    .then(response => this.setState({
      categoryItems: response.gear,
      showCategories: false
    }))
    .then(response => console.log(this.state.categoryItems))
  }

  createNotification = (event) => {
      console.log('Working')
      NotificationManager.success('Your request has been sent', 'Success!')
  };

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {

    const { open, dimmer } = this.state

    return (
      <div className="browse-div">
        <NotificationContainer />
        { this.state.showCategories ?
          <section className='browse-container'>

            {this.state.categories.map((category, index) => {
              return <Card key={index} style={{marginTop:'30px', marginBottom:'10px', marginLeft:'1.5px', marginRight:'1.5px'}} onClick={(props) => this.loadItems(category.category.toLowerCase())}>
                <Image style={{height:'290px', width:'290px', border:'1px solid white'}}src={category.image} />
                <Card.Content>
                  <Card.Header style={{textAlign: 'center', fontSize: '200%'}}>{category.category}</Card.Header>
                </Card.Content>
              </Card>
            })}
          </section>
        :
        <section id="browse-items-by-category">
          <Button.Group floated='right'>
            {this.state.categories.map((category, index) => {
              return <Button color="black" key={index} style={{color: '#F7F9F9', height: '65px'}} onClick={(props) => this.loadItems(category.category.toLowerCase())}>{category.category}</Button>
            })}
          </Button.Group>
          <section className="item-cards">
            {this.state.categoryItems.map((item,index) => {
               return <Card key={index} style={{marginTop:'10px', marginBottom: '0', marginLeft: '30px', padding:'0'}}>
                  <Image style={{height:'290px', width:'290px'}} src={item.image_url} />
                  <Card.Content>
                    <Card.Header>{item.gear_type} - {item.manufacturer}</Card.Header>
                    <Card.Description style={{height: "60px", overflow:"auto"}}>{item.description}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Card.Header>${item.cost_per_day} per day - {item.available ? 'available' : 'unavailable'} </Card.Header>
                  </Card.Content>
                  <Button onClick={this.show(true)}>Contact Now!</Button>
                  <Modal className="modal"
                         style={{textAlign: "center"}}
                         basic size='small'
                         dimmer={dimmer}
                         open={open}
                         onClose={this.close}>
                    <Header content='Request to Rent' style={{fontSize: '250%'}} />
                    <Modal.Content >
                      <textarea rows="5" cols="50" placeholder="Message">
                      </textarea>
                    </Modal.Content>
                    <Modal.Actions style={{textAlign: "center"}}>
                      <Button basic color='red' inverted onClick={this.close}>
                        <Icon name='remove' /> Cancel
                      </Button>
                      <Button color='green' inverted onClick={(e) => {this.close(e); this.createNotification(e)}}>
                        <Icon name='checkmark' /> Send Message
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </Card>
              })}
          </section>

        </section>
       }
      </div>
    )
  }

}



export default BrowseGear
