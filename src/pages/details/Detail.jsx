import React from 'react';
import { useParams } from 'react-router-dom';

import DetailsBanner from './detailsBanner/DetailsBanner';
import useFetch from '../../hooks/useFetch';

import "./style.scss";

const Detail = () => {

  const { mediaType, id } = useParams();
  const { data, isLoading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, isLoading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
    </div>
  )
}

export default Detail
