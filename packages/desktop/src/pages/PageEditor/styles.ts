import CardMui from '@material-ui/core/Card';
import styled from 'styled-components';

const Card = styled(CardMui)`
  border-left: 1px solid #dedede;
  border-top: 1px solid #dedede;
  border-radius: 0;
  box-shadow: none;
  &:first-child {
    border-left: 0;
    border-top: 0;
  }
`;

export { Card };
