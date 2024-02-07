type TileProps = {
  figure: string;
  onDragStart?: (event: React.DragEvent) => void;
  onDrop?: (event: React.DragEvent) => void;
};

const Tile: React.FC<TileProps> = ({ figure, onDragStart, onDrop }) => {
  return (
    <div
      className="tile"
      draggable={true} // Make sure the tile is draggable
      onDragStart={onDragStart} // Attach the onDragStart handler
      onDrop={onDrop} // Attach the onDrop handler (if you plan to allow dropping on tiles)
    >
      {figure}
    </div>
  );
};

export default Tile;
