import React, { useState } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterButtons from './components/FilterButtons';
import Counter from './components/Counter';
import RegistrationForm from './components/RegistrationForm';
import ColorPicker from './components/ColorPicker';

function App() {
    const [technologies, setTechnologies] = useState([
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение базовых компонентов',
            status: 'not-started'
        },
        {
            id: 2,
            title: 'JSX Syntax',
            description: 'Освоение синтаксиса JSX',
            status: 'not-started'
        },
        {
            id: 3,
            title: 'State Management',
            description: 'Работа с состоянием компонентов',
            status: 'not-started'
        }
    ]);

    const [activeFilter, setActiveFilter] = useState('all');

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
        switch (activeFilter) {
            case 'not-started': return tech.status === 'not-started';
            case 'in-progress': return tech.status === 'in-progress';
            case 'completed': return tech.status === 'completed';
            default: return true;
        }
    });

    return (
        <div className="App">
            <Counter />
            <RegistrationForm />
            <ColorPicker />
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
            <div className="technology-list">
                {filteredTechnologies.map(tech => (
                    <TechnologyCard
                        key={tech.id}
                        id={tech.id}
                        title={tech.title}
                        description={tech.description}
                        status={tech.status}
                        onStatusChange={updateTechnologyStatus}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
