import React, { useEffect, useState } from "react";
import ImageCard from "./components/ImageCards";
import ImageSearch from "./components/ImageSearch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OpenImage from "./components/OpenImage";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('arctic')
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch to populate the gallery
  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&per_page=100`)
      .then(response => response.json())
      .then((data) => {
        setImages(data.hits)
        setIsLoading(false);
      }).catch(err => {
        console.log('Error', err)
      })
  }, [term])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="container mx-auto">
            <ImageSearch searchText={(text) => setTerm(text)} />

            {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found...</h1>}

            {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
              {
                images.map(image => {
                  return <ImageCard key={image.id} image={image} setSelectedImage={setSelectedImage} />
                })
              }
            </div>}
          </div >
        </Route>
        <Route exact strict path={"/image/:imgId"}>
          <OpenImage selectedImage={selectedImage} />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
