import React from 'react';
import './QuickActions.css';

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomNext }) {
    return (
        <div className="quick-actions">
            <h3>Быстрые действия</h3>
            <div className="action-buttons">
                <button onClick={onMarkAllCompleted} className="action-btn complete-all">
                    Отметить все как выполненные
                </button>
                <button onClick={onResetAll} className="action-btn reset-all">
                    Сбросить все статусы
                </button>
                <button onClick={onRandomNext} className="action-btn random-next">
                    Случайный выбор следующей технологии
                </button>
            </div>
        </div>
    );
}

export default QuickActions;
