import React from 'react';

export const metadata = {
  title: 'About Us',
  description: 'Learn about the Cloud Computing Club at NIST University and our mission to empower students with knowledge of cloud computing and its transformative potential in modern-day computing.',
}

const aboutData = [
  {
    title: 'Serverless Computing',
    description: 'Learn how to develop and deploy applications without the need to manage any servers. We explore platforms like AWS Lambda, Google Cloud Functions, and Azure Functions to build scalable and cost-efficient solutions.'
  },
  {
    title: 'Cloud Infrastructure',
    description: 'Understand the core components of cloud infrastructure, including virtual machines, storage, networking, and databases. We work with services like EC2, Google Compute Engine, and Azure Virtual Machines.'
  },
  {
    title: 'Containers & Orchestration',
    description: 'Containers are revolutionizing software development. Learn how to work with Docker and Kubernetes for deploying, scaling, and managing containerized applications in the cloud.'
  },
  {
    title: 'DevOps & Automation',
    description: 'Master cloud DevOps practices like continuous integration and continuous deployment (CI/CD) with tools like Jenkins, GitLab CI, and AWS CodePipeline. Automate workflows and optimize development pipelines.'
  },
  {
    title: 'Cloud Security',
    description: 'Security is a top priority in the cloud. Learn about securing cloud environments with services like AWS Identity and Access Management (IAM), Google Cloud Security, and Azure Security Center.'
  },
  {
    title: 'Big Data & Analytics',
    description: 'Leverage cloud-based tools for big data processing, machine learning, and data analytics with services like AWS S3, Google BigQuery, and Azure Data Lake. Extract insights from massive datasets efficiently.'
  },
];

const AboutUs = () => {
  return (
    <section className="min-h-screen py-12 my-20 bg-blue-50">
      <div className="max-w-5xl px-4 mx-auto text-center">
        <h1 className="mb-6 text-4xl font-bold text-gradient">About Us</h1>
        <p className="mb-12 text-lg text-gray-600">
          Welcome to the <span className="font-semibold">Cloud Computing Club</span> at NIST University! We are a
          technical club dedicated to exploring the endless possibilities of cloud computing and modern technologies.
        </p>

        {/* Club Overview */}
        <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Club Intro */}
          <div className="text-left">
            <h2 className="mb-4 text-3xl font-semibold text-gradient">Who We Are</h2>
            <p className="mb-6 text-gray-600">
              The Cloud Computing Club at NIST University is a vibrant student-led community aimed at learning and
              experimenting with cutting-edge cloud technologies. Our mission is to empower students with knowledge of
              cloud infrastructure and its transformative potential in modern-day computing.
            </p>
            <p className="mb-6 text-gray-600">
              We offer hands-on experience, technical workshops, and collaborative projects that focus on key cloud
              platforms like AWS, Google Cloud, Microsoft Azure, and more. Whether you are a beginner or an experienced
              tech enthusiast, our club is the perfect place to deepen your understanding of cloud computing and its
              real-world applications.
            </p>
          </div>

          {/* Image/GIF Placeholder */}
          <div>
            <img className='shadow-2xl rounded-xl shadow-blue-500' src="https://i.pinimg.com/736x/46/6d/e7/466de7994a7c53b559eac44d8ae71d18.jpg" alt="cloud" />
          </div>
        </div>

        {/* Technologies and Cloud Concepts */}
        <div className="mt-12">
          <h2 className="mb-4 text-3xl font-semibold text-gradient">What We Do</h2>
          <p className="mb-8 text-gray-600">
            At the Cloud Computing Club, we focus on exploring cloud technologies and working with serverless
            architectures, containers, and everything in the cloud. Here’s what we dive into:
          </p>

          {/* Grid displaying cloud technologies using array data */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {aboutData.map((item, index) => (
              <div
                key={index}
                className="p-6 transition-transform duration-300 transform bg-white rounded-[10px] shadow-md hover:scale-105 hover:shadow-lg"
              >
                <h3 className="mb-4 text-xl font-semibold text-gradient">{item.title}</h3>
                <p className="mb-4 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us Section */}
        <div className="mt-16 text-center">
          <h2 className="mb-4 text-3xl font-semibold text-gradient">Join Us Today</h2>
          <p className="mb-6 text-lg text-gray-600">
            Whether you’re just starting or looking to advance your skills, the Cloud Computing Club is open to everyone.
            Join us today to be part of a community that’s shaping the future of technology!
          </p>
          <a
            href="mailto:cloudcomputing@nist.edu"
            className="px-6 py-3 text-lg text-white transition duration-300 transform shadow rounded-xl bg-gradient hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
