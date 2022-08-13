const teamsDB = {}

const bootstrap = (userID) => {
    teamsDB[userID] = []
}

const getTeamUser = (userID) => {
    return teamsDB[userID]
}

const addPoke = (userID, pokemonObj) => {
    teamsDB[userID].push(pokemonObj)
}

const setTeam = (userID, allTeam) => {
    teamsDB[userID]= allTeam
}

module.exports = {bootstrap, addPoke, setTeam, getTeamUser}