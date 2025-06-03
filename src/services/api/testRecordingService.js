import testRecordingData from '../mockData/testRecording.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let recordings = [...testRecordingData]

const testRecordingService = {
  async getAll() {
    await delay(300)
    return [...recordings]
  },

  async getById(id) {
    await delay(200)
    const recording = recordings.find(r => r.id === id)
    if (!recording) {
      throw new Error('Recording not found')
    }
    return { ...recording }
  },

  async create(recording) {
    await delay(400)
    const newRecording = {
      ...recording,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    recordings = [newRecording, ...recordings]
    return { ...newRecording }
  },

  async update(id, data) {
    await delay(300)
    const index = recordings.findIndex(r => r.id === id)
    if (index === -1) {
      throw new Error('Recording not found')
    }
    recordings[index] = { ...recordings[index], ...data }
    return { ...recordings[index] }
  },

  async delete(id) {
    await delay(200)
    const index = recordings.findIndex(r => r.id === id)
    if (index === -1) {
      throw new Error('Recording not found')
    }
    recordings = recordings.filter(r => r.id !== id)
    return true
  }
}

export default testRecordingService