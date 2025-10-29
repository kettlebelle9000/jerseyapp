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

// Function to calculate remaining jerseys dynamically based on the team data
function calculateRemainingJerseys() {
  const totalJerseys = teamList.reduce((total, team) => total + team.jerseyCount, 0);
  return 50 - totalJerseys; // Return the number of remaining jerseys
}

// Render the list of teams and their jersey counts
function renderTeams() {
  const teamListElement = document.getElementById('team-list');
  const remainingJerseysElement = document.getElementById('remaining-jerseys');

  // Calculate the remaining jerseys dynamically
  const remainingJerseys = calculateRemainingJerseys();

  // Clear the team list before rendering (to avoid duplicate rendering)
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
  const remainingJerseys = calculateRemainingJerseys();

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
  renderTeams(); // Force page update
}

// Initial render of teams when the page loads
document.addEventListener("DOMContentLoaded", function() {
  // After data is loaded, calculate remaining jerseys and render teams
  renderTeams(); // Render teams once the DOM is fully loaded
});
