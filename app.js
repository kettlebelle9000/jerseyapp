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

// Render the list of teams and their jersey counts
function renderTeams() {
  const teamListElement = document.getElementById('team-list');
  teamListElement.innerHTML = ''; // Clear the list before rendering

  teamList.forEach((team) => {
    const teamItem = document.createElement('li');
    teamItem.classList.add('team-item');
    teamItem.innerHTML = `
      <strong>${team.name}</strong> - Jerseys Given: ${team.jerseyCount}
      <button onclick="editJerseyCount('${team.name}')">Edit</button>
    `;
    teamListElement.appendChild(teamItem);
  });
}

// Function to render the remaining jerseys and update the page
function renderUpdatedData(updatedTeams) {
  const remainingJerseysElement = document.getElementById('remaining-jerseys');
  
  // Calculate remaining jerseys after the update
  const totalJerseys = updatedTeams.reduce((total, team) => total + team.jerseyCount, 0);
  const remainingJerseys = 50 - totalJerseys;

  // Update the remaining jerseys display
  remainingJerseysElement.textContent = `Remaining Jerseys: ${remainingJerseys}`;
  
  // Re-render the team list
  renderTeams();
}

// Function to edit the jersey count for a team
function editJerseyCount(teamName) {
  const totalJerseys = teamList.reduce((total, team) => total + team.jerseyCount, 0);
  const remainingJerseys = 50 - totalJerseys;

  const team = teamList.find(t => t.name === teamName);
  const newCount = prompt(`Enter number of jerseys given (1-${remainingJerseys}):`, team ? team.jerseyCount : 0);

  // If the user clicks Cancel, return without making any changes
  if (newCount === null) {
    return; // Do nothing if the user cancels
  }

  // Parse the input as an integer
  const parsedCount = parseInt(newCount);

  // Check if the input is a valid number and within the range
  if (isNaN(parsedCount)) {
    alert(`Please enter a valid number between 1 and ${remainingJerseys}`);
    return; // Don't proceed if the input is not a number
  }

  // Check if the number is within the valid range
  if (parsedCount < 1 || parsedCount > remainingJerseys) {
    alert(`Please enter a number between 1 and ${remainingJerseys}`);
    return; // Don't proceed if the number is out of range
  }

  // Update the jersey count if the input is valid
  team.jerseyCount = parsedCount;

  // Save updated data to localStorage
  localStorage.setItem('teams', JSON.stringify(teamList));

  // Re-render the updated data
  renderUpdatedData(teamList);
}

// Initial render of teams when the page loads
document.addEventListener("DOMContentLoaded", function() {
  renderTeams(); // Render teams once the DOM is fully loaded
});
