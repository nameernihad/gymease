import React, { useState } from 'react';
import userAxios from "../../Axios/userAxios";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function RatingModal({onClose ,onLeave}) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        const requestData = {
            rating: rating,
            comment: comment,
        };

        userAxios.patch(`/addRating/65030809f3310a179c1ca6a2`, requestData).then((res) => {
            console.log(res.data);
        }).catch((err)=>{
            
        })
        onLeave()
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="modal bg-white rounded-lg shadow-lg p-4 mx-auto w-2/3">
          <span className="close text-gray-600 text-2xl cursor-pointer" onClick={()=>{onClose()
            onLeave()}}>&times;</span>
          <h2 className="text-2xl font-semibold mb-4">Rate and Add a Comment</h2>
          <div className="rating">
            <label htmlFor="rating" className="text-gray-700">Rating:</label>
            <Stack spacing={1}>
              <Rating
                name="size-large"
                value={rating}
                size="large"
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Stack>
          </div>
          <div className="comment mt-4">
            <label htmlFor="comment" className="text-gray-700">Comment:</label>
            <textarea id="comment" rows="4" cols="50" value={comment} onChange={handleCommentChange} className="w-full border rounded-lg p-2"></textarea>
          </div>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700">Submit</button>
        </div>
      </div>
    );
}

export default RatingModal;
