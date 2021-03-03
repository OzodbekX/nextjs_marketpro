import styled from "styled-components";

export const CouponCard = styled.main.attrs({
  className: "rounded-md",
})`
  max-width: 250px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);

  &:hover {
    box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
      0 15px 40px rgba(52, 86, 221, 0.24);
  }
`;

export const CouponTitle = styled.div`
  background-size: cover;
  background-image: ${({ url }) => (url ? `url(${url})` : "none")};

  h1,
  p {
    text-align: center;
  }
`;

export const CouponImage = styled.main.attrs({
  className: "pt-2",
})`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const CouponInfo = styled.main.attrs({
  className: "pt-2 pb-10",
})`
  h1,
  p {
    text-align: center;
  }
`;

export const CouponApply = styled.main.attrs({
  className: "mb-2",
})`
  justify-content: center;
  display: flex;
  align-items: center;
`;

export const CouponDivider = styled.div`
  width: 100%;
  height: 0;
  border-top: 8px dotted #f0f1f3;
`;
