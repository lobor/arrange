import * as React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';

import { Component } from '../../interfaces/Components';

export interface TextProps extends TypographyProps {
  value?: string | number;
}

const Text: React.FC<TextProps> = ({ value, ...props }) => {
  return (
    <Typography variant="body1" {...props}>
      {value}
    </Typography>
  );
};
export { Text };
