import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  overflow: auto;
`;

const GridContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  & > * {
    flex: 0 0 auto;
  }
`;

const CellStyled = styled.div`
  width: 10%;
  height: 40px;
  background: url(/cell.jpg) top left, url(/cell.jpg) bottom left, url(/cell.jpg) top right, url(/cell.jpg) bottom right;
  background-repeat: no-repeat;
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
