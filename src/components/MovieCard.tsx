import React from "react";
import { FaImdb } from "react-icons/fa";
import DefaultImage from '../assets/defaultimage.webp'

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
  src={imageUrl || DefaultImage}
  alt={title}
  onError={(e) => {
    e.currentTarget.src =
      DefaultImage;
  }}
  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
/>

      <div className="p-2">
        <h3 className="text-sm text-slate-500 font-semibold truncate">
          {title}
        </h3>
        
       <div className="pb-2 flex items-center gap-2">
          <FaImdb/>
          <p className="text-slate-500">{rating}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
