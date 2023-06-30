import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayersView from '../views/PlayersView.vue'
import TournamentSetupView from '../views/TournamentSetupView.vue'
import TournamentsView from '../views/TournamentsView.vue'
import ActiveTournamentView from '../views/ActiveTournamentView.vue'
import ActiveMatchView from '../views/ActiveMatchView.vue'
import { useTournamentStore } from '../stores/tournament'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/players',
      name: 'players',
      component: PlayersView
    },
    {
      path: '/tournaments',
      name: 'tournaments',
      component: TournamentsView
    },
    {
      path: '/tournaments/setup',
      name: 'setup',
      component: TournamentSetupView
    },
    {
      path: '/tournaments/active',
      name: 'active',
      component: ActiveTournamentView,
      beforeEnter: (to, from) => {
        const store = useTournamentStore()
        if (!store.active) {
          return '/'
        }
        return true
      }
    },
    {
      path: '/tournaments/active/:index',
      name: 'active-match',
      component: ActiveMatchView,
      beforeEnter: (to, from) => {
        const store = useTournamentStore()
        if (!store.active) {
          return '/'
        }
        return true
      }
    }
  ]
})

export default router
