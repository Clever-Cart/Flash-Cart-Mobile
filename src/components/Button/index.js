import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { Colors } from '../../constants/colors';

const MODIFIERS = {
  login: () => `
    background-color: ${Colors.Text};
    width: 92px;
    height: 64px;
    border-radius: 24px;
    box-shadow: 10px;
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

export const Button = styled.TouchableOpacity`
  height: 60px;
  background-color: ${Colors.MainColor};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  elevation: 10;

  ${applyStyleModifiers(MODIFIERS)}
`;

export const SecondaryButton = styled.TouchableOpacity`
  height: 70px;
  background-color: ${Colors.SecondaryColor};
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  elevation: 10;

  ${applyStyleModifiers(MODIFIERS)}
`;

export const SmallWhiteButton = styled.TouchableOpacity`
  height: 30px;
  background-color: ${Colors.SecondaryColor};
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  elevation: 10;

  ${applyStyleModifiers(MODIFIERS)}
`;

export const ClearButton = styled.TouchableOpacity`
  height: 60px;
  background-color: ${Colors.MainColor};
  border-radius: 50px;
  justify-content: center;
  align-items: center;

  ${applyStyleModifiers(MODIFIERS)}
`;


Button.Image = styled.Image`
  width: 24px;
`;

