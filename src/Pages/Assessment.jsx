import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import HomeNav from '../Components/HomeNav';

const questions = [
  {
    id: 1,
    question: 'How important is diversity in your workplace?',
    options: ['Not Important', 'Somewhat Important', 'Very Important', 'Critical'],
  },
  {
    id: 2,
    question: 'How often does your organization conduct diversity training?',
    options: ['Never', 'Annually', 'Bi-annually', 'Quarterly'],
  },
  {
    id: 3,
    question: 'How comfortable are you discussing DEI topics at work?',
    options: ['Not Comfortable', 'Somewhat Comfortable', 'Comfortable', 'Very Comfortable'],
  },
  {
    id: 4,
    question: 'Does your organization have clear DEI policies?',
    options: ['No Policies', 'Some Policies', 'Clear Policies', 'Comprehensive Policies'],
  },
];

const Assessment = ({ session }) => {
    const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { x: 300, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <HomeNav session={session} />
      <div className="max-w-3xl mx-auto mt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">DEI Assessment</h1>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-lg text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <motion.div
          key={currentQuestion}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </h2>
          <div className="grid gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option)}
                className={`p-4 text-left rounded-lg text-lg font-medium transition-colors
                  ${answers[currentQuestion] === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {currentQuestion === questions.length - 1 && Object.keys(answers).length === questions.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold
                hover:bg-green-700 transition-colors"
              onClick={() => console.log('Assessment completed:', answers)}
            >
              Submit Assessment
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Assessment;