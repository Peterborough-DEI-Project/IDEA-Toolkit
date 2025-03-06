import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import HomeNav from "../Components/HomeNav"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { ChevronDown, MapPin, Users, Calendar, ArrowRight } from "lucide-react"

const Home = ({ session }) => {
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    "https://s3.ca-central-1.amazonaws.com/ehq-production-canada/8e99a9b5c3a7d7b7f21e4de60a1590a0047dc1a0/original/1725562332/aa3c20bacf3503b9df5fb64a1383268c_blob?1725562332-unsplash--undefined",
    "https://wanderingwagars.com/wp-content/uploads/2021/11/Weekend-in-Peterborough-Itinerary-Feature.jpg",
    "https://goodtimes.ca/wp-content/uploads/2019/04/Peterborough_GOOD.jpg",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      title: "Reflection Process",
      description: "Interactive tools to help identify and address exclusion in workflows",
      icon: <Users className="w-12 h-12 text-blue-500" />,
      color: "from-blue-500/10 to-blue-600/10",
      link: "/dei",
    },
    {
      title: "Assessment Tools",
      description: "Real-time feedback and evaluation of IDEA implementation",
      icon: <Calendar className="w-12 h-12 text-purple-500" />,
      color: "from-purple-500/10 to-purple-600/10",
      link: "/dei",
    },
    {
      title: "Annual Reporting",
      description: "Track and visualize your progress in embedding IDEA principles",
      icon: <MapPin className="w-12 h-12 text-indigo-500" />,
      color: "from-indigo-500/10 to-indigo-600/10",
      link: "/dei",
    },
  ]

  const highlights = [
    {
      number: "100+",
      label: "Staff Members Engaged",
      description: "Join our growing community of IDEA champions",
    },
    {
      number: "3",
      label: "Pilot Areas",
      description: "Successfully implementing the Inclusion Framework",
    },
    {
      number: "6",
      label: "Key Work Areas",
      description: "Comprehensive approach to inclusion",
    },
  ]

  return (
    <div className="relative">
      <HomeNav session={session}/>

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Banner ${index + 1}`}
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{ y }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute inset-0 flex flex-col justify-center items-center text-white px-4"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-4 text-center leading-tight">
            Welcome to <br />
            <span className="bg-clip-text md:text-9xl text-transparent bg-gradient-to-r text-white ">
              Peterborough
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-center text-gray-300">
            Discover the heart of Ontario's Kawarthas - where nature meets culture in perfect harmony.
          </p>
          <NavLink to="/About">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg"
            >
              Explore More
            </motion.button>
          </NavLink>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-12 h-12 text-white animate-bounce" />
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tools and resources designed to make embedding IDEA principles intuitive and engaging
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                onClick={() => navigate(feature.link)}
                className={`bg-white p-8 rounded-2xl cursor-pointer group backdrop-blur-sm border border-gray-200 hover:border-gray-300 transition-all duration-300`}
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <motion.div whileHover={{ x: 5 }} className="flex items-center text-blue-600 font-semibold">
                  Learn More <ArrowRight className="ml-2 w-5 h-5" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  className="text-6xl font-bold mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {item.number}
                </motion.div>
                <h3 className="text-2xl font-semibold mb-2">{item.label}</h3>
                <p className="text-blue-100">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gray-900 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Approach?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Join us in creating a more inclusive, diverse, equitable, and accessible workplace.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get Started Today
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Home

