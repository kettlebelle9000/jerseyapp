// List of team acronyms
const teams = [
  'NE', 'LAC', 'CHI', 'DET', 'HOU', 'BUF', 'SEA', 'ARI', 'PIT', 'TEN', 'BAL', 'NO',
  'ATL', 'WAS', 'GB', 'MIA', 'DAL', 'CIN', 'KC', 'MIN', 'NYG', 'IND', 'DEN', 'TB',
  'PHI', 'JAX', 'LV', 'CLE', 'SF', 'NYJ', 'CAR', 'LAR'
];

// Load teams data from localStorage
const teamList = JSON.parse(localStorage.getItem('teams')) || [];

// Render the list of teams
function renderTeams() {
  const teamListElement = document.getElementById('team-list');
  const remainingJerseysElement = document.getElementById('remaining-jerseys');
  
  let totalJerseys = teamList.reduce((total, team) => total + team.jerseyCount, 0);
  let remainingJerseys = 50 - totalJerseys;

  // Clear the team list before rendering
  teamListElement.innerHTML = '';

  // Render the full list of teams and their jersey count
  teams.forEach((team) => {
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

function addTeam() {
  const teamName = document.getElementById('team-name').value.toUpperCase(); // Convert to uppercase
  let totalJerseys = teamList.reduce((total, team) => total + team.jerseyCount, 0);
  let remainingJerseys = 50 - totalJerseys;

  if (teams.includes(teamName) && !teamList.some(t => t.name === teamName)) {
    if (remainingJerseys > 0)
