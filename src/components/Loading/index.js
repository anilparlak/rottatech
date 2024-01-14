import React from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import './loading.scss';

const Loading = ({loadingClass}) => {
  return (
    <div className={`page-loading ${loadingClass ? loadingClass : ''}`}>
      <AiOutlineLoading3Quarters />
    </div>
  );
}

export default Loading;