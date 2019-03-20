const state = {
  films: [
    {
      id: 1,
      name: 'Pinocchio',
      //link: 'https://vimeo.com/235527477',
      link: '235527477',
      image: 'https://i.vimeocdn.com/video/657420157.jpg?mw=800&mh=450'
    },
    {
      id: 2,
      name: 'La Coda',
      //link: 'https://vimeo.com/235343086',
      link: '235343086',
      image: 'https://i.vimeocdn.com/video/657160343.jpg?mw=800&mh=450'
    },
    {
      id: 3,
      name: 'La Pista',
      //link: 'https://vimeo.com/235321322',
      link: '235321322',
      image: 'https://i.vimeocdn.com/video/657124624.jpg?mw=800&mh=450'
    }
  ]
}

const getters = {
  films() {
    return state.films
  }
}

export default {
  state,
  getters
}