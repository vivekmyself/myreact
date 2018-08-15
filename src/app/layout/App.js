import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/navBar/NavBar'
import EventDashboard from '../../features/event/eventDashboard/EventDashboard'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Container className='main'>
          <NavBar />

          <EventDashboard />
        </Container>

      </div>
    )
  }
}

export default App
