// List of team acronyms
const teams = [
  'NE', 'LAC', 'CHI', 'DET', 'HOU', 'BUF', 'SEA', 'ARI', 'PIT', 'TEN', 'BAL', 'NO',
  'ATL', 'WAS', 'GB', 'MIA', 'DAL', 'CIN', 'KC', 'MIN', 'NYG', 'IND', 'DEN', 'TB',
  'PHI', 'JAX', 'LV', 'CLE', 'SF', 'NYJ', 'CAR', 'LAR'
];

// Load teams data from localStorage
const teamList = JSON.parse(localStorage.getItem('teams')) || [];

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
    if (remainingJerseys > 0) {
      teamList.push({ name: teamName, jerseyCount: 0 }); // Add new team with 0 jerseys initially
      localStorage.setItem('teams', JSON.stringify(teamList));
      document.getElementById('team-name').value = ''; // Clear input
      renderTeams();
    } else {
      alert('No remaining jerseys. Please adjust the count for other teams.');
    }
  } else {
    alert('Please enter a valid team acronym (e.g., NE, LAC, etc.)');
  }
}

function editJerseyCount(teamName) {
  const totalJerseys = teamList.reduce((total, team) => total + team.jerseyCount, 0);
  const remainingJerseys = 50 - totalJerseys;

  const team = teamList.find(t => t.name === teamName);
  const newCount = prompt(`Enter number of jerseys given (1-${remainingJerseys}):`, team ? team.jerseyCount : 0);
  
  if (newCount && newCount >= 1 && newCount <= remainingJerseys) {
    if (team) {
      team.jerseyCount = parseInt(newCount); // Update existing team jersey count
    } else {
      teamList.push({ name: teamName, jerseyCount: parseInt(newCount) }); // Add new team if it doesn't exist
    }
    
    localStorage.setItem('teams', JSON.stringify(teamList));
    renderTeams();
  } else {
    alert(`Please enter a valid number between 1 and ${remainingJerseys}`);
  }
}

// Initial render
renderTeams();
