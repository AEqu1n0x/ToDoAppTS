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

export const Text = styled.div`
  max-width: 85%;
  cursor: pointer;
  display: flex;
  align-items: center;
  word-break: break-word;

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

export const IconWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;

  .tooltip-icon {
    cursor: pointer;
  }

  .tooltip-text {
    visibility: hidden;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.75);
    color: white;
    text-align: center;
    border-radius: 4px;
    padding: 5px;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.2s;
    white-space: nowrap;
    font-size: 12px;
  }

  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
`;
