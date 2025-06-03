import testExecutionData from '../mockData/testExecution.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let executions = [...testExecutionData]

const testExecutionService = {
  async getAll() {
    await delay(300)
    return [...executions]
  },

  async getById(id) {
    await delay(200)
    const execution = executions.find(e => e.id === id)
    if (!execution) {
      throw new Error('Execution not found')
    }
    return { ...execution }
  },

  async create(execution) {
    await delay(500)
    const newExecution = {
      ...execution,
      id: Date.now().toString(),
      startTime: new Date().toISOString()
    }
    executions = [newExecution, ...executions]
    return { ...newExecution }
  },

  async update(id, data) {
    await delay(300)
    const index = executions.findIndex(e => e.id === id)
    if (index === -1) {
      throw new Error('Execution not found')
    }
    executions[index] = { ...executions[index], ...data }
    return { ...executions[index] }
  },

  async delete(id) {
    await delay(200)
    const index = executions.findIndex(e => e.id === id)
    if (index === -1) {
      throw new Error('Execution not found')
    }
    executions = executions.filter(e => e.id !== id)
    return true
  }
}

export default testExecutionService