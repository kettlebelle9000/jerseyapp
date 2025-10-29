// List of team acronyms
const teams = [
  'NE', 'LAC', 'CHI', 'DET', 'HOU', 'BUF', 'SEA', 'ARI', 'PIT', 'TEN', 'BAL', 'NO',
  'ATL', 'WAS', 'GB', 'MIA', 'DAL', 'CIN', 'KC', 'MIN', 'NYG', 'IND', 'DEN', 'TB',
  'PHI', 'JAX', 'LV', 'CLE', 'SF', 'NYJ', 'CAR', 'LAR'
];

const teamList = JSON.parse(localStorage.getItem('teams')) || [];

function renderTeams() {
  const teamListElement = document.getElementById('team-list');
  const remainingJerseysElement = document.getElementById('remaining-jerseys');
  let totalJerseys = teamList.reduce((total, team) => total + team.jerseyCount, 0);
  let remainingJerseys = 50 - totalJerseys;

  teamListElement.innerHTML = '';
  
  teamList.forEach((team, index) => {
    const teamItem = document.createElement('li');
    teamItem.classList.add('team-item');
    teamItem.innerHTML = `
      <strong>${team.name}</strong> - Jerseys Given: ${team.jerseyCount}
      <button onclick="editJerseyCount(${index})">Edit</button>
    `;
    teamListElement.appendChild(teamItem);
  });

  remainingJerseysElement.textContent = `Remaining Jerseys: ${remainingJerseys}`;
}

function addTeam() {
  const teamName = document.getElementById('team-name').value.toUpperCase(); // Convert to uppercase
  let totalJerseys = teamList.reduce((total, team) => total + team.jerseyCount, 0);
  let remainingJerseys = 50 - totalJerseys;

  if (teams.includes(teamName) && !teamList.some(t => t.name === teamName)) {
    if (remainingJerseys > 0) {
      let jerseyCount = 1; // Default to 1 for new team
      teamList.push({ name: teamName, jerseyCount: jerseyCount });
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

function editJerseyCount(index) {
  const totalJerseys = teamList.reduce((total, team) => total + team.jerseyCount, 0);
  const remainingJerseys = 50 - totalJerseys;

  const newCount = prompt(`Enter number of jerseys given (1-${remainingJerseys}):`, teamList[index].jerseyCount);
  if (newCount && newCount >= 1 && newCount <= remainingJerseys) {
    teamList[index].jerseyCount = parseInt(newCount);
    localStorage.setItem('teams', JSON.stringify(teamList));
    renderTeams();
  } else {
    alert(`Please enter a valid number between 1 and ${remainingJerseys}`);
  }
}

// Initial render
renderTeams();
