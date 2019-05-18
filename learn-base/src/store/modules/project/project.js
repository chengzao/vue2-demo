import { getProject, getTask } from '@api/project'
import router from '@@/router'

const PROJECT_TASK = 'PROJECT_TASK'

const state = {
  project: {},
}
const getters = {}
const mutations = {
  [PROJECT_TASK](state, info) {
    console.log('res', info)
    state.project = info
  },
}
const actions = {
  // 详细信息
  async actionTask({ commit, state }, id) {
    let res = {}
    try {
      // 获取描述信息
      let { data } = await getProject(id)
      res.desc = data
      // 获取详细信息
      let tasks = await getTask(id)
      res.details = tasks.data
      commit(PROJECT_TASK, res)
    } catch (error) {
      res = { code: error }
      router.replace({ name: 'NotFound' })
    }
  },
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions,
}
