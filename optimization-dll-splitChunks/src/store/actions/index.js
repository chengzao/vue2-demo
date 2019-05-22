import { getProject, getTask } from '@api/project'
import { UPDATEINFO } from '@store/constant/types'
import router from '@@/router'

export default {
  // async wait
  async Action1({ commit }, { data, id }) {
    try {
      let res = await getTask(id)
      let detail = res.data
      commit(UPDATEINFO, { data, detail })
    } catch (error) {
      router.replace({ name: 'NotFound' })
    }
  },
  // get id
  async Action2({ dispatch }, id) {
    try {
      let { data } = await getProject(id)
      await dispatch('Action1', { data, id })
    } catch (error) {
      router.replace({ name: 'NotFound' })
    }
  },
}
