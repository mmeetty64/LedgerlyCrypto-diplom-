import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'flowbite';
import Service from '../../../Service/Service';

interface ICatalog {
  id: number;
  title: string;
  description: string;
  tokenPrice: number;
  shop: string;
  amount: number;
  created_at: number;
  status: boolean;
}

interface IShop {
  title: string;
  description: string;
  logo: string;
  holder: string;
}

export const Catalog = () => {
  const [catalog, setCatalog] = useState<ICatalog[]>([]);
  const [images, setImages] = useState<{ [key: number]: string }>({});
  const [shopTitles, setShopTitles] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    (async () => {
      const req: ICatalog[] = await Service.viewCatalog();
      setCatalog(req);
    })();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = catalog.map(async (item) => {
        const img = await Service.viewProdImg(item.id);
        return { id: item.id, img: img[0] };
      });

      const imagesArray = await Promise.all(imagePromises);
      const imagesMap = imagesArray.reduce((acc, curr) => {
        acc[curr.id] = curr.img;
        return acc;
      }, {} as { [key: number]: string });

      setImages(imagesMap);
    };

    if (catalog.length > 0) {
      fetchImages();
    }
  }, [catalog]);

  useEffect(() => {
    const fetchShopTitles = async () => {
      const shopPromises = catalog.map(async (item) => {
        const shop = await Service.viewShop(item.shop);
        return { address: item.shop, title: shop.title };
      });

      const shopsArray = await Promise.all(shopPromises);
      const shopsMap = shopsArray.reduce((acc, curr) => {
        acc[curr.address] = curr.title;
        return acc;
      }, {} as { [key: string]: string });

      setShopTitles(shopsMap);
    };

    if (catalog.length > 0) {
      fetchShopTitles();
    }
  }, [catalog]);

  return (
    <div className='flex justify-evenly w-full flex-wrap'>
      {
        catalog.map((el) => {
          if (el.status === false) return null;

          return (
            <div key={el.id} className="mt-5 mb-5 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Link to={`/product/${el.id}`}>
                <img className="p-8 rounded-t-lg w-full" src={`./images/${images[el.id]}`} alt="product image" />
              </Link>
              <div className="px-5 pb-5 flex flex-col items-start">
                <a href="#">
                  <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                    {el.title}
                  </h1>
                </a>
                <p className="mb-3 mt-3 font-normal text-gray-700 dark:text-gray-400 break-words w-full">{el.description}</p>
                <div className="w-full flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{el.tokenPrice / 10000} LED</span>
                  <Link to={`/product/${el.id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Посмотреть</Link>
                </div>
                <Link to={`/shop/${el.shop}`}>
                  <p className="mb-3 font-normal text-gray-400 dark:text-gray-400">
                    {shopTitles[el.shop] || `${el.shop.substring(0, 6)}...`}
                  </p>
                </Link>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};
