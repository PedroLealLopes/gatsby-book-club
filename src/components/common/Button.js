import styled from "styled-components"

export const Button = styled.button`
  padding: 1rem 2rem;
  background: rebeccapurple;
  color: white;
  border-radius: 4px;
  box-shadow: none;
  cursor: pointer;
  white-space: nowrap;

  ${props => props.block ? 'display: block; width: 100%;' : ''}

  &:hover{
    background: indigo;
  }

`