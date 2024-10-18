import React from 'react';

const Developer = () => {
  const developers = [
    {
      name: "Debarshi Mondal",
      role: "Developer",
      description: "Loved to build Serverless Scalable Web applications on Cloud. Worked on how to Build Serverless Scalable, MERN/full-stack web apps, and APIs.",
      imageUrl: "https://avatars.githubusercontent.com/u/52108126?v=4",
    },
    {
      name: "Sutari Sunil Reddy",
      role: "Designer",
      description: "Interest for Graphics Design, Android App Development and Cloud Computing.",
      imageUrl: "https://avatars.githubusercontent.com/u/66204882?v=4",
    },
    {
      name: "Sambit Sargam Ekalabya",
      role: "Full Stack Developer",
      description: "Aspire to create an impact on human ergonomics using technology by creating meaningful solutions.",
      imageUrl: "https://avatars.githubusercontent.com/u/70655824?v=4",
    },
    {
      name: "G. Subham Kumar Patra",
      role: "Full Stack Developer",
      description: "Building Fullstack Applications using AI Tools.",
      imageUrl: "https://avatars.githubusercontent.com/u/96821893?v=4",
    },
  ];

  return (
    <>
      <h2 className="mt-20 text-3xl font-bold text-center text-gradient">Creators</h2>
      <section className="grid grid-cols-1 gap-8 mx-auto mt-8 mb-20 md:grid-cols-2 lg:grid-cols-4">
        {developers.map((developer, index) => (
          <div
            key={developer.name}
            className={`bg-white shadow-lg flex items-center flex-col rounded-lg  transform transition-transform duration-300 ease-in-out 
            delay-${index * 200} hover:scale-105  fade-up`}
           
          >
            <img
              src={developer.imageUrl}
              alt={developer.name}
              className="object-fill object-center h-48 rounded-full"
            />
            <div className="p-4">
              <h1 className="text-xl font-semibold">{developer.name}</h1>
              <h3 className="font-medium text-gray-600 text-md">{developer.role}</h3>
              <p className="mt-2 text-gray-700">{developer.description}</p>
            </div>
          </div>
        ))}
      </section>

     
    </>
  );
};

export default Developer;
