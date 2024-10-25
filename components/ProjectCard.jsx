import { FaGithub, FaExternalLinkAlt, FaUser } from 'react-icons/fa';

export default function ProjectCard({ project }) {
    return (
        <div className="relative overflow-hidden transition-all duration-300 shadow-xl group rounded-xl bg-gradient hover:shadow-2xl hover:-translate-y-1">
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:opacity-100" />
            <img
                src={project.imageUrl}
                alt={project.title}
                className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="p-6 space-y-3">
                <h2 className="text-xl font-bold tracking-tight text-white">{project.title}</h2>
                <p className="text-white text-[15px] font-extralight line-clamp-2">{project.description}</p>
                {project.memberName && (
                    <p className="flex items-center text-sm text-white">
                        <FaUser className="mr-2 text-white" /> {project.memberName}
                    </p>
                )}
                <div className="flex justify-between pt-4">
                    {project.githubLink && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors rounded-xl bg-slate-800 hover:bg-slate-700"
                        >
                            <FaGithub className="mr-2" /> GitHub
                        </a>
                    )}

                    {project.liveDemoLink && (
                        <a
                            href={project.liveDemoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700"
                        >
                            <FaExternalLinkAlt className="mr-2" /> Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
