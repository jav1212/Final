import { useNavigate } from "react-router";

const Card = ({ product, nombre, apellido, activePage, id_cliente }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const utils = {
      id_cliente: id_cliente,
      nombre: nombre,
      apellido: apellido,
      product: product,
    };
    navigate("/product", { state: { utils: utils } });
  };

  return (
    <div style={{ width: "30%" }} className=" h-fit">
      <div className=" flex justify-center items-center  h-2/4">
        <img
          className="transform scale-100 hover:scale-110 transition duration-300 ease-in-out hover:cursor-zoom-in"
          style={{ width: "300px", height: "300px", objectFit: "contain" }}
          loading="lazy"
          src={product.url_image}
          alt=""
        />
      </div>
      <div className=" h-2/4">
        <div className=" mt-10">
          <h1 className=" text-3xl font-semibold font-[Helvetica Neue]">
            {product.nombre}
          </h1>
        </div>
        <div className=" mt-5">
          <h1
            className=" text-2xl w-fit font-medium font-[Dosis] hover:underline hover:font-semibold hover:cursor-pointer"
            onClick={handleClick}
          >
            USD{product.precio}
          </h1>
        </div>
        <div className=" mt-5">
          <p
            className=" text-gray-700 text-xl"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.descripcion}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
