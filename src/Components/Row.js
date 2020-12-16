import "../Styles/Row.css";
import fetch from "node-fetch";
import React, { useState, useEffect } from "react";

function Row() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const _num = Math.round(Math.random() * Math.random() * 10 + 10);
      const request = await fetch(
        `https://api.unsplash.com/photos?page=${_num}&client_id=DzGSKF6abxR5CZ59pKA5Hcz7ssuA_SwRZXDk7VsD6hI&per_page=30`
      );
      const response = await request.json();
      console.log(response);
      setImages(response);
      return response;
    };

    const button = document.querySelector(".photos__loadMore");
    button.addEventListener("click", () => {
      fetchImages();
      button.disabled = true;
      setTimeout(() => (button.disabled = false), 5000);
    });

    fetchImages();
  }, []);

  return (
    <div className="photos">
      <h1>Random Images</h1>
      <div className="photo__container">
        {images.map((i) => {
          return (
            <img
              key={i?.id}
              className="photo"
              loading="eager"
              src={i?.urls.small}
              alt={i.alt_description}
            />
          );
        })}
      </div>
      <button className="photos__loadMore">Load Other Photos</button>
    </div>
  );
}

export default Row;
