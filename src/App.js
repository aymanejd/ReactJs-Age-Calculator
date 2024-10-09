import './App.css';

import { useState, useEffect } from 'react';

function App() {
  const [birthDate, setBirthDate] = useState('2010-08-16');
  const [currentDate, setCurrentDate] = useState('');
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [totalDays, setTotalDays] = useState(0);
  const [totalWeeks, setTotalWeeks] = useState(0);
  const [totalMonths, setTotalMonths] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [day, setday] = useState(0);
  const [err, setErr] = useState(false);
  const [monthsUntilNextBirthday, setmonthsUntilNextBirthday] = useState(0)
  const [dayssUntilNextBirthday, setdayssUntilNextBirthday] = useState(0);
  const [nextBirthdayDayName, setnextBirthdayDayName] = useState('')


  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };
  const calculateAge = () => {
    const dob = new Date(birthDate);
    dob.setHours(0, 0, 0, 0);
    const now = new Date(currentDate || new Date());
    now.setHours(0, 0, 0, 0);

    if (dob > now) {
      setErr(true);
      alert("Birth date must be less then current date !");
      return;
    } else {
      setErr(false);
    }

    const nextBirthday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());

    if (nextBirthday <= now) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }

    const monthsUntilNextBirthday = (nextBirthday.getFullYear() - now.getFullYear()) * 12 + (nextBirthday.getMonth() - now.getMonth());
    const daysUntilNextBirthday = Math.floor((nextBirthday - now) / (1000 * 60 * 60 * 24));

    setmonthsUntilNextBirthday(monthsUntilNextBirthday);
    setdayssUntilNextBirthday(daysUntilNextBirthday % 30); 
    setnextBirthdayDayName(nextBirthday.toLocaleDateString('en-US', { weekday: 'long' }));

    const ageInMilliseconds = now - dob;
    const years = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((ageInMilliseconds % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((ageInMilliseconds % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));

    const totalDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 30.44));
    const totalHours = Math.floor(ageInMilliseconds / (1000 * 60 * 60));
    const totalMinutes = Math.floor(ageInMilliseconds / (1000 * 60));

    setAge({ years, months, days });
    setTotalDays(totalDays);
    setTotalWeeks(totalWeeks);
    setTotalMonths(totalMonths);
    setTotalHours(totalHours);
    setTotalMinutes(totalMinutes);
  };

  useEffect(() => {
    calculateAge();
  }, [])
  return (
    <div className="App">
      <div className='birth'>
        <input type='date' value={birthDate !== "" ? birthDate : '2010-08-16'} onChange={handleBirthDateChange} />
        <button onClick={calculateAge}>Calculate</button>
      </div>
      <div className='parrent'>
        <div className='birthinfo'>
          <div className='age'>
            <div className='agepara'>Age</div>
            <p className='yesrpara'>{age.years} </p>  <span className='yearspan'>years</span>
            <div className='monthdays'>
              <span className='month'> {age.months} month</span> <span>|</span> <span className='days'>{age.days} days</span>
            </div>
          </div>
          <div className='nextbirth'>
            <p>Next birthday</p>
            <div className='birthicon'><i className="bi bi-cake2"></i>
            </div>
            <div className='nextbirthday'>{nextBirthdayDayName}</div>
            <div className='monthdays'>
              <span className='month'>{monthsUntilNextBirthday} months</span> <span>|</span> <span className='days'>{dayssUntilNextBirthday} days</span>
            </div>
          </div>


        </div>
        <div className='summary'>
          <div className='summarypara'>
            <p>Summary</p>
          </div>
          <div className='yearmonthday'>
            <div>
              <p className='des'>Years</p>
              <p className='des2'>{age.years}</p>
            </div>
            <div>
              <p className='des'>Months</p>
              <p className='des2'>{totalMonths}</p>
            </div>
            <div>
              <p className='des'>Weeks</p>
              <p className='des2'>{totalWeeks}</p>
            </div>
          </div>
          <div className='hourweekmin'>
            <div>
              <p className='des'>Days</p>
              <p className='des3'>{totalDays}</p>
            </div>
            <div>
              <p className='des'>Hours</p>
              <p className='des3'>{totalHours}</p>
            </div>
            <div>
              <p className='des'>Minutes</p>
              <p className='des3'>{totalMinutes}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
