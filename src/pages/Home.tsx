import React, { useCallback } from 'react';
import qs from 'qs';

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store.ts';

import {list} from  '../components/Sort.tsx';
import {CakeBlock, Skeleton, Pagination, Categories, Sort} from '../components'


import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice.ts';
import { fetchCakes, selectCakeData } from '../redux/slices/cakeSlice.ts';

import type { FilterSliceState } from '../redux/slices/filterSlice.ts';


const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(
    selectFilter
  );

  const sortType = sort.sortProperty;
  const { items, status } = useSelector(selectCakeData);

  const onClickCategory = useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    }, []
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  //Если был первый рендер, то проверяем URL параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      const searchValue = typeof params.searchValue === 'string' ? params.searchValue : '';

      const filters: FilterSliceState = {
        searchValue,
        categoryId: Number(params.categoryId) || 0,
        currentPage: Number(params.currentPage) || 1,
        sort: sort || list[0], 
      };

      dispatch(setFilters(filters));
      isSearch.current = true;
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
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все торты</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>
            Произошла ошибка<span>😕</span>
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
