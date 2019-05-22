import axios from 'axios'

export default {
  fetchGithub: function () {
    return axios.get('https://api.github.com/users/chengzao')
  }
}
