import React from 'react';
import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
    const total = technologies.length;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
    const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
    const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="progress-header">
            <h1>Трекер изучения технологий</h1>
            <div className="stats">
                <p>Всего технологий: <strong>{total}</strong></p>
                <p>Изучено: <strong>{completed}</strong></p>
                <p>В процессе: <strong>{inProgress}</strong></p>
                <p>Не начато: <strong>{notStarted}</strong></p>
                <p>Прогресс: <strong>{progressPercent}%</strong></p>
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
