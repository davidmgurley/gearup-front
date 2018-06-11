import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'


class BrowseGear extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
    }
  }

  componentDidMount() {
    fetch('../gearCategories.json')
    .then(response => response.json())
    .then(response => console.log(response))
  }

  render() {
    return (
      <div>
        <Card>
          <Image src='http://szzljy.com/images/camping/camping2.jpg' />
          <Card.Content>
            <Card.Header style={{textAlign: 'center', fontSize: '200%', fontWeight: 'bold'}}>Camp</Card.Header>
          </Card.Content>
        </Card>
      </div>
    )
  }

}



export default BrowseGear
