import styled from "styled-components";

export const FriendsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 73.5px;

  @media screen and (max-width: 992px) {
    margin-top: 80px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 125px;
  }
`;

export const FriendsMessage = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&display=swap");
  margin: 2rem 0;
  cursor: default;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h2 {
    text-align: center;
  }

  p {
    font-family: "Cabin Sketch", cursive;
    color: #2c2c2c;
    font-size: 18px;
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
  }
`;
