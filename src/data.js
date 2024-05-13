const ROLE = {
    ADMIN: 'admin',
    AGENT: 'agent'
}

/*const users = [
    { id: 'TSH-1', agent_name: 'JUAN SEBASTIAN VICTORIA BOLIVAR', team: 'THEORIGINALS', role: ROLE.ADMIN},
    { id: 'TSH-2', agent_name: 'CHRISTIAN PINEDA', team: 'LEGENDS', role: ROLE.AGENT},
    { id: 'TSH-3', agent_name: 'ALEX DURANGO', team: 'RANGERS', role: ROLE.AGENT},
    { id: 'TSH-4', agent_name: 'DANH DALIYONG', team: 'THEORIGINALS', role: ROLE.AGENT},
    { id: 'TSH-5', agent_name: 'JARED DEL CASTILLO', team: 'RANGERS', role: ROLE.AGENT}
];*/

/*const points = [
    { allocation_id: 'PA-1', from_agent_id: 'TSH-1', to_agent_id: 'TSH-2', points_given: 1},
    { allocation_id: 'PA-2', from_agent_id: 'TSH-3', to_agent_id: 'TSH-1', points_given: 1},
    { allocation_id: 'PA-3', from_agent_id: 'TSH-2', to_agent_id: 'TSH-3', points_given: 1}
];*/


const users = [
    { id: 1, name: 'JUAN SEBASTIAN VICTORIA BOLIVAR', team: 'THEORIGINALS', role: ROLE.ADMIN },
    { id: 2, name: 'CHRISTIAN PINEDA', team: 'LEGENDS', role: ROLE.AGENT },
    { id: 3, name: 'ALEX DURANGO', team: 'RANGERS', role: ROLE.AGENT },
    { id: 4, name: 'DANH DALIYONG', team: 'THEORIGINALS', role: ROLE.AGENT },
    { id: 5, name: 'JARED DEL CASTILLO', team: 'THEORIGINALS', role: ROLE.AGENT },
    { id: 6, name: 'DAVID ROSERO', team: 'THEORIGINALS', role: ROLE.ADMIN }
]

const projects = [
    { id: 1, name: "JUAN's Project", userId: 1 },
    { id: 2, name: "CHRISTIAN's Project", userId: 2 },
    { id: 3, name: "ALEX's Project", userId: 3 },
    { id: 4, name: "DANH's Project", userId: 4 },
    { id: 5, name: "JARED's Project", userId: 5 },
    { id: 6, name: "DAVID's Project", userId: 6 }
]

export { ROLE, users, projects };