import styled from "styled-components";

export const Todo = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #8758ff;
  color: #fff;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  transition: 0.4s;
  word-break: break-word;

  &:hover {
    background: #fff;
    color: #8758ff;
    transition: 0.4s;
  }
`;

export const Text = styled.p`
  max-width: 85%;
  cursor: pointer;

  &.completed {
    color: #c5aeff;
    text-decoration: line-through;
  }
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .fa-trash,
  .fa-star,
  .fa-star-regular,
  .fa-pen-to-square {
    cursor: pointer;
  }
`;