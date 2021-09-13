import styled from "styled-components";
import { Menu } from "semantic-ui-react";

export const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em 5em 5em 5em;
`;

export const HeaderBar = styled(Menu)`
  background-color: black;
`;

export const HeaderItem = styled(Menu.Item)`
  height: 50px;
`;

export const LoginWrapper = styled.div`
  padding: 1em 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LoginFormWrapper = styled.div`
  background-color: white;
  border-radius: 16px;
  width: 50%;
  min-width: 200px;
  padding: 2em 2em;
`;
