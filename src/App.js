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

const HomepageHeading = () => (
  <Container text>
    <Header
      as='h1'
      content='Covid19 India Analytics'
      inverted
      style={{
        fontSize: '4em',
        fontWeight: 'normal',
        marginBottom: 0
      }}
    />
  </Container>
)


/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

const App = ({startAgeInput, endAgeInput, ageValue, onAgeCalculate}) => (
  <Segment style={{ padding: '8em 0em', borderBottomColor:'#fff' }} vertical>
    <Grid  container stackable verticalAlign='middle' >
      <Grid.Row>
        <Grid.Column width={8}>
        <div>
        <Header as='h2' attached='top'>
          Age calculator
        </Header>
        <Segment style={{width:'100%', paddingLeft:0, paddingRight:0, paddingBottom:0}} attached>
        <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
        <Grid.Column style={{width:'100%', paddingLeft:'5%', paddingRight:'5%'}} width={8}>
        <Header as='h3'>Enter start age</Header>

        <Input 
        style={{width:'50%', paddingLeft:'5%', paddingRight:'5%'}}
        laceholder=''
        onChange={(event,data)=>startAgeInput(data.value)} />
        </Grid.Column>
        <Grid.Column style={{width:'100%', paddingLeft:'5%', paddingRight:'5%'}} width={8}>
        <Header as='h3'>Enter end age</Header>
        <Input 
        style={{width:'50%', paddingLeft:'5%', paddingRight:'5%'}}
        placeholder=''
        onChange={(event,data)=>endAgeInput(data.value)} />
        </Grid.Column>
        </Grid.Row>
        
        
        <Grid.Row style={{width:'100%', paddingLeft:0, paddingRight:0}}>
        <Grid.Column textAlign='center' style={{width:'100%', padding:0}}>
          <Button 
          style={{width:'100%'}}
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
    } else {
    let startAgeValid = true
    let endAgeValid = true
    if(this.state.startAge.trim()!=="" && !(/^\d+$/.test(this.state.startAge))){
      startAgeValid=false
      alert("Start age should be valid")
    } else if(this.state.endAge.trim()!=="" && !(/^\d+$/.test(this.state.endAge))) {
      endAgeValid=false
      alert("End age should be valid")
    } else if((this.state.startAge !== "" && this.state.endAge !=="" ) 
      && startAgeValid && endAgeValid
      && parseInt(this.state.startAge)>parseInt(this.state.endAge)) {
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
  }
  
  render() {
    const { children } = this.props
    const { fixed } = this.state
    
    console.log(this.state)
    return (
      <div>
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
    position: 'fixed',
    left: 0,
    bottom: 0,
    height: 50,
    width: '100%',
    overflow: 'hidden',
  }}>
      <Container inverted >
        <Grid  inverted > 
          <Grid.Row inverted>
          <Header as='h4' inverted>
                Developer - Bhargav BV
              </Header>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
    </div>
    )
  }
}


export default DesktopContainer