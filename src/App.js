import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Statistic,
  Input
} from 'semantic-ui-react'

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Covid19 India Analytics'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0
      }}
    />
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

const App = ({startAgeInput, endAgeInput, ageValue, onAgeCalculate}) => (
  <Segment style={{ padding: '8em 0em', borderBottomColor:'#fff' }} vertical>
    <Grid container stackable verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column width={8}>
        <div>
        <Header as='h2' attached='top'>
          Age calculator
        </Header>
        <Segment attached>
        <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
        <Grid.Column width={8}>
        <Header as='h3'>Enter start age</Header>
        </Grid.Column>
        <Grid.Column width={8}>
        <Header as='h3'>Enter end age</Header>
        </Grid.Column>
        </Grid.Row>
        
        <Grid.Row>
        <Grid.Column width={8}>
        <Input 
        laceholder=''
        onChange={(event,data)=>startAgeInput(data.value)} />
        </Grid.Column>
        <Grid.Column width={8}>
        <Input 
        placeholder=''
        onChange={(event,data)=>endAgeInput(data.value)} />
        </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column textAlign='center'>
          <Button 
          size='huge'
          onClick={()=>onAgeCalculate()}>Calculate</Button>
        </Grid.Column>
      </Grid.Row>
          </Grid>
          </Segment>
      </div>
        </Grid.Column>

       <Grid.Column width={8} style={{
         display:'flex',
         alignItems:'center'
       }}>
       <Statistic size='huge'>
      <Statistic.Label>Results</Statistic.Label>
      <Statistic.Value>{ageValue}</Statistic.Value>
    </Statistic>
       </Grid.Column>

      </Grid.Row>
      
    </Grid>
    
  </Segment>
)
class DesktopContainer extends Component {
  state = {
    startAge:'',
    endAge:'',
    ageValue: 0
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  startAgeInput = (text) => this.setState({startAge:text})
  endAgeInput = (text) => this.setState({endAge:text})
  onAgeCalculate = ()=>{
    if(this.state.startAge.trim()==="" && this.state.endAge.trim()==="")
    {
      alert("Both the fields cannot be empty")
    } else if(this.state.startAge.trim()!=="" && !(/^\d+$/.test(this.state.startAge))){
      alert("Start age should be valid")
    } else if(this.state.endAge.trim()!=="" && !(/^\d+$/.test(this.state.endAge))) {
      alert("End age should be valid")
    } else if((this.state.startAge !== "" && this.state.endAge !=="" ) && this.state.startAge>this.state.endAge) {
      alert("Start age should be smaller than end age")
    } else {
    fetch(`https://covid-india-analytics.herokuapp.com/calculateAge?startAge=${this.state.startAge}&endAge=${this.state.endAge}`)
    .then(response => response.json())
    .then(data =>
      this.setState({ageValue: data.ageCount})
    )
    .catch(error => 
      {console.log(error)
        alert("Error occurred")
      });
    }
  }
  
  render() {
    const { children } = this.props
    const { fixed } = this.state
    
    console.log(this.state)
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth} >
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 200, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        <App 
          startAgeInput={this.startAgeInput}
          endAgeInput={this.endAgeInput}
          ageValue={this.state.ageValue}
          onAgeCalculate={this.onAgeCalculate}/>

          <Segment inverted style={{ 
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 50,
    width: '100%',
    overflow: 'hidden',
  }}>
      <Container inverted style={{height: 50}}>
        <Grid  inverted style={{height: 50}}> 
          <Grid.Row inverted style={{height: 50}}>
          <Header as='h4' inverted>
                Developer - Bhargav BV
              </Header>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

export default DesktopContainer