import React from "react";
import styled from "styled-components";
import { useShopContext } from "../contextState";

const List = () => {
  const { store = [], removeProduct, incProd, decProd } = useShopContext();
  console.log(store, "store");

  const totalPrice = store?.product.map((item) => {
    if (item.quantity === 0) {
      const result = { ...item, price: (item.price = 0) };
      return result.price;
    } else {
      return item.price;
    }
  });
  console.log(totalPrice, "total");
  const resultTotal = totalPrice.reduce((a, b) => a + b, 0);
  return (
    <Continer>
      <div>
        <Table>
          <Thead>
            <p className="id">#</p>
            <p>Product</p>
            <p>Product Name</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Remove</p>
          </Thead>
          {store.product.map((item, index) => {
            return (
              item.quantity !== 0 && (
                <Tbody key={item.id}>
                  <p className="id">{index + 1}</p>
                  <Timg>
                    <img src={item.img} alt="productTable" />
                  </Timg>
                  <div>{item.name}</div>
                  <div>{item.price} $</div>
                  <ContainerCount>
                    <ButtonCount onClick={() => decProd(item.id)}>
                      -
                    </ButtonCount>
                    <span>{item.quantity}</span>
                    <ButtonCount onClick={() => incProd(item.id)}>
                      +
                    </ButtonCount>
                  </ContainerCount>
                  <ButtonRemove onClick={() => removeProduct(item.id)}>
                    remove
                  </ButtonRemove>
                </Tbody>
              )
            );
          })}
        </Table>
      </div>
      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontSize: "3rem" }}>TOTAL: {resultTotal}</p>
      </div>
    </Continer>
  );
};
export default List;
const Continer = styled.div`
  color: #fff;
  margin: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const Table = styled.div`
  display: flex;
  flex-direction: column;
`;
const Thead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  font-size: 1.6rem;
  font-weight: 600;
  border-top: 3px solid #8c8484;
  margin-top: 50px;

  .id {
    width: 100px;
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  p {
    width: 210px;
    height: 20px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    align-items: center;
  }
`;
const Timg = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 95px;
    height: 76px;
    object-fit: contain;
  }
`;
const Tbody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  border-top: 3px solid #8c8484;
  .id {
    width: 100px;
    display: flex;
    justify-content: center;
  }
  div {
    width: 240px;
    display: flex;
    justify-content: center;
  }
`;
const ContainerCount = styled.div`
  display: flex;
  gap: 10px;
`;
const ButtonCount = styled.button`
  padding: 10px;
  background-color: #4a2f0a;
  cursor: pointer;
  color: #fff;
  border-radius: 4px;
`;
const ButtonRemove = styled.button`
  padding: 10px;
  background-color: #3f0a03;
  color: #fff;
  border-radius: 4px;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
`;
