import { useState } from "react";

import CatFull from "../components/CatFull";
import Game from "../components/Game";

const TreatGame = () => {

    const treatGoal = Math.floor(Math.random() * 20) + 1
    const [gameOn, setGameOn] = useState(false)

    const changeGameState = () => {
        setGameOn(prev => !prev)
    } 

    return (
        <main className="main-game">
            < CatFull
                catHeight = "1000"
                catColor = "#666366"
            />
            {gameOn ? <Game 
                        goal={treatGoal}
                        gameOn={gameOn}
                        changeGameState={changeGameState}
                    /> : 
                <div className="gameArea-game">
                <p className="gameArea-game--message">
                    Hi! It's Jumbo!
                    <br></br> <br></br>
                    As I already said, I love Treats, so here's a game: give me some Treats and make me happy!
                    <br></br>
                    It's a win-win for the both of us: you have fun, I get Treats!
                </p>
                <button className="gameArea-game--button" onClick={changeGameState}>Start Game</button>
            </div>
            }
            
        </main>
    );
}

export default TreatGame;
