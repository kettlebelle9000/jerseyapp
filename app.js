// List of team acronyms (we'll use this list to display teams)
const teams = [
  'NE', 'LAC', 'CHI', 'DET', 'HOU', 'BUF', 'SEA', 'ARI', 'PIT', 'TEN', 'BAL', 'NO',
  'ATL', 'WAS', 'GB', 'MIA', 'DAL', 'CIN', 'KC', 'MIN', 'NYG', 'IND', 'DEN', 'TB',
  'PHI', 'JAX', 'LV', 'CLE', 'SF', 'NYJ', 'CAR', 'LAR'
];

// Load teams data from localStorage (to persist jersey counts between sessions)
const teamList = JSON.parse(localStorage.getItem('teams')) || [];

// Render the list of teams and their jersey counts
function renderTeams() {
  const teamListElement = document.getElementById('team-list');
  const remainingJerseysElement = document.getElementById('remaining-jerseys');
  
  let totalJerseys = teamList.reduce((total, team) => total + team.jerseyCount, 0);
  let remainingJerseys = 50 - totalJerseys;

  // Clear the team list before rendering
  teamListElement.innerHTML = '';

  // Render the full list of teams and their jersey count
  teams.forEach((team) => {
    // Find the team in the team list, or set default jersey count as 0
    const teamData = teamList.find(t => t.name === team) || { name: team, jerseyCount: 0 };

    const teamItem = document.createElement('li');
    teamItem.classList.add('team-item');
    teamItem.innerHTML = `
      <strong>${teamData.name}</strong> - Jerseys Given: ${teamData.jerseyCount}
      <button onclick="editJerseyCount('${teamData.name}')">Edit</button>
    `;
    teamListElement.appendChild(teamItem);
  });

  // Display remaining jerseys
  remainingJerseysElement.textContent = `Remaining Jerseys: ${remainingJerseys}`;
}

// Function to edit the jersey count for a team
function editJerseyCount(teamName) {
  const totalJerseys = teamList.reduce((total, team) => total + team.jerseyCount, 0);
  const remainingJerseys = 50 - totalJerseys;

  // Find the team from the list
  const team = teamList.find(t => t.name === teamName);
  
  // Prompt the user to enter a new jersey count
  const newCount = prompt(`Enter number of jerseys given (1-${remainingJerseys}):`, team ? team.jerseyCount : 0);
  
  if (newCount && newCount >= 1 && newCount <= remainingJerseys) {
    if (team) {
      team.jerseyCount = parseInt(newCount); // Update existing team's jersey count
    } else {
      teamList.push({ name: teamName, jerseyCount: parseInt(newCount) }); // Add new team if it doesn't exist
    }
    
    // Save the updated team list to localStorage
    localStorage.setItem('teams', JSON.stringify(teamList));

    // Re-render the teams list
    renderTeams();
  } else {
    alert(`Please enter a valid number between 1 and ${remainingJerseys}`);
  }
}

// Initial render of teams when the page loads
renderTeams();
