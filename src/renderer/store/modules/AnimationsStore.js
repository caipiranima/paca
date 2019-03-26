// FIXME Carregar de arquivo JSON 
function loadAnimations() {
  return {
    animations: [
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
    lastAnimationID: 3
  }
}

const state = loadAnimations()

const getters = {
  animations() {
    return state.animations
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
