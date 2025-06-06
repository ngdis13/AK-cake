import React from 'react';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Sort from '../components/Sort.jsx';
import Categories from '../components/Categories.jsx';
import CakeBlock from '../components/CakeBlock/index.jsx';
import Skeleton from '../components/CakeBlock/Skeleton.jsx';
import Pagination from '../components/Pagination/index.jsx';
import { setCategoryId } from '../redux/slices/filterSlice.js';

const Home = ({searchValue}) => {
  const dispatch = useDispatch();
  const {categoryId, sort} = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;


  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);


  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `categoryID=${categoryId}&` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    let url = `https://6836b7ad664e72d28e41cd1f.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          console.warn(`HTTP Error! status: ${res.status}`);
          throw new Error(`HTTP Error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((arr) => {
        if (!Array.isArray(arr)) {
          console.error('API returned data that is not an array', arr);
          setItems([]);
        } else {
          setItems(arr);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading cakes:', err);
        setItems([]);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const cakes = items.map((obj) => <CakeBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={onClickCategory}
        />
        <Sort/>
      </div>
      <h2 className="content__title">Все торты</h2>
      <div className="content__items">{isLoading ? skeletons : cakes}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
