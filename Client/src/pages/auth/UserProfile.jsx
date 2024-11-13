import React, { useEffect, useState } from "react";
import {
  commonClassNameOfInput,
  PrimaryButton,
  Caption,
  Title,
} from "../../components/common/Design";
import { user2 } from "../../assets/data";
import { useRedirectLogoutUser } from "../../hooks/useRedirectLogoutUser";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, updateProfile } from "../../redux/features/authSlice";
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: "",
  email: "",
  role: "",
};

export const UserProfile = () => {
  useRedirectLogoutUser("/login");
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [userImage, setUserImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { user, isSuccess, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
      setImagePreview(user?.image?.filePath);
    }
  }, [dispatch, user]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserImage(file);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateUser = new FormData();
    updateUser.append("name", formData.name);

    if (userImage) {
      updateUser.append("image", userImage);
    }

    await dispatch(updateProfile(updateUser));
    if (isSuccess) {
      navigate('/profile');
    }
  };

  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="profile flex items-center gap-8">
          <img
            src={user?.image?.filePath ?? user2}
            alt=""
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <Title level={5} className="capitalize">
              {user?.name ?? "Example"}
            </Title>
            <Caption>{user?.email ?? "example@gmail.com"}</Caption>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 mt-10">
            <div className="w-1/2">
              <Caption className="mb-2">Full Name</Caption>
              <input
                value={formData?.name}
                name="name"
                onChange={handleInputChange}
                type="text"
                className={`capitalize ${commonClassNameOfInput}`}
              />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Email</Caption>
              <input
                value={formData?.email}
                type="text"
                className={commonClassNameOfInput}
                placeholder="example@gmail.com"
                disabled
              />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Role</Caption>
              <input
                value={formData?.role}
                type="text"
                className={commonClassNameOfInput}
                placeholder="admin | seller  | buyer"
                disabled
              />
            </div>
          </div>

          <div className="flex flex-row items-center gap-5 mt-5">
            <div className="w-1/2">
              <Caption className="mb-2">Profile Picture</Caption>
              <input
                type="file"
                className={commonClassNameOfInput}
                name="image"
                onChange={handleImageChange}
              />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="my-4">
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="w-1/3 h-auto"
                />
              </div>
            )}
          </div>

          <PrimaryButton type="submit" className="mt-5">
            {isLoading ? "Updating..":"Update Profile"}
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};
