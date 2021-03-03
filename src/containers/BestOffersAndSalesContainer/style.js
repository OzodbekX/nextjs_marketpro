import styled, { css } from "styled-components";

const dark = css`
  color: #005bff;

  &:hover {
    color: #00205c;
  }
`;

const light = css`
  &:hover {
    color: #005bff;
  }
`;

export const OfferLink = styled.a`
  font-weight: 700;
  transition: color 0.2s;
  padding-left: 15px;
  cursor: pointer;

  ${({ isDark }) => (isDark ? dark : light)}
`;
