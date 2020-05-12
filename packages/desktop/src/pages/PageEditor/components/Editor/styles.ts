import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  // display: flex;
  flex: 1;
  // overflow: auto;
  .content-edit {
    background-color: transparent;
  }
  justify-content: center;
  .layout {
    //   position: fixed;
    overflow: auto;
    height: 100%;
    // width: 1200px;
    box-shadow: 0px 0px 10px #b1b1b1;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }

  .react-grid-layout {
    position: relative;
    margin: auto;
    width: 1200px;
    min-height: 100%;
    background-color: white;
  }

  .react-draggable-dragging,
  .resizing {
    opacity: 0.5;
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

const OverlayComponent = styled.div``;

export { Container, GridContainer, CellStyled, OverlayComponent };
