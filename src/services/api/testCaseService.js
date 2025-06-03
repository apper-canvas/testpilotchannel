import testCaseData from '../mockData/testCase.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let testCases = [...testCaseData]

const testCaseService = {
  async getAll() {
    await delay(250)
    return [...testCases]
  },

  async getById(id) {
    await delay(200)
    const testCase = testCases.find(tc => tc.id === id)
    if (!testCase) {
      throw new Error('Test case not found')
    }
    return { ...testCase }
  },

  async create(testCase) {
    await delay(400)
    const newTestCase = {
      ...testCase,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'draft'
    }
    testCases = [newTestCase, ...testCases]
    return { ...newTestCase }
  },

  async update(id, data) {
    await delay(300)
    const index = testCases.findIndex(tc => tc.id === id)
    if (index === -1) {
      throw new Error('Test case not found')
    }
    testCases[index] = { ...testCases[index], ...data }
    return { ...testCases[index] }
  },

  async delete(id) {
    await delay(200)
    const index = testCases.findIndex(tc => tc.id === id)
    if (index === -1) {
      throw new Error('Test case not found')
    }
    testCases = testCases.filter(tc => tc.id !== id)
    return true
  }
}

export default testCaseService