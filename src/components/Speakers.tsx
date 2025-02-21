import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ModalContext } from '../App';

interface Speaker {
  name: string;
  title: string;
  image: string;
  description: string;
}

const speakers: Speaker[] = [
  {
    name: "Dionne van Zyl",
    title: "Spiritual Mentor",
    image: "/images/speakers/Dionne.jpg",
    description: "Sharing practical wisdom from her journey of discovering freedom and identity in Christ, making spiritual truths accessible for daily life."
  },
  {
    name: "Graham Cooke",
    title: "Teacher & Author",
    image: "/images/speakers/grahamcooke.jpg",
    description: "Sharing from his heart and personal journey, offering insights into experiencing God's presence in everyday life."
  },
  {
    name: "Jim Baker",
    title: "Faith & Business Guide",
    image: "/images/speakers/Jim-Baker.webp",
    description: "Sharing experiences of bridging faith and business through practical Kingdom principles."
  },
  {
    name: "Ray Higdon",
    title: "Community Builder",
    image: "/images/speakers/Ray.png",
    description: "Helping others grow through authentic relationships and practical spiritual application."
  }
];

const Speakers: React.FC = () => {
  const { openModal } = useContext(ModalContext);

  return (
    <section className="bg-white text-summit-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-summit-black/60 uppercase tracking-wider text-sm font-medium mb-4 block">
            MEET THE SPEAKERS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Walking Together in Faith
          </h2>
          <p className="text-xl text-summit-black/70 max-w-2xl mx-auto">
            Join us as we share our experiences and explore together what it means to live limitlessly with God in everyday life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker, index) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: `url(${speaker.image})`,
                    backgroundColor: 'rgba(0,0,0,0.2)', // Fallback until image loads
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-summit-black transition-colors duration-300">
                  {speaker.name}
                </h3>
                <p className="text-summit-black/60 text-sm mb-4">{speaker.title}</p>
                <p className="text-summit-black/70 text-sm leading-relaxed">
                  {speaker.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] text-white px-10 py-5 rounded-full text-xl md:text-2xl font-medium hover:from-[#FF8787] hover:to-[#FFC347] transition-all duration-200 shadow-lg hover:shadow-xl border border-white/20"
          >
            Reserve Your FREE Spot Now
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-2 mt-4"
          >
            <div className="inline-flex items-center justify-center gap-2 bg-gray-100 rounded-full px-4 py-1">
              <span className="text-summit-black/80 text-sm">💫 Interactive Online Experience</span>
            </div>

            <p className="text-base md:text-lg text-summit-black/80 font-medium">
              March 7th & 8th • 10:00 AM - 11:30 AM PST
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Speakers; 