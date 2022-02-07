import { useEffect, useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import { Container, Content, PlaystationIcon, XboxIcon, WinIcon } from "./styles";

import AOS from "aos";
import "aos/dist/aos.css";

import Input from "../../components/Input";
import Loader from "../../components/Loader";

import api from "../../services/api";

export default function Home() {

    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        handleListGames();
    }, [currentPage]);

    useEffect(() => {
        const observable = new IntersectionObserver((entries) => {
            if(entries.some((entry) => entry.isIntersecting )){
                setCurrentPage((currentPageInsideState) => currentPageInsideState + 1)
            }
        });

        observable.observe(document.querySelector('#fetch'));

        return () => observable.disconnect();
    }, [])

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, [])

    async function handleListGames() {
        const response = await api.get(`games${process.env.REACT_APP_API_KEY}&page=${currentPage}&page_size=10`);
        const newGames = [... games];

        newGames.push(...response.data.results)
        setIsLoading(false);
        setGames(newGames);
    }
    
    function handleChangeSearchTerm(event) {
        setSearchTerm(event.target.value);
    }

    async function handleSearch() {
        const response = await api.get(`games${process.env.REACT_APP_API_KEY}&search=${searchTerm}`);
        setGames(response.data.results);
    }

    return(
        <Container>
            <Loader isLoading={isLoading} />

            <div className="header">
                <h1>Rawg Games</h1>
                <p>Mais de 1.000 games para você explorar!</p>
            </div>

            <div className="search">
                <Input placeholder="Digite aqui o nome do game ..." onChange={handleChangeSearchTerm} />
                <button onClick={handleSearch}>BUSCAR</button>
            </div>

            <Content>
                {games.map((game) => (
                    <div className="content-card" key={game.id} data-aos="fade-up">
                        <img className="game-img" src={`${game.background_image}`} alt="back" />
                        
                        {(() => { 
                            if(game.ratings[0]){
                                switch (game.ratings[0].title) {
                                    case "recommended": return(
                                        <div className="avaliation">{game.ratings[0].title} 👍</div>
                                    )
                                        break;
                                
                                    case "exceptional": return(
                                        <div className="avaliation">{game.ratings[0].title} 🎯</div>
                                    )
    
                                    case "meh": return(
                                        <div className="avaliation">{game.ratings[0].title} 😐</div>
                                    )
    
                                    case "skip": return(
                                        <div className="avaliation">{game.ratings[0].title} ⛔</div>
                                    )
                                        break;
                                        
                                    default:
                                        break;
                                }
                            }else{
                                <div className="avaliation">Not avaliation</div>
                            }
                        })()}
                        
                        <div className="description-card">
                            <Link to={`/games/${game.id}`}>{game.name}</Link>
                            <div className="category">
                                {game.genres.map((category, index) => (
                                    <p key={category.id}>{category.name}{index < game.genres.length - 1 ? ", " : " "}</p>
                                ))}
                            </div>
                            
                            {game.parent_platforms.map((platform, index) => {    
                                switch (platform.platform.name) {
                                    case "PC": return(
                                       <WinIcon />
                                    )
                                
                                    case "Xbox": return(
                                        <XboxIcon />
                                    )
    
                                    case "PlayStation": return(
                                        <PlaystationIcon />
                                    )
                                        
                                    default:
                                        break;
                                }
                            })}
                            
                        </div>
                    </div>
                ))}
                
            </Content>
            
            <div id="fetch" className="fetch"></div>

        </Container>
    )
}
