import './index.css'

const TeamsCard = props => {
  const {namesList, indexName} = props
  return (
    <li className="team-card">
      <h1 className="team-name">Team {indexName}:</h1>
      <ul className="names-list">
        {namesList.map((each, index) => (
          <li key={index} className="names-para">
            {each}
          </li>
        ))}
      </ul>
    </li>
  )
}

export default TeamsCard
