/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import {applyStyleModifiers} from 'styled-components-modifiers';
import {Colors} from '../../constants/colors';

const MODIFIERS = {
  bold: () => `
    font-weight: bold;
    font-size: 18px;
  `,
  danger: () => `
    color: ${Colors.Error};
  `,
  underline: () => `
    font-weight: bold;
    text-decoration-color : ${Colors.Text}
  `,
  buttonText: () => `
    font-size:18px;
  `,
  title: () => `
    font-size:30px;
    align-self:center;
    padding: 10px;
    `,
  subTitle: () => `
    font-size: 14px;
    align-self: center;
  `
};

export const Text = styled.Text`
  font-size: 12px;
  color: ${Colors.Text};

  ${applyStyleModifiers(MODIFIERS)}
`;

export const LinkText = styled.Text`
  font-size: 12px;
  color: blue;
  font-weight: bold;

  ${applyStyleModifiers(MODIFIERS)}
`;

export const MainText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.MainButtonText};

  ${applyStyleModifiers(MODIFIERS)}
`;

export const SecondaryText = styled.Text`
font-size: 14px;
font-weight: bold;
color: ${Colors.MainColor};

${applyStyleModifiers(MODIFIERS)}
`;