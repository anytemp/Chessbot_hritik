import { ChessPieces } from "../ChessPieces";

interface ChessBoardProps {
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  highlightedSquares?: string[];
  lastMove?: { from: string; to: string };
  onSquareClick?: (square: string) => void;
  flipped?: boolean;
}

const initialPieces: Record<string, { piece: keyof typeof ChessPieces; color: "dark" | "light" }> = {
  "0-0": { piece: "Rook", color: "dark" }, "1-0": { piece: "Knight", color: "dark" }, "2-0": { piece: "Bishop", color: "dark" }, "3-0": { piece: "Queen", color: "dark" }, "4-0": { piece: "King", color: "dark" }, "5-0": { piece: "Bishop", color: "dark" }, "6-0": { piece: "Knight", color: "dark" }, "7-0": { piece: "Rook", color: "dark" },
  "0-1": { piece: "Pawn", color: "dark" }, "1-1": { piece: "Pawn", color: "dark" }, "2-1": { piece: "Pawn", color: "dark" }, "3-1": { piece: "Pawn", color: "dark" }, "4-1": { piece: "Pawn", color: "dark" }, "5-1": { piece: "Pawn", color: "dark" }, "6-1": { piece: "Pawn", color: "dark" }, "7-1": { piece: "Pawn", color: "dark" },
  "0-6": { piece: "Pawn", color: "light" }, "1-6": { piece: "Pawn", color: "light" }, "2-6": { piece: "Pawn", color: "light" }, "3-6": { piece: "Pawn", color: "light" }, "4-6": { piece: "Pawn", color: "light" }, "5-6": { piece: "Pawn", color: "light" }, "6-6": { piece: "Pawn", color: "light" }, "7-6": { piece: "Pawn", color: "light" },
  "0-7": { piece: "Rook", color: "light" }, "1-7": { piece: "Knight", color: "light" }, "2-7": { piece: "Bishop", color: "light" }, "3-7": { piece: "Queen", color: "light" }, "4-7": { piece: "King", color: "light" }, "5-7": { piece: "Bishop", color: "light" }, "6-7": { piece: "Knight", color: "light" }, "7-7": { piece: "Rook", color: "light" },
};

export default function ChessBoard({ size = "md", interactive = false, highlightedSquares = [], lastMove, onSquareClick, flipped = false }: ChessBoardProps) {
  const dim = size === "sm" ? "w-32 h-32" : size === "md" ? "w-64 h-64 sm:w-80 sm:h-80" : "w-full max-w-lg aspect-square";
  const pieceSize = size === "sm" ? 16 : size === "md" ? 24 : 36;

  const rows = flipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];
  const cols = flipped ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className={`${dim} grid grid-cols-8 rounded-2xl overflow-hidden shadow-lg`}>
      {rows.map((r) =>
        cols.map((c) => {
          const light = (r + c) % 2 === 0;
          const key = `${c}-${r}`;
          const p = initialPieces[key];
          const Piece = p ? ChessPieces[p.piece] : null;
          const isHighlighted = highlightedSquares.includes(key);
          const isLastMove = lastMove && (lastMove.from === key || lastMove.to === key);

          return (
            <div
              key={key}
              onClick={() => interactive && onSquareClick?.(key)}
              className={`aspect-square flex items-center justify-center relative transition-all ${
                light ? "bg-[#F0E0CC]" : "bg-[#C4956A]/40"
              } ${isHighlighted ? "ring-2 ring-inset ring-[#C4785C]" : ""} ${isLastMove ? "bg-[#FFE8D6]" : ""} ${interactive ? "cursor-pointer hover:brightness-110" : ""}`}
            >
              {Piece && <Piece color={p.color} size={pieceSize} />}
              {isLastMove && (
                <div className="absolute inset-0 bg-[#C4785C]/20 pointer-events-none" />
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
