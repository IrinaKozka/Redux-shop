import React from 'react'
import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { searchProducts } from '../Product/productsSlice';

export function ProductSearch  ()  {
// const [query, setQuery] = useState('');
const dispatch = useAppDispatch()

// const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     dispatch(searchProducts({query}));
//  }
 //akcja po wyslaniu
  return (
   
      <form className="d-flex" role="search" 
    //   onSubmit={handleSubmit}
      >
        <input
        //   value={query}
          onKeyDown={(e: any)=>dispatch(searchProducts({query: e.target.value}))}
        //   onChange={(e)=> setQuery(e.target.value)}
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        {/* <button className="btn btn-outline-success" type="submit">
          Search
        </button> */}
      </form>
    
  );
}
