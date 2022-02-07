import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, BackPage } from "./styles";

import AOS from "aos";
import "aos/dist/aos.css";

import Loader from "../../components/Loader";
import api from "../../services/api";

export default function ViewGame() {

    const { id }  = useParams();

    const [game, setGame] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        handleDataGame();
    }, [])

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, [])

    async function handleDataGame() {
        const response = await api.get(`games/${id}${process.env.REACT_APP_API_KEY}`);
        setIsLoading(false);

        setGame(response.data);
    }

 
    return(
        <Container>
            <Loader isLoading={isLoading} />
                
            <Link to={`/`}><BackPage /></Link>

            <div className="content-left" data-aos="fade-up-right">
                <h1>{game.name}</h1>
                
                <h2>About</h2>
                {game.description_raw}
             
                <div className="content-details">
                    <div className="data-left-details">
                        <h5>Platforms</h5>
                        <div className="paragraph-detail-align">
                            {game.parent_platforms?.map((platform, index) => (
                                <p key={platform.id}>{platform.platform.name}{index < game.parent_platforms.length - 1 ? ", " : " "}</p>
                            ))}
                        </div>

                        <h5>Genre</h5>
                        <div className="paragraph-detail-align">
                            {game.genres?.map((genre, index) => (
                                <p key={genre.id}>{genre.name}{index < game.genres.length - 1 ? ", " : " "}</p>
                            ))}
                        </div>

                        <h5>Developer</h5>
                        <div className="paragraph-detail-align">
                            {game.developers?.map((develop, index) => (
                                <p key={develop.id}>{develop.name}{index < game.developers.length - 1 ? ", " : " "}</p>
                            ))}
                        </div>

                        <h5>Age Rating</h5>
                        <p>{game.esrb_rating?.name}</p>
                    </div>
                    <div className="data-right-details">
                        <h5>Metascore</h5>
                        <div className="paragraph-detail-align">
                            <p>{game.metacritic}</p>
                        </div>

                        <h5>Publisher</h5>
                        <div className="paragraph-detail-align">
                            {game.publishers?.map((publisher, index) => (
                                <p key={publisher.id}>{publisher.name}{index < game.publishers.length - 1 ? ", " : " "}</p>
                            ))}
                        </div>

                        <h5>Tags</h5>
                        <div className="paragraph-detail-align">
                            {game.tags?.map((tag, index) => (
                                <p key={tag.id} style={{textDecoration: "underline"}}>{tag.name}{index < game.tags.length - 1 ? ", " : " "}</p>
                            ))}
                        </div>
                    </div>
                </div>
                
            </div>

            <div className="content-right" data-aos="fade-up-left">
                <div className="main-img">
                    <img className="game-img" src={`${game.background_image}`} alt="back" />
                </div>

                <div className="content-rating">
                    {game.ratings?.map((rating, index) => {
                         switch (rating.title) {
                            case "recommended": return(
                                <div className="rating">
                                    <p> {rating.title} 👍 {rating.count}</p>
                                </div>
                            )
                        
                            case "exceptional": return(
                                <div className="rating">
                                    <p> {rating.title} 🎯 {rating.count}</p>
                                </div>
                            )

                            case "meh": return(
                                <div className="rating">
                                    <p> {rating.title} 😐 {rating.count}</p>
                                </div>
                            )

                            case "skip": return(
                                <div className="rating">
                                    <p> {rating.title} ⛔ {rating.count}</p>
                                </div>
                            )
                                
                            default:
                                break;
                        }
                    })} 
                </div>
                
            </div>
            
        </Container>
    )
}