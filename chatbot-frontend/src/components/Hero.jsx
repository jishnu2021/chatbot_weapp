import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Intelligent AI Assistant
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Get instant answers, creative ideas, and helpful suggestions from our advanced AI chatbot.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="hero-buttons"
        >
          <Link to="/login" className="btn primary">
            Get Started
          </Link>
          <Link to="/features" className="btn secondary">
            Learn More
          </Link>
        </motion.div>
      </div>
      
      <motion.div 
        className="hero-image"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
      </motion.div>
    </div>
  );
};

export default Hero;