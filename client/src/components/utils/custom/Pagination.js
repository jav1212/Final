import React from "react";
import Card from "./Card";

const Pagination = ({ products, activePage, nombre, apellido, id_cliente }) => {
  const productsPerPage = products.slice(
    (activePage - 1) * 3,
    (activePage - 1) * 3 + 3
  );

  return (
    <div className="flex-wrap flex justify-between w-full mr-12  ml-12 mt-10 h-3/4">
      {productsPerPage.map((product, index) => {
        return (
          <Card
            product={product}
            key={index}
            nombre={nombre}
            apellido={apellido}
            activePage={activePage}
            id_cliente={id_cliente}
          />
        );
      })}
    </div>
  );
};

export default Pagination;
