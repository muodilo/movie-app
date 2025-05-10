import React from "react";

interface MovieCardProps {
  id: string;
  imageUrl: string;
  title: string;
  year?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, imageUrl, title, year }) => {
  return (
    <div
      key={id}
      className="border-2 border-slate-600/30 shadow-md rounded-lg overflow-hidden cursor-pointer"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
      />
      <div className="p-2">
        <h3 className="text-sm text-slate-500 font-semibold truncate">
          {title}
        </h3>
        <p className="text-xs text-gray-500">{year || "Unknown Year"}</p>
      </div>
    </div>
  );
};

export default MovieCard;
