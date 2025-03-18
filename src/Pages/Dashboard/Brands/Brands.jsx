import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";
import AddBrandModal from "./AddBrandModal";
import {
  useBrandQuery,
  useCreateBrandMutation,
  useDeleteBrandMutation,
} from "../../../redux/apiSlices/brandSlice";
import { imageUrl } from "../../../redux/api/baseApi";
import { message } from "antd";

function Brands() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // API hooks
  const [createBrand] = useCreateBrandMutation();
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

  // Open modal to add brand
  const handleAddBrand = () => {
    setIsModalOpen(true);
  };

  // Delete a brand
  const handleDelete = async (id) => {
    try {
      const response = await deleteBrand(id).unwrap();
      if (response.success) {
        message.success("Brand deleted successfully!");
        setBrandList(brandList.filter((brand) => brand._id !== id));
        refetch();
      }
    } catch (error) {
      console.error("❌ Delete Brand Error:", error);
      message.error("Failed to delete brand");
    }
  };

  // Save brand (add)
  const handleSaveBrand = async (brandData) => {
    setIsProcessing(true);

    try {
      const formdata = new FormData();

      // Prepare the data for API call
      const dataToSend = {
        brandUrl: brandData.brandUrl,
        image: brandData.imageFile.name, // Send the image file name instead of the whole file object (optional)
      };

      formdata.append("brandUrl", dataToSend.brandUrl);
      formdata.append("image", brandData.imageFile); // Add the image file itself

      // Log FormData content
      formdata.forEach((value, key) => {
        console.log(key, value); // Log each key-value pair in FormData
      });

      // Create a new brand
      const response = await createBrand(formdata).unwrap();

      if (response.success) {
        message.success("Brand added successfully!");
        // Add the new brand to the local state
        setBrandList([...brandList, response.data]);
      }

      setIsModalOpen(false); // Close the modal after successful save
      refetch(); // Refetch to get updated data from the API
    } catch (error) {
      console.error("❌ Save Brand Error:", error);
      message.error("Failed to save brand!");
    } finally {
      setIsProcessing(false);
    }
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
        <BrandItem key={brand._id} brand={brand} onDelete={handleDelete} />
      ))}

      {/* Add Brand Modal */}
      <AddBrandModal
        isModalOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleSave={handleSaveBrand}
        isLoading={isProcessing}
      />
    </div>
  );
}

function BrandItem({ brand, onDelete }) {
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
        height={120}
        alt={brand.brandUrl || "Brand"}
        style={{ objectFit: "contain" }}
      />
      {isHovered && (
        <div className="w-full h-full flex gap-2.5 items-center justify-center absolute top-0 left-0 rounded-lg backdrop-blur-sm bg-black bg-opacity-50">
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
