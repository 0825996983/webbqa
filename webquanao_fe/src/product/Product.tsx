import React, { useEffect, useState } from "react";
import ProductModel from "../models/ProductModel";
import { getAllGalery } from "../api/GaleryApi";
import GaleryModel from "../models/GaleryModel";
import { Link } from "react-router-dom";
import dinhDangso from "../component/ultis/Dinhdangso";
import { useShoppingContext } from "../component/contexts/ShoppingContext";

interface ProductPropsInterface {
  product: ProductModel;
}

const Product: React.FC<ProductPropsInterface> = (props) => {

  const{addCartItem} = useShoppingContext()
  const product_id = props.product.id;

  const [listGalery, setListGalery] = useState<GaleryModel[]>([]);
  const [downloadingData, setdownloadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllGalery(product_id)
      .then((galeryData) => {
        setListGalery(galeryData);
        setdownloadingData(false);
      })
      .catch((error) => {
        setError(error.message);
        setdownloadingData(false);
      });
  }, [product_id]);

  if (downloadingData) {
    return (
      <div>
        <h1>Đang Tải Dữ Liệu</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Lỗi:{error}</h1>
      </div>
    );
  }
  let imageData: string = "";
  if (listGalery[0] && listGalery[0].imageData) {
    imageData = listGalery[0].imageData;
  }

  const productWithImage = new ProductModel(
    props.product.id,
    props.product.productName,
    props.product.price,
    props.product.listPrice,
    props.product.description,
    props.product.quantity,
    props.product.size,
    props.product.color,
    imageData // Truyền imageData vào ProductModel
  );


  

  return (
    <li className="w-full mb-6">
      <div className="group block overflow-hidden w-full relative shadow-sm rounded-md">
        {/* Nhãn giảm giá ở góc phải trên */}
        <span className="absolute top-5 right-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md transition-transform transform hover:scale-110 z-10">
          <span className="font-bold">-21%</span>
        </span>

        {/* Nhãn "New Arrival" ở góc trái */}
        <span className="absolute top-5 left-0 bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-e-md z-10">
          New Arrival
        </span>

        <Link to={`/product/${props.product.id}`}>
          <img
            src={imageData}
            alt={props.product.productName}
            className="h-[530px] w-full object-cover rounded-t-lg transition duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="bg-white p-4 rounded-b-lg">
          <h3 className="text-xl font-sans group-hover:font-serif transition duration-300 mb-2">
            {props.product.productName}
          </h3>

          <div className="flex items-center justify-between text-gray-900 mb-2">
            <p className="text-lg font-semibold">
              {dinhDangso(props.product.price)}đ
            </p>
            <span className="text-red-500 text-sm mr-[180px]">
              <del>{dinhDangso(props.product.listPrice)}đ</del>
            </span>
            {/* Các ô vuông màu bên cạnh giá */}
            <div className="flex space-x-2 ml-3">
              <div className="w-4 h-4 bg-black border border-gray-300"></div>
              <div className="w-4 h-4 bg-white border border-gray-300"></div>
            </div>
          </div>

          <p className="text-xs uppercase tracking-wide text-gray-600 mb-4">
            Số lượng: {props.product.quantity}
          </p>

          {/* Nút "Add to Cart" */}
          <button className="w-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white h-[45px] rounded-lg text-sm font-semibold transition duration-300 shadow-md hover:shadow-lg transform  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                  onClick={()=> addCartItem(productWithImage)}
          >
            Add to Cart
          </button>



        </div>
      </div>
    </li>
  );
};

export default Product;
