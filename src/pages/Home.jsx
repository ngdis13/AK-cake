import React from 'react';
import axios from 'axios';
import qs from 'qs';

import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Sort, { list } from '../components/Sort.jsx';
import Categories from '../components/Categories.jsx';
import CakeBlock from '../components/CakeBlock/index.jsx';
import Skeleton from '../components/CakeBlock/Skeleton.jsx';
import Pagination from '../components/Pagination/index.jsx';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice.js';
import { fetchCakes } from '../redux/slices/cakeSlice.js';

const Home = ({ searchValue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const sortType = sort.sortProperty;
  const { items, status } = useSelector((state) => state.cake);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  //Если был первый рендер, то проверяем URL параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      if (sort) {
        dispatch(setFilters({ ...params, sort }));
        isSearch.current = true;
      } else {
        console.warn('Invalid sort property:', params.sortProperty);
      }
    }
  }, [dispatch]);

  //Если был первый рендер то запрашиваем тортики
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      dispatch(fetchCakes({ categoryId, sortType, searchValue, currentPage }));
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage, dispatch]);

  //Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  const cakes = items.map((obj) => <CakeBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все торты</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>
            Произошла ошибка<icon>😕</icon>
          </h2>
          <p>
            Не удалось получить тортики. Попробуйте повторить попытку позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : cakes}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
