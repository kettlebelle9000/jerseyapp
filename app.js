// List of team acronyms
const teams = [
  'NE', 'LAC', 'CHI', 'DET', 'HOU', 'BUF', 'SEA', 'ARI', 'PIT', 'TEN', 'BAL', 'NO',
  'ATL', 'WAS', 'GB', 'MIA', 'DAL', 'CIN', 'KC', 'MIN', 'NYG', 'IND', 'DEN', 'TB',
  'PHI', 'JAX', 'LV', 'CLE', 'SF', 'NYJ', 'CAR', 'LAR'
];

// Load teams data from localStorage (to persist jersey counts between sessions)
let teamList = JSON.parse(localStorage.getItem('teams')) || [];

// Ensure every team has an initial jersey count of 0 if it's not yet added
teams.forEach((team) => {
  if (!teamList.some(t => t.name === team)) {
    teamList.push({ name: team, jerseyCount: 0 });
  }
});

// Debugging: Check what is inside teamList after initial setup
console.log("Initial Team List:", teamList);

// Render the list of teams and their jersey counts
function renderTeams() {
  const teamListElement = document.getElementById('team-list');
  const remainingJerseysElement = document.getElementById('remaining-jerseys');

  let totalJerseys = teamList.reduce((total, team) => total + team.jerseyCount, 0);
  let remainingJerseys = 50 - totalJerseys;

  // Debugging: Check that renderTeams is running
  console.log("Rendering Teams...");

  // Clear the team list before rendering
  teamListElement.innerHTML = '';

  // Render the full list of teams and their jersey count
  teamList.forEach((team) => {
    const teamItem = document.createElement('li');
    teamItem.classList.add('team-item');
    teamItem.innerHTML = `
      <strong>${team.name}</strong> - Jerseys Given: ${team.jerseyCount}
      <button onclick="editJerseyCount('${team.name}')">Edit</button>
    `;
    teamListElement.appendChild(teamIte
