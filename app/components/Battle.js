const React = require('react');
const PropTypes = require('prop-types');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }

    this.handlerChange = this.handlerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handlerChange(event) {
    var value = event.target.value;

    this.setState(function() {
     return {
       username: value
     }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render() {
    return (
      <form className='columns' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handlerChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
          Submit 
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

PlayerInput.defaultProps = {
  label: 'Username',
}

class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlerReset = this.handlerReset.bind(this);
  }
  handleSubmit(id,username){
    this.setState(function({}) {
      var newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = `https://github.com/${username}.png?size=200`;
      return newState;
      console.log(JSON.stringify(newState,null,2));
    });
    
  }
  handlerReset(id) {
    this.setState(function() {
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    })
  }
  render() {
    let match = this.props.match;
    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;
    let playerOneImage = this.state.playerOneImage;
    let playerTwoImage = this.state.playerTwoImage;

    return(
      <div>
        <div className='row'>
        {!playerOneName &&
          <PlayerInput 
            id = 'playerOne'
            label = 'Player One'
            onSubmit = {this.handleSubmit}
          />}
        
          {playerOneImage !== null && 
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}                            
            >
              <button 
                className='reset'
                onClick={this.handlerReset.bind(null, 'playerOne')}>
                  Reset
              </button>
            </PlayerPreview>
          }

        {!playerTwoName &&
          <PlayerInput 
            id = 'playerTwo'
            label = 'Player Two'
            onSubmit = {this.handleSubmit}
          />}
        
          {playerTwoImage !== null && 
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
              onReset={this.handlerReset}              
            >
              <button 
              className='reset'
              onClick={this.handlerReset.bind(null, 'playerTwo')}>
                Reset
            </button>
            </PlayerPreview>
          }

        </div>

        {playerOneImage && playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}
          >
          Battle
          </Link>
        }
      </div>
    );
  }
}

module.exports = Battle;