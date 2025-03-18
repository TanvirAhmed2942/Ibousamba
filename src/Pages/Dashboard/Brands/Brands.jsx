import React, { useState, useEffect } from "react";
import { FiEdit, FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import AddBrandModal from "./AddBrandModal";
import {
  useBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} from "../../../redux/apiSlices/brandSlice";
import { imageUrl } from "../../../redux/api/baseApi";
import { message } from "antd";

function Brands() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // API hooks
  const [createBrand] = useCreateBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();

  // Fetch brands
  const { data: brandData, isLoading, error, refetch } = useBrandQuery();

  // Store brands in state
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    if (brandData?.data) {
      setBrandList(brandData.data);
    }
  }, [brandData]);

  const handleCreateBrand = async () => {
    try {
      const response = await createBrand({ name: "New Brand" }).unwrap();
      if (response?.data) {
        setBrandList((prevList) => [...prevList, response.data]);
      }
      refetch();
    } catch (error) {
      console.error("❌ Create Brand Error:", error);
    }
  };

  // Open modal to add brand
  const handleAddBrand = () => {
    setSelectedBrand(null);
    setIsModalOpen(true);
  };

  // Open modal to edit brand
  const handleEditBrand = (brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  // Delete a brand
  const handleDelete = async (id) => {
    try {
      const response = await deleteBrand(id).unwrap();
      if (response.success) {
        message.success("Brand deleted successfully!");
        refetch();
      }
      setBrandList(brandList.filter((brand) => brand.id !== id));
    } catch (error) {
      console.error("❌ Delete Brand Error:", error);
    }
  };

  // Save brand (add/edit)
  const handleSaveBrand = async (brand) => {
    if (selectedBrand) {
      try {
        const updatedBrand = await updateBrand({
          id: selectedBrand.id,
          data: brand,
        }).unwrap();
        setBrandList(
          brandList.map((b) =>
            b.id === selectedBrand.id ? { ...b, ...updatedBrand.data } : b
          )
        );
      } catch (error) {
        console.error("❌ Update Brand Error:", error);
      }
    } else {
      setBrandList([...brandList, { ...brand, id: brandList.length + 1 }]);
    }

    setIsModalOpen(false);
    refetch();
  };

  if (isLoading) return <div>Loading brands...</div>;
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
        <BrandItem
          key={brand._id}
          brand={brand}
          onEdit={handleEditBrand}
          onDelete={handleDelete}
        />
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

function BrandItem({ brand, onEdit, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center justify-center gap-4 w-44 h-40 border rounded-lg relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`${imageUrl}${brand?.image || ""}`}
        width={150}
        alt={brand.name}
      />
      {isHovered && (
        <div className="w-full h-full flex gap-2.5 items-center justify-center absolute top-0 left-0 rounded-lg backdrop-blur-sm bg-black bg-opacity-50">
          <FiEdit
            className="text-white cursor-pointer"
            onClick={() => onEdit(brand._id)}
          />
          <RiDeleteBin4Line
            className="text-white cursor-pointer"
            onClick={() => onDelete(brand._id)}
          />
        </div>
      )}
    </div>
  );
}

export default Brands;
