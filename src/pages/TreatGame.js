import { useState } from "react";

import CatFull from "../components/CatFull";

const TreatGame = () => {
    const [gameOn, setGameOn] = useState(false)
    const [treats, setTreats] = useState(0)

    return (
        <main className="main-game">
            < CatFull
                catHeight = "1000"
                catColor = "#666366"
            />
            <div className="gameArea-game">

            </div>
        </main>
    );
}

export default TreatGame;
