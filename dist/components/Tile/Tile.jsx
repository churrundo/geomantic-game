const Tile = ({ figure, onDragStart, onDrop, onDragOver }) => {
    return (<div className="tile" draggable={true} onDragStart={onDragStart} onDrop={onDrop} onDragOver={onDragOver}>
      {figure}
    </div>);
};
export default Tile;
