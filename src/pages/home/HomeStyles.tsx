import styled from "styled-components";

export const HomeContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap");
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100vw;

  h3 {
    font-family: "Fredericka the Great", cursive;
    margin-top: 6rem;
    cursor: default;

    @media screen and (max-width: 998px) {
      margin-top: 7rem;
    }

    @media screen and (max-width: 768px) {
      margin-top: 10rem;
    }
  }
`;
