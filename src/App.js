import React, { useState, useEffect } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterButtons from './components/FilterButtons';
import WindowSizeTracker from './components/WindowSizeTracker';
import UserProfile from './components/UserProfile';
import ContactForm from './components/ContactForm';

function App() {
    const [technologies, setTechnologies] = useState([
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение базовых компонентов',
            status: 'not-started',
            notes: ''
        },
        {
            id: 2,
            title: 'JSX Syntax',
            description: 'Освоение синтаксиса JSX',
            status: 'not-started',
            notes: ''
        },
        {
            id: 3,
            title: 'State Management',
            description: 'Работа с состоянием компонентов',
            status: 'not-started',
            notes: ''
        }
    ]);

    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('techTrackerData');
        if (saved) {
            setTechnologies(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    }, [technologies]);

    const updateTechnologyStatus = (id) => {
        setTechnologies(prevTech =>
            prevTech.map(tech => {
                if (tech.id === id) {
                    const statusOrder = ['not-started', 'in-progress', 'completed'];
                    const currentIndex = statusOrder.indexOf(tech.status);
                    const nextIndex = (currentIndex + 1) % statusOrder.length;
                    return { ...tech, status: statusOrder[nextIndex] };
                }
                return tech;
            })
        );
    };

    const updateTechnologyNotes = (techId, newNotes) => {
        setTechnologies(prevTech =>
            prevTech.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    };

    const markAllAsCompleted = () => {
        setTechnologies(prevTech =>
            prevTech.map(tech => ({ ...tech, status: 'completed' }))
        );
    };

    const resetAllStatuses = () => {
        setTechnologies(prevTech =>
            prevTech.map(tech => ({ ...tech, status: 'not-started' }))
        );
    };

    const randomNextTechnology = () => {
        const notStartedTech = technologies.filter(tech => tech.status === 'not-started');
        if (notStartedTech.length > 0) {
            const randomTech = notStartedTech[Math.floor(Math.random() * notStartedTech.length)];
            updateTechnologyStatus(randomTech.id);
        }
    };

    const filteredTechnologies = technologies.filter(tech => {
        const matchesFilter = activeFilter === 'all' || tech.status === activeFilter;
        const matchesSearch = tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tech.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="App">
            <WindowSizeTracker />
            <UserProfile />
            <ContactForm />
            <ProgressHeader technologies={technologies} />
            <QuickActions
                onMarkAllCompleted={markAllAsCompleted}
                onResetAll={resetAllStatuses}
                onRandomNext={randomNextTechnology}
            />
            <FilterButtons
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                technologies={technologies}
            />
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Поиск технологий..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span>Найдено: {filteredTechnologies.length}</span>
            </div>
            <div className="technology-list">
                {filteredTechnologies.map(tech => (
                    <TechnologyCard
                        key={tech.id}
                        id={tech.id}
                        title={tech.title}
                        description={tech.description}
                        status={tech.status}
                        notes={tech.notes}
                        onStatusChange={updateTechnologyStatus}
                        onNotesChange={updateTechnologyNotes}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
