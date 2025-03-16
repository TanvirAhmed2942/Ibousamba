import React, { useState, useEffect } from "react";
import { FiEdit, FiPlusCircle } from "react-icons/fi";
import AddBrandModal from "./AddBrandModal";
import { RiDeleteBin4Line } from "react-icons/ri";
import {
  useBrandQuery,
  useCreateBrandMutation,
} from "../../../redux/apiSlices/brandSlice";
import { imageUrl } from "../../../redux/api/baseApi";

function Brands() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredBrand, setHoveredBrand] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandList, setBrandList] = useState([]);

  // Fetch brand data from API
  const { data: brandData, isLoading, error } = useBrandQuery();

  // Only update brandList if brandData is available
  useEffect(() => {
    if (brandData) {
      setBrandList(brandData.data);
    }
  }, [brandData]);

  const [createBrand] = useCreateBrandMutation();

  const handleCreateBrand = async () => {
    try {
      const response = await createBrand({ name: "New Brand" });
      console.log("Create Brand Success:", response);
      setBrandList([...brandList, response.data]);
    } catch (error) {
      console.error("Create Brand Error:", error);
    }
  };

  // Open Modal for Adding
  const handleAddBrand = () => {
    setSelectedBrand(null);
    setIsModalOpen(true);
  };

  // Open Modal for Editing
  const handleEditBrand = (brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  // Delete Brand
  const handleDelete = (key) => {
    setBrandList(brandList.filter((brand) => brand.key !== key));
  };

  // Save Brand (Add or Edit)
  const handleSaveBrand = (brand) => {
    console.log("Brand data received from modal:", brand); // Log the brand data

    if (selectedBrand) {
      // Update existing brand
      setBrandList(
        brandList.map((b) =>
          b.key === selectedBrand.key ? { ...b, ...brand } : b
        )
      );
    } else {
      // Add new brand
      setBrandList([...brandList, { ...brand, key: brandList.length + 1 }]);
    }

    setIsModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading brands</div>;

  return (
    <div className="flex items-center justify-start gap-2 flex-wrap px-3 py-4">
      {/* Add New Brand Button */}
      <div
        onClick={handleAddBrand}
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
          onMouseEnter={() => setHoveredBrand(brand.key)} // Trigger hover effect only
          onMouseLeave={() => setHoveredBrand(null)}
        >
          <img
            src={`${imageUrl}${brand?.image}`}
            width={150}
            alt={brand.name}
          />
          {hoveredBrand === brand.key && (
            <div className="w-full h-full flex gap-2.5 items-center justify-center absolute top-0 left-0 rounded-lg backdrop-blur-sm bg-black bg-opacity-50">
              <FiEdit
                className="text-white cursor-pointer"
                onClick={() => handleEditBrand(brand)}
              />
              <RiDeleteBin4Line
                className="text-white cursor-pointer"
                onClick={() => handleDelete(brand.key)}
              />
            </div>
          )}
        </div>
      ))}

      {/* Add/Edit Brand Modal */}
      <AddBrandModal
        isModalOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleSave={handleSaveBrand}
        initialBrand={selectedBrand}
      />
    </div>
  );
}

export default Brands;
