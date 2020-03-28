import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  overflow: auto;
  .content-edit {
    background-color: transparent;
  }
  justify-content: center;
  .layout {
    background-color: white;
    width: 1200px;
    box-shadow: 0px 0px 10px #b1b1b1;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }

  .react-grid-layout {
    min-height: 100%;
  }

  .react-draggable-dragging,
  .resizing {
    opacity: 0.5;
  }
  .react-grid-item:not(.react-grid-placeholder) {
    &:hover {
      background-color: grey;
      .react-resizable-handle {
        width: 10px;
        height: 10px;
        background: black;
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
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
