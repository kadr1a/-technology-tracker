import React from 'react';
import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, onStatusChange }) {
    const handleClick = () => {
        onStatusChange(id);
    };

    const getStatusText = () => {
        switch(status) {
            case 'completed': return 'Изучено';
            case 'in-progress': return 'В процессе';
            case 'not-started': return 'Не начато';
            default: return status;
        }
    };

    return (
        <div
            className={`technology-card status-${status}`}
            onClick={handleClick}
        >
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="status-indicator">
                Статус: {getStatusText()}
            </div>
        </div>
    );
}

export default TechnologyCard;
