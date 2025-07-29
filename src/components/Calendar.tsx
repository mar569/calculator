import React, { memo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';

const Calendar = memo(() => {
    const [startDate, setStartDate] = React.useState(new Date());

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Календарь</h2>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date!)}
                inline
                locale={ru}
                dateFormat="dd.MM.yyyy"
            />
        </div>
    );
});

export default Calendar;
