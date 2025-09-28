import { motion } from "framer-motion";
import { Mail, Send, Sparkles } from "lucide-react";
import { useState } from "react";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full flex justify-center py-20 px-4 bg-gradient-to-b from-indigo-50 via-indigo-100 to-white dark:from-gray-900 dark:via-indigo-900/20 dark:to-black relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-600 dark:to-purple-600 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-600 dark:to-purple-600 rounded-full opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[3px] rounded-3xl w-full max-w-3xl shadow-2xl relative">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 text-center relative overflow-hidden">
          {/* Newsletter illustration */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <motion.div
                className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-800 dark:to-purple-800 rounded-full shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-6 h-6 text-pink-500" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h2
            className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Stay in the Loop
          </motion.h2>

          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 max-w-lg mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Get the latest updates, exclusive articles, and insider resources
            straight to your inbox. Join our community of innovators!
          </motion.p>

          <motion.form
            className="mt-8 flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative w-full group">
              <motion.div
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300"
                animate={{
                  scale: email ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Mail size={22} />
              </motion.div>
              <motion.input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 pr-4 w-full rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/10 p-4 text-lg font-medium bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              {email && (
                <motion.div
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </div>

            <motion.button
              type="submit"
              className="group relative px-8 py-4 font-bold text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Subscribe Now</span>
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Send className="w-5 h-5" />
                </motion.div>
              </span>

              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
              />
            </motion.button>
          </motion.form>

          {/* Trust indicators */}
          <motion.div
            className="mt-6 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Join 10,000+ subscribers • No spam, unsubscribe anytime
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
