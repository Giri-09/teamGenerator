import TeamsCard from '../TeamsCard'
import './index.css'

const TeamsList = props => {
  const {teams} = props

  return (
    <ul className="team-card-list">
      {teams.map((each, index) => (
        <TeamsCard key={index} namesList={each} indexName={index + 1} />
      ))}
    </ul>
  )
}

export default TeamsList
