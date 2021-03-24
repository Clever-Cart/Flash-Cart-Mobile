import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { Colors } from '../../constants/colors';

const MODIFIERS = {
  danger: () => `
    border: 1px solid red;
  `,
};

const InputComp = styled.View`
  margin: 5px 0;
  height: 70px;
  background-color: ${Colors.SecondaryColor};
  border: solid ${Colors.MainColor};
  border-radius: 50px;
  padding: 10px 0;
  elevation: 5;

  ${applyStyleModifiers(MODIFIERS)}
`;

InputComp.InputText = styled.TextInput`
  font-size: 20px;
  color: ${Colors.Text};
  height: 30px;
  margin: 10px 20px;
`;

export default InputComp;
