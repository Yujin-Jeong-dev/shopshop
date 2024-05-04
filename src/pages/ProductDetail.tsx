import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProudctDetail } from 'api/product';
import { SelectedProduct } from 'components/SelectedProduct';
import { useProductCountContext } from 'context/ProductCountContext';
import { useParams } from 'react-router-dom';
import { GetProductType, ProductCountContextType } from 'types/product';

const ProductDetail = () => {
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: product,
  } = useQuery<GetProductType>({
    queryKey: ['products', id],
    queryFn: () => getProudctDetail(id as string),
  });
  const {
    size: option,
    selected,
    setPrice,
    selectSize,
    selectProduct,
  } = (useProductCountContext()! as ProductCountContextType) || {};

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const { name, image, description, price, size } = product!;

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPrice(price);
    selectSize(value);
    selectProduct(value);
  };

  return (
    <div className='w-full flex flex-col md:flex-row content-between gap-10 p-10'>
      <img
        className='w-full basis-1/2 md:w-140 md:h-140'
        src={image}
        alt={'상품 이미지'}
      />
      <div className='w-full basis-1/2 flex flex-col gap-2 pl-10'>
        <h3 className='text-xl font-semibold'>{name}</h3>
        <p>{`${price.toLocaleString()}원`}</p>
        <div className='border-b-2'></div>
        <p>{description}</p>
        <select
          className='h-8 border border-gray-400 outline-none cursor-pointer'
          onChange={handleSelect}
          defaultValue={''}
        >
          <option disabled value={''}>
            [사이즈]를 선택하세요.
          </option>
          {size?.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
        {selected && <SelectedProduct option={option} />}
        <button className='h-10 bg-primary text-white'>장바구니 담기</button>
      </div>
    </div>
  );
};

export default ProductDetail;
