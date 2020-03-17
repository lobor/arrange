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

const Container = styled.div`
  bottom: 0;
  display: flex;
  flex-direction: row;
  left: 0;
  position: absolute;
  right: 0;
  top: 64px;
  .content-edit {
    background-color: #f4f4f4;
  }
`;

export { Card, Container };
