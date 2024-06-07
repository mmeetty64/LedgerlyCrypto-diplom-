import React, {useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Service from '../../Service/Service';
import { Context } from '../../Context/ContextWrapper';

interface IProduct {
  id: number;
  title: string;
  description: string;
  tokenPrice: number;
  shop: string;
  amount: number;
  created_at: number;
  status: boolean;
}

interface IReview {
    grade: number;
    description: string;
    user: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [image, setImage] = useState<string[]>([])
  const [reviews, setReviews] = useState<IReview[]>([])
  const [createReview, setCreateReview] = useState<number>(0)

  const {user} = useContext(Context);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await Service.viewProduct(Number(id));
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await Service.viewProdImg(Number(id));
      setImage(data);
      console.log(data)
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await Service.viewProdReview(Number(id));
      setReviews(data);
    };
    fetchProduct();
  }, [id, createReview]);

  const reviewHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const description = (event.currentTarget.elements.namedItem('description') as HTMLInputElement).value;
    const grade = Number((event.currentTarget.elements.namedItem('grade') as HTMLSelectElement).value);
    const idProd = Number(id);

    const cr = setCreateReview(createReview+1);
    
    try {
      await Service.createReview(idProd, grade, description, user);
      alert('Отзыв отправлен');
    } catch (error) {
      console.error('Ошибка при отправке отзыва', error);
      alert('Ошибка при отправке отзыва');
    }
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center w-4/5"'>
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
          <img className="w-full dark:hidden" src={`../../../images/${image[0]}`} alt="" />
        </div>

        <div className="mt-6 sm:mt-8 lg:mt-0">
          <h1
            className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
          >
            {product.title}
          </h1>
          
          <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
            <p
              className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white mb-5"
            >
              {product.tokenPrice / 10000} LED
            </p>
          </div>
          {
            user != '' ?
            <Link to={`/order/${id}`} className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Заказать</Link>
            : ''
          }
          <p className="mt-5 mb-6 text-gray-500 dark:text-gray-400">
            {product.shop.substring(0, 8)}...
          </p>

          <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

          <p className="mb-6 text-gray-500 dark:text-gray-400">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  </section>
  <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased w-4/6">
  <h1 className='text-3xl font-semibold text-gray-900 dark:text-white'>Отзывы</h1>
  {
    user != '' ?
  
    <form className="mt-5 mb-5" onSubmit={reviewHandler}>
      <div className="mt-5 mb-5">
        <h1 className='text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-5'>Оставить отзыв</h1>
        <input type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Текст отзыва" required />
      </div>
      <div className="mb-5">
      <select id="grade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
        </select>
      </div>

      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Отправить</button>
    </form>
    : ''
    }
  {
        [...reviews].reverse().map((el) => {

        return (
          <div className="gap-3 py-6 sm:flex sm:items-start">
            <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
              <div className="space-y-0.5">
                <p className="text-base font-semibold text-gray-900 dark:text-white">{el.user.substring(0, 8)}</p>
                <p className="text-sm font-normal text-yellow">Оценка: {el.grade}</p>
              </div>

              <div className="inline-flex items-center gap-1">
                <svg
                  className="h-5 w-5 text-primary-700 dark:text-primary-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Зарегистрированный аккаунт</p>
              </div>
            </div>

            <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
              <p className="text-base font-normal text-gray-500 dark:text-gray-400 break-words" style={{ maxWidth: '100%', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                {el.description}
              </p>
            </div>
          </div>
          )
        })
      }
  
  </section>
  </div>

  
  );
};

export default ProductDetail;
