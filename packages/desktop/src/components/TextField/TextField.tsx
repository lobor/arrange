import * as React from 'react';
import TextFieldMUI, { TextFieldProps } from '@material-ui/core/TextField';
import styled from 'styled-components';

const TextFieldMUIStyled = styled(TextFieldMUI)`
  .MuiInputBase-root {
    background-color: white;
  }
`;
const TextField: React.FC<TextFieldProps> = props => {
  return <TextFieldMUIStyled {...props} size="small" variant="outlined" />;
};

export { TextField };
