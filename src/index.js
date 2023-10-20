
document.addEventListener("DOMContentLoaded", () => {
  const beerDetails = (beerId) => {
    fetch(`http://localhost:3000/beers/${beerId}`)
      .then((response) => response.json())
      .then((beerData) => {
        const {
          name,
          description,
          image_url,
          reviews
        } = beerData;
          // updating Dom Elements.
        document.getElementById("beer-name").textContent = name;
        document.getElementById("beer-description").textContent = description;
        document.getElementById("beer-image").src = image_url;

        const reviewList = document.getElementById("review-list");
        reviewList.innerHTML = "";

        //adding reviews to li
        reviews.forEach((review) => {
          const li = document.createElement("li");
          li.textContent = review;
          reviewList.appendChild(li);
        });
      });
  };
     //fetching beer menu
  const beerMenu = () => {
    const beerList = document.getElementById("beer-list");

    fetch("http://localhost:3000/beers")
      .then((response) => response.json())
      .then((beers) => {
        beers.forEach((beer) => {
          const li = document.createElement("li");
          li.textContent = beer.name;

          li.addEventListener("click", () => {
            beerDetails(beer.id);
          });

          beerList.appendChild(li);
        });
      });
  };

  
  const reviewForm = document.getElementById("review-form");
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newReview = document.getElementById("review").value;

    if (newReview) {
      const reviewList = document.getElementById("review-list");
      const li = document.createElement("li");
      li.textContent = newReview;
      reviewList.appendChild(li);
      document.getElementById("review").value = "";
    }
  });

  
  beerMenu(); 
  beerDetails(1); 
});