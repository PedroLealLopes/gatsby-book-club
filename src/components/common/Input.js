import styled from "styled-components"

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 14px;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: none;

  &::focus, &:active{
    border: 1px solid rebeccapurple;
  }
`