import styled from 'styled-components/native';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { Colors } from '../../constants/colors';

const MODIFIERS = {
  center: () => `
    flex-direction: column;
    justify-content: center;
  `,
  around: () => `
  flex-direction: column;
  justify-content: space-evenly;
`,
};

export const Container = styled.SafeAreaView`
  background-color: ${Colors.Background};
  height: 100%;
  padding: 40px 20px;
  ${applyStyleModifiers(MODIFIERS)}
`;
