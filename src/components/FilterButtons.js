import React from 'react';
import './FilterButtons.css';

function FilterButtons({ activeFilter, onFilterChange, technologies }) {
    const filters = [
        { key: 'all', label: 'Все' },
        { key: 'not-started', label: 'Не начатые' },
        { key: 'in-progress', label: 'В процессе' },
        { key: 'completed', label: 'Выполненные' }
    ];

    const getCount = (filterKey) => {
        switch(filterKey) {
            case 'not-started': return technologies.filter(t => t.status === 'not-started').length;
            case 'in-progress': return technologies.filter(t => t.status === 'in-progress').length;
            case 'completed': return technologies.filter(t => t.status === 'completed').length;
            default: return technologies.length;
        }
    };

    return (
        <div className="filter-buttons">
            <h3>Фильтры</h3>
            <div className="filter-list">
                {filters.map(filter => (
                    <button
                        key={filter.key}
                        className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
                        onClick={() => onFilterChange(filter.key)}
                    >
                        {filter.label} ({getCount(filter.key)})
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterButtons;
