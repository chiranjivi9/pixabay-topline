import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom'

const OpenImage = () => {
    const [image, setImage] = useState([]);
    let history = useHistory();
    const params = useParams();
    let docID = params.imgId;
    console.log('PRINTING PARAMS', docID)

    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&id=${docID}`)
            .then(response => response.json())
            .then((data) => {
                setImage(data.hits[0])
            }).catch(err => {
                console.log('Error', err)
                history.push('/')
                setImage(null)
            })
    }, [])


    return (
        <div className="container mx-auto" style={{ padding: "60px 0px 0px 430px" }}>
            {image &&
                <div>
                    <div class="max-w-sm rounded overflow-hidden shadow-lg">
                        <img src={image.webformatURL} alt="single" className="w-full" />
                    </div>
                    <div class="flex items-center" style={{ padding: "10px 0px 0px 0px" }}>
                        {image.userImageURL ? <img class="w-10 h-10 rounded-full" src={image.userImageURL} alt="avatar" /> : "👤"}
                        <div class="text-sm">
                            <p class="text-gray-900 leading-none" style={{ padding: "0px 0px 0px 10px" }}>{image.user}</p>
                        </div>
                    </div>
                    <div className="pt-4 pb-2">
                        {
                            image.tags && image.tags.split(',').map((tag, index) => {
                                return <span key={index} className="center inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    #{tag}
                                </span>
                            })
                        }
                    </div>
                </div>
            }

        </div>
    )
}


export default OpenImage;