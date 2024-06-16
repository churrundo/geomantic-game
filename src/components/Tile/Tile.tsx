type TileProps = {
  figure: string;
  onDragStart?: (event: React.DragEvent) => void;
  onDragOver?: (event: React.DragEvent) => void;
  onDrop?: (event: React.DragEvent) => void;
};

const Tile: React.FC<TileProps> = ({ figure, onDragStart, onDrop, onDragOver }) => {
  return (
    <div
      className="tile"
      draggable={true}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {figure}
    </div>
  );
};

export default Tile;
