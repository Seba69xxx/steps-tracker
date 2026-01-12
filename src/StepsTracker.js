import React, { useState } from 'react';

export default function StepsTracker() {
  const [form, setForm] = useState({ date: '', distance: '' });
  const [workouts, setWorkouts] = useState([]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.distance) return;

    const distance = parseFloat(form.distance);
    
    setWorkouts(prevWorkouts => {
      const existingIndex = prevWorkouts.findIndex(item => item.date === form.date);
      let newWorkouts;
      
      if (existingIndex !== -1) {
        newWorkouts = [...prevWorkouts];
        newWorkouts[existingIndex] = {
          ...newWorkouts[existingIndex],
          distance: newWorkouts[existingIndex].distance + distance
        };
      } else {
        newWorkouts = [...prevWorkouts, { date: form.date, distance }];
      }

      return newWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    setForm({ date: '', distance: '' });
  };

  const handleDelete = (dateToDelete) => {
    setWorkouts(prev => prev.filter(item => item.date !== dateToDelete));
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year.slice(2)}`;
  };

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
            <input 
              id="date"
              type="date" 
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="distance">Пройдено км</label>
            <input 
              id="distance"
              type="number" 
              step="0.1"
              name="distance"
              value={form.distance}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-btn">OK</button>
        </div>
      </form>

      <div className="data-table">
        <div className="table-header">
          <div className="col-date">Дата (ДД.ММ.ГГ)</div>
          <div className="col-distance">Пройдено км</div>
          <div className="col-actions">Действия</div>
        </div>
        
        <div className="table-body">
          {workouts.length === 0 ? (
            <div className="empty-state">Нет записей</div>
          ) : (
            workouts.map(item => (
              <div key={item.date} className="table-row">
                <div className="col-date">{formatDate(item.date)}</div>
                <div className="col-distance">{item.distance.toFixed(1)}</div>
                <div className="col-actions">
                  <button className="action-btn edit-btn" type="button">✎</button>
                  <button 
                    className="action-btn delete-btn" 
                    type="button"
                    onClick={() => handleDelete(item.date)}
                  >
                    ✘
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
