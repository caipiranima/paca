import path from 'path'
import fs from 'fs'

const state = {
  animations: [],
  directors: [],
  countries: [],
  studios: [],
  lastAnimationID: 0,
  lastDirectorID: 0,
  lastCountryID: 0,
  lastStudioID: 0
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
  },

  studios() {
    return state.studios
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

  ADD_STUDIO(state, studio) {
    studio.id = ++state.lastStudioID
    state.studios.push(studio)
  },

  DELETE_STUDIO(state, index) {
    state.studios.splice(index, 1)
  },

  EDIT_STUDIO(state, studio) {
    Object.assign(state.studios[studio.index], studio.object)
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
    data.studios.forEach(studio => {
      state.studios.push(studio)
    })
    state.lastAnimationID = data.lastAnimationID
    state.lastDirectorID = data.lastDirectorID
    state.lastCountryID = data.lastCountryID
    state.lastStudioID = data.lastStudioID
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

  addStudio({ commit }, studio) {
    commit('ADD_STUDIO', studio)
  },

  deleteStudio({ commit }, index) {
    commit('DELETE_STUDIO', index)
  },

  editStudio({ commit }, studio) {
    commit('EDIT_STUDIO', studio)
  },

  loadLibrary({ commit }) {
    const filePath = path.join(__static, 'biblioteca.json')

    fs.readFile(filePath, { flag: 'r' }, (err, data) => {
      try {
        commit('LOAD_LIBRARY', JSON.parse(data))
      } catch (e) {}
    })
  },

  saveLibrary({ commit }) {
    const filePath = path.join(__static, 'biblioteca.json')

    fs.writeFile(filePath, JSON.stringify(state), err => {
      if (err) throw err
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
