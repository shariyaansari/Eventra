import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const HostHackathon = () => {
  const [formData, setFormData] = useState({
    hackathonName: "",
    organizerName: "",
    email: "",
    startDate: "",
    endDate: "",
    description: "",
    location: "",
    participantLimit: "",
    prizeDetails: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Hackathon submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Heading Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-800 mb-4">
          Host Your Hackathon
        </h1>
        <p className="text-xs sm:text-base text-gray-600">
          "Fill in the details below and let's get your hackathon live!"
        </p>
      </motion.div>


      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-indigo-300"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/** Helper function to animate inputs */}
          {[
            {
              label: "Hackathon Name",
              name: "hackathonName",
              type: "text",
              placeholder: "Enter hackathon name",
              required: true,
            },
            {
              label: "Organization/Organizer Name",
              name: "organizerName",
              type: "text",
              placeholder: "Enter your name or organization",
              required: true,
            },
            {
              label: "Email",
              name: "email",
              type: "email",
              placeholder: "your@email.com",
              required: true,
            },
            {
              label: "Location (Online / City)",
              name: "location",
              type: "text",
              placeholder: "e.g., Online or New York City",
              required: true,
            },
            {
              label: "Participant Limit",
              name: "participantLimit",
              type: "number",
              placeholder: "Maximum number of participants",
              required: false,
            },
            {
              label: "Prize Details",
              name: "prizeDetails",
              type: "text",
              placeholder: "Mention prizes if any",
              required: false,
            },
            {
              label: "Website / Registration Link",
              name: "website",
              type: "url",
              placeholder: "https://example.com",
              required: false,
            },
          ].map((field) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
            </motion.div>
          ))}

          {/* Date Fields */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Start Date", "End Date"].map((label, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type="date"
                  name={label === "Start Date" ? "startDate" : "endDate"}
                  value={
                    label === "Start Date"
                      ? formData.startDate
                      : formData.endDate
                  }
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Briefly describe your hackathon"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold p-3 rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
          >
            Submit Hackathon <ArrowRightIcon className="w-5 h-5" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default HostHackathon;
