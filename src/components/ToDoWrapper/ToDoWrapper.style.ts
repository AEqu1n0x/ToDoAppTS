import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Container = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 495px;
  @media (max-width: 600px) {
    margin-top: 2rem;
  }
`;

export const SortContainer = styled.div`
  margin-bottom: 1rem;
  text-align: center;
`;

export const SortTitle = styled.h3`
  color: #fff;
  margin-bottom: 0.5rem;
`;

export const SortButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  padding-bottom: 10px;

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const SortButton = styled.button`
  background: #8758ff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: 0.4s;
  border-radius: 5px;

  &:hover {
    background: #fff;
    color: #8758ff;
  }
`;
export const Wrapper = styled.div`
  background: #1a1a40;
  padding: 2rem;
  border-radius: 5px;
  max-width: 495px;
`;

export const Title = styled.h1`
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1.75rem;
`;

export const EmptyListMessage = styled.h3`
  color: #fff;
`;

export const DownloadButton = styled.button`
  background: #8758ff;
  color: #fff;
  border: none;
  padding: 0.55rem;
  cursor: pointer;
  transition: 0.4s;
  border-radius: 5px;

  &:hover {
    background: #fff;
    color: #8758ff;
    transition: 0.4s;
  }

  &:disabled {
    background: #fff;
    color: #8758ff;
    cursor: default;
  }
`;

export const ModalContent = styled.div`
  color: #fff;
  padding: 2rem;
  text-align: center;
  font-size: 1.2rem;
  position: fixed;
  width: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #333;
  border-radius: 10px;
  z-index: 1000;
  @media (max-width: 650px) {
    width: 90%;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #8758ff;
`;

export const ModalText = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #8758ff;
`;

export const CloseButton = styled.button`
  background: #8758ff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;

  &:hover {
    background: #fff;
    color: #8758ff;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  width: 100%;
`;

export const Icon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
