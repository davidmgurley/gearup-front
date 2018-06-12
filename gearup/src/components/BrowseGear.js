import React, { Component } from 'react'
import { Card, Icon, Image, Grid , Button} from 'semantic-ui-react'



class BrowseGear extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      showCategories: true,
      categoryItems: []
    }
  }

  componentDidMount() {
    fetch('../gearCategories.json')
    .then(response => response.json())
    .then(response => this.setState({categories: response}))



  }

  loaditems = (event) => {
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
          <section id='browse-container'>

            {this.state.categories.map((category, index) => {
              return <Card key={index} onClick={(props) => this.loadItems(category.category.toLowerCase())}>
                <Image style={{height:'290px', width:'290px'}}src={category.image} />
                <Card.Content>
                  <Card.Header style={{textAlign: 'center', fontSize: '200%', fontWeight: 'bold'}}>{category.category}</Card.Header>
                </Card.Content>
              </Card>
            })}
          </section>
        :
        <section>
        {this.state.categoryItems.map((item,index) => {         
           return <Card key={index}>
              <Image style={{height:'290px', width:'290px'}} src={item.image_url} />
              <Card.Content>
                <Card.Header>{item.gear_type} - {item.manufacturer}</Card.Header>
                <Card.Description>{item.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Card.Header>${item.cost_per_day} per day - {item.available ? 'available' : 'unavailable'} </Card.Header>
              </Card.Content>
              <Button>Contact Now</Button>
            </Card>            
        })}
        </section>
       }
      </div>
    )
  }

}



export default BrowseGear
