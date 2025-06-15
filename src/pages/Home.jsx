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
import { setItems, fetchCakes } from '../redux/slices/cakeSlice.js';

const Home = ({ searchValue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const sortType = sort.sortProperty;
  const items = useSelector((state) => state.cake.items);
  const [isLoading, setIsLoading] = useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchCakes = async () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `categoryID=${categoryId}&` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    let url = `https://6836b7ad664e72d28e41cd1f.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;
    await axios
      .get(url)
      .then((response) => {
        if (!Array.isArray(response.data)) {
          console.error(
            'API returned data that is not an array:',
            response.data
          );
          dispatch(setItems([]));
        } else {
          dispatch(setItems(response.data));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading cakes:', err);
        if (err.response) {
          console.warn(`HTTP Error! status: ${err.response.status}`);
        }
        dispatch(setItems([]));
        setIsLoading(false);
      });
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
  }, []);

  //Если был первый рендер то запрашиваем тортики
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchCakes();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

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
      <div className="content__items">{isLoading ? skeletons : cakes}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
