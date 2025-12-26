import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const DateRangePicker = ({ checkIn, checkOut, onChange, minDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState(checkIn ? new Date(checkIn) : null);
  const [selectedEnd, setSelectedEnd] = useState(checkOut ? new Date(checkOut) : null);
  const [hoverDate, setHoverDate] = useState(null);

  useEffect(() => {
    if (selectedStart && selectedEnd) {
      onChange({
        checkIn: selectedStart.toISOString().split('T')[0],
        checkOut: selectedEnd.toISOString().split('T')[0]
      });
    }
  }, [selectedStart, selectedEnd]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { firstDay, lastDay };
  };

  const generateMonth = (date) => {
    const { firstDay, lastDay } = getDaysInMonth(date);
    const days = [];
    const startDay = firstDay.getDay();
    
    // Previous month days
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const prevLastDay = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate();
    
    for (let i = startDay - 1; i >= 0; i--) {
      const day = prevLastDay - i;
      days.push({
        date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day),
        isCurrentMonth: false,
        isDisabled: true
      });
    }
    
    // Current month days
    const today = new Date();
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const dayDate = new Date(date.getFullYear(), date.getMonth(), i);
      const isPast = dayDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      days.push({
        date: dayDate,
        isCurrentMonth: true,
        isDisabled: isPast
      });
    }
    
    // Next month days
    const totalCells = 42; // 6 weeks
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    for (let i = 1; days.length < totalCells; i++) {
      days.push({
        date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i),
        isCurrentMonth: false,
        isDisabled: true
      });
    }
    
    return days;
  };

  const handleDateClick = (day) => {
    if (day.isDisabled) return;
    
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(day.date);
      setSelectedEnd(null);
    } else if (selectedStart && !selectedEnd) {
      if (day.date < selectedStart) {
        setSelectedStart(day.date);
        setSelectedEnd(selectedStart);
      } else {
        setSelectedEnd(day.date);
      }
    }
  };

  const isInRange = (date) => {
    if (!selectedStart || !selectedEnd) return false;
    return date > selectedStart && date < selectedEnd;
  };

  const isStart = (date) => {
    return selectedStart && date.toDateString() === selectedStart.toDateString();
  };

  const isEnd = (date) => {
    return selectedEnd && date.toDateString() === selectedEnd.toDateString();
  };

  const monthDays = generateMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Calendar size={20} />
          {monthName}
        </h3>
        
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {monthDays.map((day, index) => {
          const isRange = isInRange(day.date);
          const isStartDate = isStart(day.date);
          const isEndDate = isEnd(day.date);
          const isToday = day.date.toDateString() === new Date().toDateString();
          
          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              onMouseEnter={() => !day.isDisabled && setHoverDate(day.date)}
              onMouseLeave={() => setHoverDate(null)}
              disabled={day.isDisabled}
              className={`
                relative h-12 rounded-lg flex items-center justify-center
                ${day.isDisabled ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'}
                ${isRange ? 'bg-blue-100 dark:bg-blue-900/30' : ''}
                ${isStartDate || isEndDate ? 'bg-blue-600 text-white' : ''}
                ${isToday && !isStartDate && !isEndDate ? 'border-2 border-blue-500' : ''}
                ${!day.isCurrentMonth ? 'text-gray-400' : ''}
                transition-colors
              `}
            >
              {day.date.getDate()}
              
              {(isStartDate || isEndDate) && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full text-xs flex items-center justify-center text-white">
                  {isStartDate ? 'IN' : 'OUT'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Dates Display */}
      {(selectedStart || selectedEnd) && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Check-in</label>
              <div className="text-lg font-bold mt-1">
                {selectedStart?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Check-out</label>
              <div className="text-lg font-bold mt-1">
                {selectedEnd?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
          
          {selectedStart && selectedEnd && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between">
                <span>Total Nights:</span>
                <span className="font-bold">
                  {Math.ceil((selectedEnd - selectedStart) / (1000 * 60 * 60 * 24))}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;