import { defineStore } from 'pinia'

const tournaments = [
    {
        category: 'F',
        teams: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I' ],
        players: { min: 4, max: 7 },
        fields: [
            { name: '1', format: '4 v 4', players: 4, duration: 20 },
            { name: '2', format: '3 v 3', players: 3, duration: 20 },
            { name: '3', format: '4 v 4', players: 4, duration: 20 },
            { name: '4', format: '3 v 3', players: 3, duration: 20 },
            { name: '5', format: '3 v 3', players: 3, duration: 20 }
        ],
        matches: [
            { slot: 0, teams: ['H', 'B'], field: 0 },
            { slot: 0, teams: ['F', 'D'], field: 1 },
            { slot: 0, teams: ['G', 'C'], field: 2 },
            { slot: 0, teams: ['A', 'E'], field: 3 },
            { slot: 0, teams: ['I'], field: 4 },
            { slot: 1, teams: ['A', 'D'], field: 0 },
            { slot: 1, teams: ['B', 'I'], field: 1 },
            { slot: 1, teams: ['H', 'E'], field: 2 },
            { slot: 1, teams: ['F', 'C'], field: 3 },
            { slot: 1, teams: ['G'], field: 4 },
            { slot: 2, teams: ['B', 'C'], field: 0 },
            { slot: 2, teams: ['G', 'A'], field: 1 },
            { slot: 2, teams: ['I', 'F'], field: 2 },
            { slot: 2, teams: ['H', 'D'], field: 3 },
            { slot: 2, teams: ['E'], field: 4 },
            { slot: 3, teams: ['D', 'G'], field: 0 },
            { slot: 3, teams: ['E', 'I'], field: 1 },
            { slot: 3, teams: ['A', 'F'], field: 2 },
            { slot: 3, teams: ['C', 'H'], field: 3 },
            { slot: 3, teams: ['B'], field: 4 },
            { slot: 4, teams: ['I', 'A'], field: 0 },
            { slot: 4, teams: ['B', 'G'], field: 1 },
            { slot: 4, teams: ['H', 'F'], field: 2 },
            { slot: 4, teams: ['E', 'D'], field: 3 },
            { slot: 4, teams: ['C'], field: 4 },
            { slot: 5, teams: ['B', 'E'], field: 0 },
            { slot: 5, teams: ['A', 'H'], field: 1 },
            { slot: 5, teams: ['C', 'D'], field: 2 },
            { slot: 5, teams: ['G', 'I'], field: 3 },
            { slot: 5, teams: ['F'], field: 4 },
            { slot: 6, teams: ['E', 'I'], field: 0 },
            { slot: 6, teams: ['C', 'A'], field: 1 },
            { slot: 6, teams: ['C', 'D'], field: 2 },
            { slot: 6, teams: ['G', 'I'], field: 3 },
            { slot: 6, teams: ['D'], field: 4 }
        ]
    },
    {
        category: 'F',
        teams: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ],
        players: { min: 4, max: 7 },
        fields: [
            { name: '1', format: '4 v 4', players: 4, duration: 20 },
            { name: '2', format: '3 v 3', players: 3, duration: 20 },
            { name: '3', format: '4 v 4', players: 4, duration: 20 },
            { name: '4', format: '3 v 3', players: 3, duration: 20 },
            { name: '5', format: '4 v 4', players: 4, duration: 20 }
        ],
        matches: [
            { slot: 0, teams: ['J', 'H'], field: 0 },
            { slot: 0, teams: ['B', 'G'], field: 1 },
            { slot: 0, teams: ['A', 'I'], field: 2 },
            { slot: 0, teams: ['F', 'C'], field: 3 },
            { slot: 0, teams: ['D', 'E'], field: 4 },
            { slot: 1, teams: ['B', 'I'], field: 0 },
            { slot: 1, teams: ['E', 'F'], field: 1 },
            { slot: 1, teams: ['D', 'G'], field: 2 },
            { slot: 1, teams: ['C', 'H'], field: 3 },
            { slot: 1, teams: ['A', 'J'], field: 4 },
            { slot: 2, teams: ['C', 'D'], field: 0 },
            { slot: 2, teams: ['A', 'H'], field: 1 },
            { slot: 2, teams: ['J', 'F'], field: 2 },
            { slot: 2, teams: ['G', 'I'], field: 3 },
            { slot: 2, teams: ['B', 'E'], field: 4 },
            { slot: 3, teams: ['A', 'E'], field: 0 },
            { slot: 3, teams: ['I', 'J'], field: 1 },
            { slot: 3, teams: ['H', 'B'], field: 2 },
            { slot: 3, teams: ['F', 'D'], field: 3 },
            { slot: 3, teams: ['G', 'C'], field: 4 },
            { slot: 4, teams: ['I', 'C'], field: 0 },
            { slot: 4, teams: ['G', 'E'], field: 1 },
            { slot: 4, teams: ['H', 'D'], field: 2 },
            { slot: 4, teams: ['J', 'B'], field: 3 },
            { slot: 4, teams: ['A', 'F'], field: 4 },
            { slot: 5, teams: ['E', 'H'], field: 0 },
            { slot: 5, teams: ['D', 'I'], field: 1 },
            { slot: 5, teams: ['C', 'J'], field: 2 },
            { slot: 5, teams: ['B', 'A'], field: 3 },
            { slot: 5, teams: ['G', 'F'], field: 4 },
            { slot: 6, teams: ['B', 'F'], field: 0 },
            { slot: 6, teams: ['J', 'D'], field: 1 },
            { slot: 6, teams: ['I', 'H'], field: 2 },
            { slot: 6, teams: ['A', 'C'], field: 3 },
            { slot: 6, teams: ['G', 'E'], field: 4 }
        ]
    }
]

export const useTournamentStore = defineStore({
    id: 'tournament',
    state: () => ({
        team: 'A',
        active: null
    }),
    getters: {
        allTournaments() {
            return tournaments.map(t => ({ ...t, title: t.category + ' / ' + t.teams.length + " Teams" }))
        }
    },
    actions: {
        startTournament(tournament, team, players) {
            this.active = {
                team,
                players,
                category: tournament.category,
                nextMatch: 0,
                matches: tournament.matches.filter(m => m.teams.includes(team)).map(m => ({
                    duration: tournament.fields[m.field].duration,
                    teams: m.teams,
                    field: tournament.fields[m.field].name,
                    format: {
                        name: tournament.fields[m.field].format,
                        players: tournament.fields[m.field].players
                    }
                })),
                nextMatch: 0
            };
        },
        nextMatch() {
            this.active.nextMatch++
        }
    }
})