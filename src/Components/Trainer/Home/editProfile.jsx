import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import userAxios from '../../../Axios/userAxios';
import ProfileUpdateSuccessModal from './updateSuccess';

export default function EditTrainerProfile({ trainerData }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(trainerData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = async (event, imageType) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const base64 = await convertBase64(file);
      const response = await userAxios.post('uploadImage', { image: base64 });

      if (imageType === 'profilePhoto') {
        setFormData({ ...formData, profilePhoto: response.data });
      } else if (imageType === 'coverPhoto') {
        setFormData({ ...formData, coverPhoto: response.data });
      } else if (imageType === 'certification') {
        const certifications = [...formData.certifications, response.data];
        setFormData({ ...formData, certifications });
      }

      toast.success(`Image uploaded successfully`);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send an API request to update the trainer profile with formData
      const response = await userAxios.put('/updateTrainerProfile', formData);

      if (response.status === 200) {
        setShowModal(true);
      } else {
        console.error('Failed to update trainer profile:', response.data);
      }
    } catch (error) {
      console.error('Error updating trainer profile:', error);
    }
  };

  return (
    <>
      <div className="pt-20 px-14 bg-gray-900 text-white">
        <form onSubmit={handleSubmit}>
          {/* Cover Photo */}
          <div>
            <label htmlFor="coverPhoto">Cover Photo</label>
            <div>
              <input
                type="file"
                name="coverPhoto"
                id="coverPhoto"
                onChange={(e) => handleImageUpload(e, 'coverPhoto')}
              />
            </div>
            {formData.coverPhoto && (
              <img src={formData.coverPhoto} alt="Cover" />
            )}
          </div>

          {/* Profile Photo */}
          <div>
            <label htmlFor="profilePhoto">Profile Photo</label>
            <div>
              <input
                type="file"
                name="profilePhoto"
                id="profilePhoto"
                onChange={(e) => handleImageUpload(e, 'profilePhoto')}
              />
            </div>
            {formData.profilePhoto && (
              <img src={formData.profilePhoto} alt="Profile" />
            )}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender">Gender</label>
            <div>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
              />
              <span>Male</span>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
              />
              <span>Female</span>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'other'}
                onChange={handleInputChange}
              />
              <span>Other</span>
            </div>
          </div>

          {/* About Me */}
          <div>
            <label htmlFor="about">About Me</label>
            <div>
              <textarea
                name="about"
                id="about"
                rows="4"
                value={formData.about}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience-years">Years</label>
            <input
              type="number"
              name="experience.years"
              id="experience-years"
              value={formData.experience.years}
              onChange={handleInputChange}
            />
            <label htmlFor="experience-months">Months</label>
            <input
              type="number"
              name="experience.months"
              id="experience-months"
              value={formData.experience.months}
              onChange={handleInputChange}
            />
            <label htmlFor="experience-days">Days</label>
            <input
              type="number"
              name="experience.days"
              id="experience-days"
              value={formData.experience.days}
              onChange={handleInputChange}
            />
          </div>

          {/* Certifications */}
          <div>
            <label htmlFor="certification">Certifications</label>
            <div>
              <input
                type="file"
                name="certification"
                id="certification"
                multiple
                onChange={(e) => handleImageUpload(e, 'certification')}
              />
            </div>
            {formData.certifications.length > 0 && (
              <div>
                <h3>Certifications: {formData.certifications.length}</h3>
              </div>
            )}
          </div>

          {/* Payment Duration */}
          <div>
            <label htmlFor="payment-duration">Payment Duration</label>
            <div>
              <input
                type="number"
                placeholder="One Month"
                name="paymentAmount.oneMonth"
                value={formData.paymentAmount.oneMonth}
                onChange={handleInputChange}
              />
              <input
                type="number"
                placeholder="Six Months"
                name="paymentAmount.sixMonths"
                value={formData.paymentAmount.sixMonths}
                onChange={handleInputChange}
              />
              <input
                type="number"
                placeholder="One Year"
                name="paymentAmount.oneYear"
                value={formData.paymentAmount.oneYear}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Experience Details */}
          <div>
            <label htmlFor="experienceDetails">Experience Details</label>
            <div>
              <textarea
                name="experienceDetails"
                id="experienceDetails"
                rows="4"
                value={formData.experienceDetails}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
      <ProfileUpdateSuccessModal
        showModal={showModal}
        setShowModal={setShowModal}
        successMessage="Your trainer profile has been successfully updated."
        content="The updates of your profile will be sent to your email"
      />
    </>
  );
}
