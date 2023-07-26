import { useState } from 'react';

interface AgeState {
  age1: number;
  age2: number;
  age3: number;
}

const Testing = () => {
  const [ages, setAges] = useState<AgeState>({
    age1: 0,
    age2: 0,
    age3: 0,
  });

  const increment = (ageNumber: keyof AgeState) => {
    setAges((prevState) => ({
      ...prevState,
      [ageNumber]: prevState[ageNumber] + 1,
    }));
  };

  return (
    <div>
      <button onClick={() => increment('age1')}>
        Increment Age 1
      </button>
      <button onClick={() => increment('age2')}>
        Increment Age 2
      </button>
      <button onClick={() => increment('age3')}>
        Increment Age 3
      </button>

      <div>
        Age 1: {ages.age1}
        <br />
        Age 2: {ages.age2}
        <br />
        Age 3: {ages.age3}
      </div>
    </div>
  );
};

export default Testing;
