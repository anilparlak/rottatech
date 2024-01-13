import React from "react";
import { IoMdSearch } from "react-icons/io";

import "./search.scss";
const Search = ({onChangeHandler}) => {

    return(
        <div className="search">
            <input type="text" className="search__input" placeholder="Search" onChange={onChangeHandler}/>
            <button type="submit" className="search__button">
            <IoMdSearch />
        </button>
     </div>
    );
};

export default Search;