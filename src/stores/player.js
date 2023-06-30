import { defineStore } from 'pinia'

export const usePlayerStore = defineStore({
  id: 'player',
  state: () => ({
    players: [ ].sort((a, b) => a.title.localeCompare(b.title)),
    loading: false,
    error: null
  }),
  getters: {
  }, 
  actions: {
    setPlayers(players) {
      this.players = players
    },
    addPlayer(player) {
      this.players.push(player)
      this.players.sort((a, b) => a.title.localeCompare(b.title))
    },
    removePlayer(idx) {
      this.players.splice(idx, 1)
    }
  }
})