import React, { useState } from "react";
import MAN from "../../../assets/samba/brands/MAN.jpg";
import iveco from "../../../assets/samba/brands/iveco.png";
import CAT from "../../../assets/samba/brands/CAT.png";
import marcedes from "../../../assets/samba/brands/marcedes.jpg";
import mazda from "../../../assets/samba/brands/mazda.png";
import { FiEdit, FiPlusCircle } from "react-icons/fi";
import AddBrandModal from "./AddBrandModal"; // Import the modal
import { RiDeleteBin4Line } from "react-icons/ri";

function Brands() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredBrand, setHoveredBrand] = useState(null);
  const [brandList, setBrandList] = useState([
    { key: 1, name: "MAN", Img: MAN },
    { key: 2, name: "Iveco", Img: iveco },
    { key: 3, name: "CAT", Img: CAT },
    { key: 4, name: "Marcedes", Img: marcedes },
    { key: 5, name: "Mazda", Img: mazda },
    { key: 6, name: "Mazda", Img: mazda },
  ]);

  // Delete brand function
  const handleDelete = (key) => {
    setBrandList(brandList.filter((brand) => brand.key !== key));
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Add New Brand Button */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex flex-col items-center justify-center gap-1 w-44 h-40 border-2 rounded-lg border-dashed cursor-pointer"
      >
        <FiPlusCircle size={40} className="text-white" />
        <p>Add New</p>
      </div>

      {/* Brand List */}
      {brandList.map((brand) => (
        <div
          key={brand.key}
          className="flex items-center justify-center gap-4 w-44 h-40 border rounded-lg relative"
          onMouseEnter={() => setHoveredBrand(brand.key)}
          onMouseLeave={() => setHoveredBrand(null)}
        >
          <img src={brand.Img} width={150} alt={brand.name} />
          {hoveredBrand === brand.key && (
            <div className="w-full h-full flex gap-2.5 items-center justify-center absolute top-0 left-0 rounded-lg backdrop-blur-sm bg-black bg-opacity-50">
              <FiEdit className="text-white cursor-pointer" />
              <RiDeleteBin4Line
                className="text-white cursor-pointer"
                onClick={() => handleDelete(brand.key)}
              />
            </div>
          )}
        </div>
      ))}

      {/* Add Brand Modal */}
      <AddBrandModal
        isModalOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Brands;
