import axios from 'axios'

// TODO Adicionar o campo "Estúdio" 
const state = {
  animations: [],
  directors: [],
  countries: [],
  lastAnimationID: 0,
  lastDirectorID: 0,
  lastCountryID: 0
}

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
  },

  LOAD_LIBRARY(state, data) {
    data.animations.forEach(animation => {
      state.animations.push(animation)
    })
    data.directors.forEach(director => {
      state.directors.push(director)
    })
    data.countries.forEach(country => {
      state.countries.push(country)
    })
    state.lastAnimationID = data.lastAnimationID
    state.lastDirectorID = data.lastDirectorID
    state.lastCountryID = data.lastCountryID
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
  },

  loadLibrary({ commit }) {
    axios
      .get('http://caipiranima.com.br/paca/dados/biblioteca.json')
      .then(response => {
        commit('LOAD_LIBRARY', response.data)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
