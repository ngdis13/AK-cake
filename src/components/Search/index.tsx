import styles from './Search.module.scss';
import closeIcon from '../../assets/close-icon.svg';
import React, {useRef, useCallback, useState } from 'react';
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice.ts';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [ value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('')
    inputRef.current?.focus();
  }
  
  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000), 
    []
  )

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }


  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
          id="XMLID_223_"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder="Поиск"
      />
      {value && (
        <img
          className={styles.clearIcon}
          src={closeIcon}
          onClick={onClickClear}
          alt=""
        />
      )}
    </div>
  );
};
