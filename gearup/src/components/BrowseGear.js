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
    .then(response => this.setState({categories: response}, () => {console.log(this.state.categories)}))
  }

  render() {
    return (
      <div>
        <section id='browse-container'>
          {this.state.categories.map((category, index) => {
            return <Card key={index}>
              <Image style={{height:'290px', width:'290px'}}src={category.image} />
              <Card.Content>
                <Card.Header style={{textAlign: 'center', fontSize: '200%', fontWeight: 'bold'}}>{category.category}</Card.Header>
              </Card.Content>
            </Card>        
          })}
        </section>
      </div>
    )
  }

}



export default BrowseGear
