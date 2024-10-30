import { formatDate } from '@/utils/date';
import { CalendarDaysIcon } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useRef, useEffect } from 'react';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
  dateSet: (date: ValuePiece) => void;
};

const ReserveCalendarPopup = ({ dateSet }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateString, setDateString] = useState<string>('');
  const calendarRef = useRef<HTMLDivElement>(null);

  const minDate = new Date();
  const maxDate = new Date(minDate);
  maxDate.setDate(maxDate.getDate() + 30);
  // 달력 팝업 토글 함수
  const toggleCalendar = () => setIsOpen((prev) => !prev);

  // 날짜 변경 시 팝업 닫기
  const handleDateChange = (value: Value) => {
    const date = Array.isArray(value) ? value[0] : value;
    if (!date) return;
    setSelectedDate(date);
    if (!selectedDate) return;
    setDateString(formatDate(selectedDate));
    setIsOpen(false);
  };
  useEffect(() => {
    handleDateChange(selectedDate);
    dateSet(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={toggleCalendar}
        className='flex items-center border bg-white rounded-lg p-1 pr-2 border-black w-fit min-w-40 gap-1 justify-center'
      >
        <span className='w-full'>
          {dateString
            ? `${dateString.slice(0, 4)}.${dateString.slice(4, 6)}.${dateString.slice(6, 8)}`
            : '---- . -- . --'}
        </span>
        <CalendarDaysIcon />
      </button>

      {isOpen && (
        <div ref={calendarRef} className='absolute top-full left-0 mt-1'>
          <Calendar
            onChange={(value) => {
              handleDateChange(value);
            }}
            value={selectedDate}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
};

export default ReserveCalendarPopup;
