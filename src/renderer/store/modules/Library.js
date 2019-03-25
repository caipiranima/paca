function loadInitialState() {
  return {
    films: [
      {
        id: 1,
        title: 'Pinocchio',
        director: 'Gianluigi Toccafondo',
        country: 'Itália',
        synopsis: 'Um filme',
        link: 'https://vimeo.com/235527477',
        image: 'https://i.vimeocdn.com/video/657420157.jpg?mw=800&mh=450'
      },
      {
        id: 2,
        title: 'La Coda',
        director: 'Gianluigi Toccafondo',
        country: 'Itália',
        synopsis: 'Um filme',
        link: 'https://vimeo.com/235343086',
        image: 'https://i.vimeocdn.com/video/657160343.jpg?mw=800&mh=450'
      },
      {
        id: 3,
        title: 'La Pista',
        director: 'Gianluigi Toccafondo',
        country: 'Itália',
        synopsis: 'Um filme',
        link: 'https://vimeo.com/235321322',
        image: 'https://i.vimeocdn.com/video/657124624.jpg?mw=800&mh=450'
      }
    ],
    lastFilmID: 3
  }
}

const state = loadInitialState()

const getters = {
  films() {
    return state.films
  }
}

const mutations = {
  ADD_FILM(state, film) {
    film.id = state.lastFilmID++
    state.films.push(film)
  }
}

const actions = {
  addFilm({ commit }, film) {
    commit('ADD_FILM', film)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
