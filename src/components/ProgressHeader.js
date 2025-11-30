import React from 'react';
import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
    const total = technologies.length;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="progress-header">
            <h1>Трекер изучения технологий</h1>
            <div className="stats">
                <p>Всего технологий: {total}</p>
                <p>Изучено: {completed}</p>
                <p>Прогресс: {progressPercent}%</p>
            </div>
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>
        </div>
    );
}

export default ProgressHeader;
