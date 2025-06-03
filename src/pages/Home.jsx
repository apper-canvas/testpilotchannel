import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode.toString())
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative z-50 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700 sticky top-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow">
                <ApperIcon name="Bot" className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  TestPilot AI
                </h1>
                <p className="text-xs md:text-sm text-surface-600 dark:text-surface-400 hidden sm:block">
                  AI-Powered Test Automation
                </p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={toggleDarkMode}
              className="p-2 md:p-3 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-200 border border-surface-300 dark:border-surface-600"
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                className="w-4 h-4 md:w-5 md:h-5 text-surface-600 dark:text-surface-400" 
              />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-white mb-6 leading-tight">
                Automate Testing with{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AI Intelligence
                </span>
              </h2>
              <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Record user interactions, generate intelligent test cases, and validate your applications with our AI-powered testing platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium">
                <ApperIcon name="Shield" className="w-4 h-4" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <ApperIcon name="Zap" className="w-4 h-4" />
                <span>Real-time Recording</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                <ApperIcon name="Target" className="w-4 h-4" />
                <span>Smart Validation</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MainFeature />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-20 bg-surface-50 dark:bg-surface-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h3 className="text-2xl md:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Powerful Testing Features
            </h3>
            <p className="text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              Everything you need to create, manage, and execute comprehensive test automation workflows.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "Video",
                title: "Smart Recording",
                description: "Capture user interactions with our intelligent browser recorder that understands context and user intent.",
                color: "primary"
              },
              {
                icon: "Brain",
                title: "AI Test Generation",
                description: "Let AI analyze your recordings and automatically generate comprehensive test scenarios and edge cases.",
                color: "secondary"
              },
              {
                icon: "Play",
                title: "Automated Execution",
                description: "Run tests across multiple environments with real-time monitoring and detailed result reporting.",
                color: "accent"
              },
              {
                icon: "CheckCircle",
                title: "Built-in Validation",
                description: "Advanced assertion engine with visual comparison and smart element detection for reliable testing.",
                color: "success"
              },
              {
                icon: "FileText",
                title: "Test Case Management",
                description: "Organize, edit, and version control your test cases with powerful search and tagging capabilities.",
                color: "primary"
              },
              {
                icon: "BarChart3",
                title: "Analytics Dashboard",
                description: "Comprehensive reporting with test coverage metrics, failure analysis, and performance insights.",
                color: "secondary"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="card hover:shadow-glow transition-all duration-300 h-full border-l-4 border-l-primary group-hover:border-l-secondary">
                  <div className={`w-12 h-12 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <ApperIcon name={feature.icon} className={`w-6 h-6 text-${feature.color}`} />
                  </div>
                  <h4 className="text-xl font-semibold text-surface-900 dark:text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-surface-600 dark:text-surface-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 dark:bg-surface-950 text-white py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Bot" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">TestPilot AI</h3>
                <p className="text-sm text-surface-400">Intelligent Test Automation</p>
              </div>
            </div>
            <p className="text-surface-400 text-sm text-center md:text-right">
              © 2024 TestPilot AI. Empowering teams with intelligent testing solutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home