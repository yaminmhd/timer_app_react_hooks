import {
  flexbox,
  display,
  maxWidth,
  minWidth,
  width,
  height,
  maxHeight,
  minHeight,
  position,
  size,
  space,
  backgroundColor,
  padding,
  borders,
  boxShadow,
  borderRadius,
  overflow
} from "styled-system";

import styled from "styled-components/native";

const Box = styled.View`
    ${space}
    ${flexbox}
    ${display}
    ${maxWidth}
    ${minWidth}
    ${position}
    ${width}
    ${height}
    ${maxHeight}
    ${minHeight}
    ${size}
    ${backgroundColor}
    ${padding}
    ${borders}
    ${boxShadow}
    ${borderRadius}
    ${overflow}
`;

export default Box;
