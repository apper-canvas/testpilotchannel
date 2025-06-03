import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-primary-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6 shadow-glow">
            <ApperIcon name="AlertTriangle" className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-surface-900 dark:text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-surface-700 dark:text-surface-300 mb-4">
            Test Case Not Found
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-8 leading-relaxed">
            The page you're looking for seems to have failed its test. Let's get you back to a working state.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white font-medium py-3 px-6 rounded-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            <span>Return to Dashboard</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound