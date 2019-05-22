import { get } from './index'

export const getProject = id => {
  return get(`/api/project/id/${id}`)
}

export const getTask = id => {
  return get(`/api/project/task/${id}`)
}
