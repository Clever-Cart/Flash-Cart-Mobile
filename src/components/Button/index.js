import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { Colors } from '../../constants/colors';

const MODIFIERS = {
  login: () => `
    background-color: ${Colors.Text};
    width: 92px;
    height: 64px;
    border-radius: 24px;
  `,
  commonButton: () => `
    margin-top:25px;
  `,
  noBorderButton: () => `
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 15px;
    background-color: ${Colors.Background};
  `,
};

const Button = styled.TouchableOpacity`
  height: 48px;
  background-color: ${Colors.MainColor};
  border-radius: 25px;
  justify-content: center;
  align-items: center;

  ${applyStyleModifiers(MODIFIERS)}
`;

Button.Image = styled.Image`
  width: 24px;
`;

export { Button };
