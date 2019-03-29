// FIXME Carregar de arquivo JSON 
function loadAnimations() {
  return {
    animations: [
      {
        id: 1,
        title: 'Pinocchio',
        directors: [ 1, 2 ],
        countries: [ 1 ],
        synopsis: 'Um filme',
        link: 'https://vimeo.com/235527477',
        image: 'https://i.vimeocdn.com/video/657420157.jpg?mw=800&mh=450',
        tags: []
      },
      {
        id: 2,
        title: 'La Coda',
        directors: [ 1 ],
        countries: [ 1 ],
        synopsis: 'Um filme',
        link: 'https://vimeo.com/235343086',
        image: 'https://i.vimeocdn.com/video/657160343.jpg?mw=800&mh=450',
        tags: []
      },
      {
        id: 3,
        title: 'La Pista',
        directors: [ 1 ],
        countries: [ 1 ],
        synopsis: 'Um filme',
        link: 'https://vimeo.com/235321322',
        image: 'https://i.vimeocdn.com/video/657124624.jpg?mw=800&mh=450',
        tags: []
      }
    ],
    lastAnimationID: 3,
    directors: [
      {
        id: 1,
        name: 'Gianluigi Toccafondo',
        countries: [ 1 ],
        biography: 'Um animador italiano',
        image: 'http://www.acmefilmworks.com/wp-content/uploads/director-thumbs/gianluigi-toccafondo.jpg'
      },
      {
        id: 2,
        name: 'Bruno Bozzetto',
        countries: [ 1 ],
        biography: 'Um animador italiano',
        image: 'http://www.acmefilmworks.com/wp-content/uploads/director-thumbs/gianluigi-toccafondo.jpg'
      }
    ],
    lastDirectorID: 1,
    countries: [
      {
        id: 1,
        name: 'Itália',
        history: 'A história da animação italiana é fodona',
        image: 'http://www.firenze.net/it/img-contenuti/max_10171151333155.jpg'
      }
    ],
    lastCountryID: 1
  }
}

const state = loadAnimations()

const getters = {
  animations() {
    return state.animations
  },

  directors() {
    return state.directors
  },

  countries() {
    return state.countries
  }
}

const mutations = {
  ADD_ANIMATION(state, animation) {
    animation.id = ++state.lastAnimationID
    state.animations.push(animation)
  },

  DELETE_ANIMATION(state, index) {
    state.animations.splice(index, 1)
  },

  EDIT_ANIMATION(state, animation) {
    Object.assign(state.animations[animation.index], animation.object)
  },

  ADD_DIRECTOR(state, director) {
    director.id = ++state.lastDirectorID
    state.directors.push(director)
  },

  DELETE_DIRECTOR(state, index) {
    state.directors.splice(index, 1)
  },

  EDIT_DIRECTOR(state, director) {
    Object.assign(state.directors[director.index], director.object)
  },

  ADD_COUNTRY(state, country) {
    country.id = ++state.lastCountryID
    state.countries.push(country)
  },

  DELETE_COUNTRY(state, index) {
    state.countries.splice(index, 1)
  },

  EDIT_COUNTRY(state, country) {
    Object.assign(state.countries[country.index], country.object)
  }
}

const actions = {
  addAnimation({ commit }, animation) {
    commit('ADD_ANIMATION', animation)
  },

  deleteAnimation({ commit }, index) {
    commit('DELETE_ANIMATION', index)
  },

  editAnimation({ commit }, animation) {
    commit('EDIT_ANIMATION', animation)
  },

  addDirector({ commit }, director) {
    commit('ADD_DIRECTOR', director)
  },

  deleteDirector({ commit }, index) {
    commit('DELETE_DIRECTOR', index)
  },

  editDirector({ commit }, director) {
    commit('EDIT_DIRECTOR', director)
  },

  addCountry({ commit }, country) {
    commit('ADD_COUNTRY', country)
  },

  deleteCountry({ commit }, index) {
    commit('DELETE_COUNTRY', index)
  },

  editCountry({ commit }, country) {
    commit('EDIT_COUNTRY', country)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
