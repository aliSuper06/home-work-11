import "./Card.css";
import styled from "styled-components";
import { useShopContext } from "../contextState";
import { useState } from "react";

function Card({}) {
  const { store, addProd } = useShopContext();
  // const [title,setTitle] = useState(false)




  console.log(store);
  return (
    <div className="Main-card">
      {store.product.map((el) => {
        return (
          <div key={el.id} className="card">
            <Images src={el.img} />
            <Heading>{el.name}</Heading>
            <Price>{el.staticPrice} $</Price>
            {el.quantity > 1 ? null : (
              <button
                className="button"
                onClick={() => addProd(el.id)}
                disabled={el.quantity > 0}
              >
             Add
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Card;

const Images = styled.img`
  width: 150px;
  border-radius: 10px;
  margin-top: 20px;
`;
const Price = styled.p`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Heading = styled.h3`
  color: #fff;
`;
