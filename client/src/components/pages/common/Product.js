import React, { useState } from "react";
import Bar from "../../utils/custom/Bar";
import { useLocation } from "react-router";
import ProductSliderImages from "../../utils/custom/ProductSliderImages";
import ProductCard from "../../utils/custom/ProductCard";

const Product = () => {
  const location = useLocation();
  const utils = location.state.utils;
  const [visible, setVisible] = useState(false);
  const min_offer = Math.trunc(
    parseInt(utils.product.precio) +
      (parseInt(utils.product.precio) * Math.floor(Math.random() * 10 + 1)) /
        100
  );

  return (
    <div className=" h-screen w-screen justify-center items-center flex">
      <Bar
        visible={visible}
        setVisible={setVisible}
        nombre={utils.nombre}
        apellido={utils.apellido}
      />
      <div className=" w-full mr-20  ml-20 mt-10 flex">
        <ProductSliderImages id_product={utils.product.id_producto} />
        <ProductCard
          nombre={utils.product.nombre}
          descripcion={utils.product.descripcion}
          precio={utils.product.precio}
          marca={utils.product.marca}
          modelo={utils.product.modelo}
          año={utils.product.año}
          id_producto={utils.product.id_producto}
          id_cliente={utils.id_cliente}
          min_offer={min_offer}
        />
      </div>
    </div>
  );
};

export default Product;
