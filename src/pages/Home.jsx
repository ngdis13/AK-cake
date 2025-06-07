import React from 'react';
import axios from 'axios';
import qs from 'qs';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Sort from '../components/Sort.jsx';
import Categories from '../components/Categories.jsx';
import CakeBlock from '../components/CakeBlock/index.jsx';
import Skeleton from '../components/CakeBlock/Skeleton.jsx';
import Pagination from '../components/Pagination/index.jsx';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice.js';

const Home = ({ searchValue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const sortType = sort.sortProperty;

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `categoryID=${categoryId}&` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    let url = `https://6836b7ad664e72d28e41cd1f.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;
    axios
      .get(url)
      .then((response) => {
        if (!Array.isArray(response.data)) {
          console.error(
            'API returned data that is not an array:',
            response.data
          );
          setItems([]);
        } else {
          setItems(response.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading cakes:', err);
        if (err.response) {
          console.warn(`HTTP Error! status: ${err.response.status}`);
        }
        setItems([]);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`)
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
