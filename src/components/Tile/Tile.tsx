type TileProps = {
  figure: string;
  onDragStart?: (event: React.DragEvent) => void;
  onDrop?: (event: React.DragEvent) => void;
};

const Tile: React.FC<TileProps> = ({ figure, onDragStart, onDrop }) => {
  return (
    <div className="tile">
      {figure}
    </div>
  );
};

export default Tile;
