import {Component} from 'react'
import TeamsList from '../TeamsList'
import './index.css'

class TeamGeneratorHome extends Component {
  state = {
    names: '',
    number: '',
    isError: false,
    errorMsg: '',
    teams: [],
  }

  onSubmitNames = event => {
    event.preventDefault()
    const {names, number} = this.state
    const namesList = names.split('\n').filter(each => each.trim().length)
    console.log(namesList)
    if (names !== '' && number !== '' && number <= namesList.length) {
      this.getShuffledList(namesList)
      const teamsList = this.splitArrayIntoChunks(namesList, parseInt(number))
      this.getShuffledList(teamsList)
      this.setState({
        teams: teamsList,
        isError: false,
      })
    } else if (number > namesList.length) {
      this.setState({
        isError: true,
        errorMsg: 'Enter the numbers of teams appropriately',
        teams: [],
      })
    } else if (names === '' || number === '') {
      this.setState({
        isError: true,
        errorMsg: 'Enter the inputs without leaving empty',
        teams: [],
      })
    }
  }

  splitArrayIntoChunks = (players, numTeams) => {
    const teams = Array.from({length: numTeams}, () => [])
    for (let i = 0; i < players.length; i++) {
      const teamIndex = i % numTeams
      teams[teamIndex].push(players[i])
    }
    return teams
  }

  getShuffledList = players => {
    return players.sort(() => Math.random() - 0.5)
  }

  onChangeNames = event => {
    this.setState({names: event.target.value})
  }

  onChangeNumber = event => {
    this.setState({number: event.target.value})
  }
  renderForm = () => {
    const {names, number, isError, errorMsg} = this.state
    return (
      <form className="form-container" onSubmit={this.onSubmitNames}>
        <label className="names-input-label" htmlFor="names">
          Enter names:
        </label>
        <textarea
          rows="10"
          cols="70"
          id="names"
          placeholder="Enter the user names with each name separated by a
new line"
          value={names}
          className="names-input"
          onChange={this.onChangeNames}
        />
        <div className="number-input-container">
          <label className="number-label" htmlFor="number">
            Enter the number of teams:
          </label>
          <input
            type="number"
            id="number"
            min="1"
            placeholder="Enter number"
            className="number-input"
            onChange={this.onChangeNumber}
            value={number}
          />
        </div>
        <div className="button-container">
          <button type="submit" className="button">
            Generate
          </button>
        </div>
        {isError && <p className="empty-text">*{errorMsg}</p>}
      </form>
    )
  }

  render() {
    const {teams} = this.state
    return (
      <div className="home-background">
        <div className="form-card">
          <h1 className="heading">Random Team Generator</h1>
          {this.renderForm()}
        </div>
        <hr className="horizontal-line" />
        <TeamsList teams={teams} />
      </div>
    )
  }
}
export default TeamGeneratorHome
