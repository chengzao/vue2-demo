import { UPDATEPLATFORM, ISLOADING, UPDATEINFO } from '@store/constant/types'
export default {
  [UPDATEINFO](state, info) {
    state.info = info
  },
  [UPDATEPLATFORM](state, param) {
    state.isMobile = param
  },
  [ISLOADING](state, isLoading) {
    state.isLoading = isLoading
  },
}
