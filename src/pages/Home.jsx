import React from 'react';
import { useEffect, useState } from 'react';

import Sort from '../components/Sort.jsx';
import Categories from '../components/Categories.jsx';
import CakeBlock from '../components/CakeBlock/index.jsx';
import Skeleton from '../components/CakeBlock/Skeleton.jsx';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0); 
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `categoryID=${categoryId}&` : '';
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-')? 'asc': 'desc';


    let url = `https://6836b7ad664e72d28e41cd1f.mockapi.io/Items?${category}&sortBy=${sortBy}&order=${order}`;

    fetch(url)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(index) => setCategoryId(index)}
        />
        <Sort sortType={sortType} onClickSort={(obj) => setSortType(obj)} />
      </div>
      <h2 className="content__title">Все торты</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <CakeBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
