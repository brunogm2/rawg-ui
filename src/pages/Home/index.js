import { useEffect, useMemo, useRef, useState } from "react";
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
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [removeButton, setRemoveButton] = useState(true);
    const [fetch, setFetch] = useState(1);

    const firstUpdate = useRef(true); 
    
    useEffect(() => {
        setIsLoading(true);
        handleListGames();
    }, [currentPage]);

    useEffect(() => {
        AOS.init({ duration: 2000 });
       
        if (firstUpdate.current) { 
            firstUpdate.current = false; 
            return; 
        } 

        const observable = new IntersectionObserver((entries) => {
            if(entries.some((entry) => entry.isIntersecting )){
                setCurrentPage((currentPageInsideState) => currentPageInsideState + 1);
            }else{
                setRemoveButton(false);
            }
        });

        observable.observe(document.querySelector('#fetch'));

        return () => observable.disconnect();
    }, [fetch])

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
        setIsLoading(true);
        
        const response = await api.get(`games${process.env.REACT_APP_API_KEY}&search=${searchTerm}`);
        setIsLoading(false);
        setGames(response.data.results);
    }

    function handleLoadingGames(){
        setFetch((currentPageInsideState) => currentPageInsideState + 1)
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
            {removeButton == true ? 
             <div id="fetch" className="fetch" >
                <button onClick={handleLoadingGames}>
                        Carregar Mais
                </button>
            </div> : 
            <div id="fetch" className="fetch" >

            </div>
            }
            

        </Container>
    )
}
