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

console.log("Team List after initial setup:", teamList); // Debugging line to see the loaded team list

// Render the list of teams and their jersey counts
function renderTeams() {
  const teamListElement = document.getElementById('team-list');
  const remainingJerseysElement = document.getElementById('remaining-jerseys');
  
  let totalJerseys = teamList.reduce((total, team) => total + team.jerseyCount, 0);
  let remainingJerseys = 50 - totalJerseys;

  // Debugging line to ensure the function is running
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
    teamListElement.appendChild(teamItem);
  });

  // Display remaining jerseys
  remainingJerseysElement.textContent = `Remaining Jerseys: ${remainingJerseys}`;
}

// Function to edit the jersey count for a team
function editJerseyCount(teamName) {
  const totalJerseys = teamList.reduce((total, team) => total + team.jerseyCount, 0);
  const remainingJerseys = 50 - totalJerseys;

  const team = teamList.find(t => t.name === teamName);
  const newCount = prompt(`Enter number of jerseys given (1-${remainingJerseys}):`, team ? team.jerseyCount : 0);

  if (newCount && newCount >= 1 && newCount <= remainingJerseys) {
    team.jerseyCount = parseInt(newCount); // Update team's jersey count
    localStorage.setItem('teams', JSON.stringify(teamList)); // Save updated data
    renderTeams(); // Re-render the team list
  } else {
    alert(`Please enter a valid number between 1 and ${remainingJerseys}`);
  }
}

// Initial render of teams when the page loads
renderTeams();
