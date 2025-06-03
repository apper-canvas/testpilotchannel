import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { testRecordingService } from '../services'

const MainFeature = () => {
  const [recordings, setRecordings] = useState([])
  const [testCases, setTestCases] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('recorder')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingData, setRecordingData] = useState({
    name: '',
    url: '',
    actions: []
  })
  const [selectedRecording, setSelectedRecording] = useState(null)
  const [showTestCaseModal, setShowTestCaseModal] = useState(false)
  const [newTestCase, setNewTestCase] = useState({
    title: '',
    description: '',
    steps: [],
    expectedResults: [],
    tags: []
  })

  useEffect(() => {
    loadRecordings()
  }, [])

  const loadRecordings = async () => {
    setLoading(true)
    try {
      const result = await testRecordingService.getAll()
      setRecordings(result || [])
    } catch (err) {
      setError(err.message)
      toast.error("Failed to load recordings")
    } finally {
      setLoading(false)
    }
  }

  const startRecording = () => {
    if (!recordingData.name || !recordingData.url) {
      toast.error("Please enter recording name and URL")
      return
    }
    setIsRecording(true)
    toast.success("Recording started! Capturing user interactions...")
    
    // Simulate recording actions
    const interval = setInterval(() => {
      const actions = ['click', 'type', 'navigate', 'scroll', 'hover']
      const elements = ['button', 'input', 'link', 'dropdown', 'checkbox']
      const newAction = {
        id: Date.now(),
        type: actions[Math.floor(Math.random() * actions.length)],
        element: elements[Math.floor(Math.random() * elements.length)],
        value: `Action ${recordingData.actions.length + 1}`,
        timestamp: new Date().toISOString()
      }
      
      setRecordingData(prev => ({
        ...prev,
        actions: [...prev.actions, newAction]
      }))
    }, 2000)

    // Auto-stop after 10 seconds for demo
    setTimeout(() => {
      clearInterval(interval)
      stopRecording()
    }, 10000)
  }

  const stopRecording = async () => {
    setIsRecording(false)
    try {
      const newRecording = {
        ...recordingData,
        duration: recordingData.actions.length * 2,
        createdAt: new Date().toISOString()
      }
      const saved = await testRecordingService.create(newRecording)
      setRecordings(prev => [saved, ...prev])
      setRecordingData({ name: '', url: '', actions: [] })
      toast.success("Recording saved successfully!")
    } catch (err) {
      toast.error("Failed to save recording")
    }
  }

  const generateTestCase = (recording) => {
    setSelectedRecording(recording)
    const aiGeneratedTestCase = {
      title: `AI Generated: ${recording.name}`,
      description: `Automated test case generated from recording on ${recording.url}`,
      steps: recording.actions?.map((action, index) => ({
        id: index + 1,
        action: action.type,
        element: action.element,
        value: action.value,
        expected: `Should successfully ${action.type} ${action.element}`
      })) || [],
      expectedResults: [
        "All actions execute without errors",
        "Page loads successfully",
        "No console errors",
        "All elements are accessible"
      ],
      tags: ['ai-generated', 'automated', 'functional']
    }
    setNewTestCase(aiGeneratedTestCase)
    setShowTestCaseModal(true)
  }

  const saveTestCase = async () => {
    try {
      const testCase = {
        ...newTestCase,
        id: Date.now().toString(),
        status: 'draft',
        createdAt: new Date().toISOString()
      }
      setTestCases(prev => [testCase, ...prev])
      setShowTestCaseModal(false)
      setNewTestCase({ title: '', description: '', steps: [], expectedResults: [], tags: [] })
      toast.success("Test case generated and saved!")
    } catch (err) {
      toast.error("Failed to save test case")
    }
  }

  const executeTest = (testCase) => {
    toast.info(`Executing test: ${testCase.title}`)
    // Simulate test execution
    setTimeout(() => {
      const passed = Math.random() > 0.3
      if (passed) {
        toast.success(`✅ Test passed: ${testCase.title}`)
      } else {
        toast.error(`❌ Test failed: ${testCase.title}`)
      }
    }, 2000)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row bg-white dark:bg-surface-800 rounded-xl shadow-card border border-surface-200 dark:border-surface-700 mb-8 overflow-hidden">
        {[
          { id: 'recorder', label: 'Action Recorder', icon: 'Video' },
          { id: 'testcases', label: 'Test Cases', icon: 'FileText' },
          { id: 'execution', label: 'Test Execution', icon: 'Play' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-4 md:py-6 font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
            }`}
          >
            <ApperIcon name={tab.icon} className="w-5 h-5" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'recorder' && (
          <motion.div
            key="recorder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Recording Control Panel */}
            <div className="card">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white flex items-center space-x-2">
                    <ApperIcon name="Video" className="w-6 h-6 text-primary" />
                    <span>Browser Action Recorder</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Recording Name
                      </label>
                      <input
                        type="text"
                        value={recordingData.name}
                        onChange={(e) => setRecordingData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter test scenario name"
                        className="input-field"
                        disabled={isRecording}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Target URL
                      </label>
                      <input
                        type="url"
                        value={recordingData.url}
                        onChange={(e) => setRecordingData(prev => ({ ...prev, url: e.target.value }))}
                        placeholder="https://example.com"
                        className="input-field"
                        disabled={isRecording}
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:w-64 flex flex-col justify-center">
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                      isRecording 
                        ? 'bg-error/20 animate-recording' 
                        : 'bg-success/20'
                    }`}>
                      <ApperIcon 
                        name={isRecording ? "Square" : "Circle"} 
                        className={`w-8 h-8 ${isRecording ? 'text-error' : 'text-success'}`} 
                      />
                    </div>
                    
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={!recordingData.name || !recordingData.url}
                      className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                        isRecording
                          ? 'bg-error hover:bg-error/90 text-white'
                          : 'bg-success hover:bg-success/90 text-white'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                    
                    {isRecording && (
                      <p className="text-sm text-surface-600 dark:text-surface-400">
                        Actions captured: {recordingData.actions.length}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Actions Feed */}
            {isRecording && recordingData.actions.length > 0 && (
              <div className="card">
                <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center space-x-2">
                  <ApperIcon name="Activity" className="w-5 h-5 text-secondary" />
                  <span>Live Actions Feed</span>
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
                  {recordingData.actions.slice(-5).map((action, index) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center space-x-3 p-3 bg-surface-50 dark:bg-surface-700 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                      <span className="font-medium text-sm text-surface-900 dark:text-white">
                        {action.type}
                      </span>
                      <span className="text-sm text-surface-600 dark:text-surface-400">
                        {action.element}
                      </span>
                      <span className="text-xs text-surface-500 ml-auto">
                        {new Date(action.timestamp).toLocaleTimeString()}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Recordings List */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-surface-900 dark:text-white flex items-center space-x-2">
                  <ApperIcon name="Database" className="w-5 h-5 text-primary" />
                  <span>Saved Recordings</span>
                </h4>
                <span className="text-sm text-surface-600 dark:text-surface-400">
                  {recordings.length} recordings
                </span>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-2 text-surface-600 dark:text-surface-400">Loading recordings...</p>
                </div>
              ) : recordings.length === 0 ? (
                <div className="text-center py-8">
                  <ApperIcon name="FolderOpen" className="w-12 h-12 text-surface-400 mx-auto mb-3" />
                  <p className="text-surface-600 dark:text-surface-400">No recordings yet. Start your first recording above!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {recordings.slice(0, 4).map((recording) => (
                    <div key={recording.id} className="border border-surface-200 dark:border-surface-600 rounded-lg p-4 hover:border-primary transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <h5 className="font-medium text-surface-900 dark:text-white">{recording.name}</h5>
                        <span className="text-xs text-surface-500 bg-surface-100 dark:bg-surface-700 px-2 py-1 rounded">
                          {recording.actions?.length || 0} actions
                        </span>
                      </div>
                      <p className="text-sm text-surface-600 dark:text-surface-400 mb-3 truncate">{recording.url}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-surface-500">
                          {new Date(recording.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => generateTestCase(recording)}
                          className="text-xs bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full hover:shadow-glow transition-all duration-200"
                        >
                          Generate Test
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'testcases' && (
          <motion.div
            key="testcases"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-surface-900 dark:text-white flex items-center space-x-2">
                  <ApperIcon name="FileText" className="w-6 h-6 text-primary" />
                  <span>Generated Test Cases</span>
                </h3>
                <button
                  onClick={() => setShowTestCaseModal(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <ApperIcon name="Plus" className="w-4 h-4" />
                  <span>Create Manual</span>
                </button>
              </div>

              {testCases.length === 0 ? (
                <div className="text-center py-12">
                  <ApperIcon name="TestTube" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-surface-900 dark:text-white mb-2">No Test Cases Yet</h4>
                  <p className="text-surface-600 dark:text-surface-400 mb-6">
                    Generate test cases from recordings or create them manually
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {testCases.map((testCase) => (
                    <div key={testCase.id} className="border border-surface-200 dark:border-surface-600 rounded-lg p-6 hover:border-primary transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h5 className="font-semibold text-surface-900 dark:text-white mb-1">{testCase.title}</h5>
                          <p className="text-sm text-surface-600 dark:text-surface-400">{testCase.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            testCase.status === 'draft' ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                          }`}>
                            {testCase.status}
                          </span>
                          <button
                            onClick={() => executeTest(testCase)}
                            className="text-primary hover:text-primary-dark"
                          >
                            <ApperIcon name="Play" className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {testCase.tags?.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm text-surface-600 dark:text-surface-400">
                        <span>{testCase.steps?.length || 0} steps</span>
                        <span className="mx-2">•</span>
                        <span>{testCase.expectedResults?.length || 0} assertions</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'execution' && (
          <motion.div
            key="execution"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="card">
              <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-6 flex items-center space-x-2">
                <ApperIcon name="Play" className="w-6 h-6 text-primary" />
                <span>Test Execution Dashboard</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-success/10 rounded-xl">
                  <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="CheckCircle" className="w-6 h-6 text-success" />
                  </div>
                  <div className="text-2xl font-bold text-success mb-1">24</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Tests Passed</div>
                </div>
                
                <div className="text-center p-6 bg-error/10 rounded-xl">
                  <div className="w-12 h-12 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="XCircle" className="w-6 h-6 text-error" />
                  </div>
                  <div className="text-2xl font-bold text-error mb-1">3</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Tests Failed</div>
                </div>
                
                <div className="text-center p-6 bg-warning/10 rounded-xl">
                  <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="Clock" className="w-6 h-6 text-warning" />
                  </div>
                  <div className="text-2xl font-bold text-warning mb-1">5</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Pending</div>
                </div>
              </div>

              <div className="text-center py-8">
                <ApperIcon name="BarChart3" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-surface-900 dark:text-white mb-2">Execution History</h4>
                <p className="text-surface-600 dark:text-surface-400 mb-6">
                  Run test cases to see detailed execution results and performance metrics
                </p>
                <button
                  onClick={() => {
                    toast.info("Running all test cases...")
                    setTimeout(() => toast.success("Test suite completed: 24 passed, 3 failed"), 3000)
                  }}
                  className="btn-primary flex items-center space-x-2 mx-auto"
                >
                  <ApperIcon name="Play" className="w-4 h-4" />
                  <span>Run All Tests</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Test Case Modal */}
      <AnimatePresence>
        {showTestCaseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowTestCaseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white">
                    {selectedRecording ? 'AI Generated Test Case' : 'Create Test Case'}
                  </h3>
                  <button
                    onClick={() => setShowTestCaseModal(false)}
                    className="text-surface-400 hover:text-surface-600"
                  >
                    <ApperIcon name="X" className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Test Case Title
                    </label>
                    <input
                      type="text"
                      value={newTestCase.title}
                      onChange={(e) => setNewTestCase(prev => ({ ...prev, title: e.target.value }))}
                      className="input-field"
                      placeholder="Enter test case title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newTestCase.description}
                      onChange={(e) => setNewTestCase(prev => ({ ...prev, description: e.target.value }))}
                      className="input-field h-24 resize-none"
                      placeholder="Describe what this test case validates"
                    />
                  </div>

                  {newTestCase.steps?.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Test Steps ({newTestCase.steps.length})
                      </label>
                      <div className="bg-surface-50 dark:bg-surface-700 rounded-lg p-4 max-h-32 overflow-y-auto">
                        {newTestCase.steps.slice(0, 3).map((step, index) => (
                          <div key={index} className="text-sm text-surface-600 dark:text-surface-400 mb-1">
                            {index + 1}. {step.action} on {step.element}
                          </div>
                        ))}
                        {newTestCase.steps.length > 3 && (
                          <div className="text-xs text-surface-500">
                            ... and {newTestCase.steps.length - 3} more steps
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setShowTestCaseModal(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveTestCase}
                      disabled={!newTestCase.title}
                      className="btn-primary disabled:opacity-50"
                    >
                      Save Test Case
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature