import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  overflow: auto;
  .content-edit {
    background-color: transparent;
  }
`;

const GridContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CellStyled = styled.div`
  &.isOver {
    background-color: red;
  }
`;

const OverlayComponent = styled.div`
  padding: 5px;
  position: absolute;
  &:hover {
    background-color: grey;
  }
`;

export { Container, GridContainer, CellStyled, OverlayComponent };
