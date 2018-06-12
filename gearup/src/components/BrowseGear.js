import React, { Component } from 'react'
import { Card, Icon, Image, Grid } from 'semantic-ui-react'



class BrowseGear extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      showCategories: true,
      showItems: false,
      categorySelected: ''
    }
  }

  componentDidMount() {
    fetch('../gearCategories.json')
    .then(response => response.json())
    .then(response => this.setState({categories: response}, () => {console.log(this.state.categories)}))


    fetch(`https://gear-up-backend.herokuapp.com/gear`)
    .then(response => response.json())
    // .then(response => console.log(response.gear))
  }

  logInfo = (event) => {
    console.log(event)
  }

  render() {
    return (
      <div>
        { this.state.showCategories ?
          <section id='browse-container'>

            {this.state.categories.map((category, index) => {
              return <Card key={index} onClick={(props) => this.logInfo(category.category.toLowerCase())}>
                <Image style={{height:'290px', width:'290px'}}src={category.image} />
                <Card.Content>
                  <Card.Header style={{textAlign: 'center', fontSize: '200%', fontWeight: 'bold'}}>{category.category}</Card.Header>
                </Card.Content>
              </Card>
            })}
          </section>
        : null }
      </div>
    )
  }

}



export default BrowseGear
