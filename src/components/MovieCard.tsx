import React from "react";
import { FaImdb } from "react-icons/fa";

interface MovieCardProps {
  id: string;
  imageUrl: string;
  title: string;
  year?: number;
  rating?:string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, imageUrl, title, rating,year}) => {
  return (
    <div
      key={id}
      className="border-2 border-slate-600/30 shadow-md rounded-4xl overflow-hidden cursor-pointer"
    >
      <img
  src={imageUrl || 'https://images.pexels.com/photos/30617227/pexels-photo-30617227/free-photo-of-empty-theater-seats-with-dramatic-lighting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
  alt={title}
  onError={(e) => {
    e.currentTarget.src =
      'https://images.pexels.com/photos/30617227/pexels-photo-30617227/free-photo-of-empty-theater-seats-with-dramatic-lighting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  }}
  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
/>

      <div className="p-2">
        <h3 className="text-sm text-slate-500 font-semibold truncate">
          {title}
        </h3>
        
        {rating ?<div className="pb-2 flex items-center gap-2">
          <FaImdb/>
          <p className="text-slate-500">{rating}</p>
        </div>:<p className="text-xs pb-2 text-gray-500"><span className="font-bold">Release Year:</span>{year || "Unknown Year"}</p>}
      </div>
    </div>
  );
};

export default MovieCard;
