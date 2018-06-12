import _ from 'lodash'
import React, { Component } from 'react'
import { Card, Icon, Image, Grid , Button, Divider, Tab } from 'semantic-ui-react'
import { Header, Modal } from 'semantic-ui-react'

class BrowseGear extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      showCategories: true,
      categoryItems: [],
      closeModal: false
    }
  }

  componentDidMount() {
    fetch('../gearCategories.json')
    .then(response => response.json())
    .then(response => this.setState({categories: response}))



  }

  loadItems = (event) => {
    // console.log(event)
    fetch(`https://gear-up-backend.herokuapp.com/gear/category/${event}`)
    .then(response => response.json())
    .then(response => this.setState({
      categoryItems: response.gear,
      showCategories: false
    }))
    .then(response => console.log(this.state.categoryItems))
  }



  render() {

    return (
      <div>
        { this.state.showCategories ?
          <section className='browse-container'>

            {this.state.categories.map((category, index) => {
              return <Card key={index} style={{marginTop:'10px', marginBottom:'0'}} onClick={(props) => this.loadItems(category.category.toLowerCase())}>
                <Image style={{height:'290px', width:'290px'}}src={category.image} />
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
              return <Button color="brown" style={{color: '#F7F9F9', height: '65px'}} onClick={(props) => this.loadItems(category.category.toLowerCase())}>{category.category}</Button>
            })}
          </Button.Group>
          <section className="item-cards">
            {this.state.categoryItems.map((item,index) => {
               return <Card key={index} style={{marginTop:'10px', marginBottom: '0', padding:'0'}}>
                  <Image style={{height:'290px', width:'290px'}} src={item.image_url} />
                  <Card.Content>
                    <Card.Header>{item.gear_type} - {item.manufacturer}</Card.Header>
                    <Card.Description>{item.description}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Card.Header>${item.cost_per_day} per day - {item.available ? 'available' : 'unavailable'} </Card.Header>
                  </Card.Content>

                  <Modal className="modal" trigger={<Button>Contact Now!</Button>} style={{textAlign: "center"}} basic size='small'>
                    <Header content='Request to Rent' />
                    <Modal.Content >
                      <textarea rows="5" cols="50" placeholder="Message">
                      </textarea>
                    </Modal.Content>
                    <Modal.Actions style={{textAlign: "center"}}>
                      <Button basic color='red' inverted onClick={this.setState({closeModal: true})}>
                        <Icon name='remove' /> Cancel
                      </Button>
                      <Button color='green' inverted>
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
