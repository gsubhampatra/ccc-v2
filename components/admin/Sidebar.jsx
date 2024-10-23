import { Button } from "@/components/ui/button"

export default function Sidebar({ activeSection, setActiveSection }) {
    const sections = ['dashboard', 'members', 'events', 'registrations']

    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-6">
                <h1 className="mb-6 text-2xl font-bold text-gradient">Admin Dashboard</h1>
                <nav>
                    <ul className="space-y-2">
                        {sections.map((item) => (
                            <li key={item}>
                                <Button
                                    variant={activeSection === item ? 'default' : 'ghost'}
                                    className={`justify-start w-full ${activeSection === item ? 'bg-gradient' : ''}`}
                                    onClick={() => setActiveSection(item)}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}
