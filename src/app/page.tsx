'use client';
import Image from "next/image";
import Navbar from "@/component/Navbar";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", description: "" });
  const [status, setStatus] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("");

    try {
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("Email sent successfully!");
        setFormData({ name: "", email: "", description: "" });
      } else {
        setStatus(result.error || "Failed to send email");
      }
    } catch (error) {
      setStatus("Error sending email");
    }
  };

  return (
    <div className="bg-gray-900 text-white">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 hero-section">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl">
          <div className="flex flex-col items-center justify-center text-center md:w-1/2 space-y-4 max-w-lg hero-text">
            <p className="text-yellow-500 text-sm font-semibold uppercase">Hello!</p>
            <h1 className="text-4xl sm:text-5xl font-bold">I'm Tank Prasad Awasthi</h1>
            <p className="text-yellow-500 text-lg sm:text-xl font-semibold">Engineer</p>
            <p className="text-gray-400 text-base sm:text-lg">A Full Stack Developer</p>
            <a
              href="/resume.pdf"
              download="Tank_Prasad_Awasthi_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-yellow-500 text-black font-semibold py-2 px-8 rounded-full hover:bg-yellow-600 transition"
            >
              Resume
            </a>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 relative rounded-full overflow-hidden border-4 border-yellow-500 shadow-xl">
              <Image
                src="/myphoto.png"
                alt="Tank Prasad Awasthi"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Me</h2>
          <p className="text-gray-400 text-base sm:text-lg">
            I'm a passionate Full Stack Developer with experience in building web applications using modern technologies like React, Next.js, Node.js, and more. I love creating user-friendly, scalable solutions and am always eager to learn new skills.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-gray-800">
        <div className="max-w-6xl w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">My Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="relative h-48">
                <Image
                  src="/project1.jpg"
                  alt="Project 1"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Project 1</h3>
                <p className="text-gray-400 text-sm">
                  A web application built with Next.js and Tailwind CSS, showcasing responsive design and dynamic content.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block text-yellow-500 hover:text-yellow-600 transition"
                >
                  View Project
                </a>
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="relative h-48">
                <Image
                  src="/project2.jpg"
                  alt="Project 2"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Project 2</h3>
                <p className="text-gray-400 text-sm">
                  A full-stack e-commerce platform with payment integration and user authentication.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block text-yellow-500 hover:text-yellow-600 transition"
                >
                  View Project
                </a>
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="relative h-48">
                <Image
                  src="/project3.jpg"
                  alt="Project 3"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Project 3</h3>
                <p className="text-gray-400 text-sm">
                  A real-time chat application using WebSocket and Node.js for seamless communication.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block text-yellow-500 hover:text-yellow-600 transition"
                >
                  View Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-gray-400 text-base sm:text-lg mb-6">
            Feel free to reach out for collaboration or inquiries!
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-600 transition"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-600 transition"
            >
              LinkedIn
            </a>
            <a
              href="mailto:tankprasad@example.com"
              className="text-yellow-500 hover:text-yellow-600 transition"
            >
              Email
            </a>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 max-w-lg w-full mx-auto contact-form">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Your Message"
              rows={5}
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            ></textarea>
            <button
              type="submit"
              className="inline-block bg-yellow-500 text-black font-semibold py-2 px-8 rounded-full hover:bg-yellow-600 transition"
            >
              Send Email
            </button>
            {status && (
              <p className={status.includes("success") ? "text-green-500" : "text-red-500"}>
                {status}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}