import styled from "styled-components";

export const Product = styled.div`
  height: 125px;
  padding: 16px;
`;

export const ProductCon = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
`;

export const ProductContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  button {
    outline: none;
    border: none;
  }
`;

export const ProductPrices = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 20%;
`;

export const ProductComponent = styled.div`
  width: 100%;
  display: flex;
  margin-left: 1rem;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  div {
    margin-left: 16px;
  }
`;
