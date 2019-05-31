import Mock from 'mockjs'
import { getUserInfo, getTask } from './response/project'
const Random = Mock.Random

Mock.mock(RegExp('/api/project/id/' + '.*'), 'get', getUserInfo)
Mock.mock(RegExp('/api/project/task/' + '.*'), 'get', getTask)

Mock.setup({
  timeout: 0,
})

Random.extend({
  fruit() {
    const fruit = ['apple', 'peach', 'lemon']
    return this.pick(fruit)
  },
})

export default Mock
