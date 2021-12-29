import React, { useEffect, useState } from 'react';
import { levelList } from '../modules/Common';
import RadioButton from './atoms/RadioButton';
import { HeaderText } from './atoms/Text';
import Header from './Header';
import '../styles/Option.css';

const OptionContainer = () => {

  const [selectedLevel, setSelectedLevel] = useState<string>('');

  useEffect(() => {

    if (levelList[localStorage.getItem('difficulty')] === undefined) {
      setSelectedLevel('Easy');
      return;
    }

    setSelectedLevel(localStorage.getItem('difficulty'));
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('difficulty', e.currentTarget.value);
    setSelectedLevel(e.currentTarget.value);
  }

  const levelContainer: JSX.Element[] = Object.entries(levelList).map((ele, idx) => {

    const [key, value] = ele;
    const isSelected = selectedLevel === key;

    return (
      <div className='option-row-container' key={idx}>
        <RadioButton
          name='level'
          value={key}
          onChange={onChange}
          checked={isSelected} />
        <label>
          <span style={{ fontSize: '18px' }}>{key}
          </span> <br />
          {`${value.row} X ${value.col} Mine : ${value.numberOfMine}`}
        </label>
      </div>
    )
  });

  return (
    <>
      <main className='option-container'>
        <HeaderText 
          size={'1.4rem'}
          value={'Difficulty'}
          isColor={true}
        />
        {levelContainer}
      </main>
    </>
  )
}

const Option = () => {

  return (
    <>
      <Header selected='Option' />
      <OptionContainer />
    </>
  )
}

export default Option;