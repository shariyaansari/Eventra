import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const SubmitProject = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    teamName: "",
    email: "",
    githubLink: "",
    liveDemoLink: "",
    description: "",
    projectType: "",
    techStack: "",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project Submitted:", formData);
    alert("Project submitted successfully!");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Heading Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-4">
          Submit Your Project
        </h1>
        <p className="text-xs sm:text-base text-gray-600">
          "Fill in the details below to showcase your project."
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
          {[
            {
              label: "Project Name",
              name: "projectName",
              type: "text",
              placeholder: "Enter project name",
              required: true,
            },
            {
              label: "Team Name",
              name: "teamName",
              type: "text",
              placeholder: "Enter team name",
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
              label: "GitHub Link",
              name: "githubLink",
              type: "url",
              placeholder: "https://github.com/username/project",
              required: true,
            },
            {
              label: "Live Demo Link",
              name: "liveDemoLink",
              type: "url",
              placeholder: "https://project-demo.com",
              required: false,
            },
            {
              label: "Project Type",
              name: "projectType",
              type: "text",
              placeholder: "e.g., Web, Mobile, AI",
              required: false,
            },
            {
              label: "Tech Stack",
              name: "techStack",
              type: "text",
              placeholder: "Technologies used",
              required: false,
            },
            {
              label: "Project Category",
              name: "projectCategory",
              type: "text",
              placeholder: "e.g., Social Impact, Education, Gaming",
              required: false,
            },
            {
              label: "Team Members Count",
              name: "teamMembersCount",
              type: "number",
              placeholder: "Number of team members",
              required: false,
            },
            {
              label: "Project Duration",
              name: "projectDuration",
              type: "text",
              placeholder: "Estimated duration or timeline",
              required: false,
            },
            {
              label: "Target Audience",
              name: "targetAudience",
              type: "text",
              placeholder: "Who will benefit from this project?",
              required: false,
            },
            {
              label: "Additional Notes",
              name: "additionalNotes",
              type: "text",
              placeholder: "Any other info",
              required: false,
            },
            {
              label: "Project Logo / Image Link",
              name: "projectImage",
              type: "url",
              placeholder: "Image URL for your project",
              required: false,
            },
            {
              label: "Submission Category",
              name: "submissionCategory",
              type: "text",
              placeholder: "Hackathon / Open Submission / Other",
              required: false,
            },
          ].map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {field.name === "additionalNotes" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  rows="3"
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                />
              )}
            </motion.div>
          ))}

          {/* Submit Button */}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold p-3 rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
          >
            Submit Project <ArrowRightIcon className="w-5 h-5" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SubmitProject;
