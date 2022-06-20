import {useState} from 'react';

import Bowl from './Bowl';
import Barf from './Barf';

const Game = (props) => {
    console.log(props.goal)

    const [inPlay, setInPlay] = useState(true)
    const [barfed, setBarfed] = useState(false)

    const [treats, setTreats] = useState(0)
    const [message, setMessage] = useState(
        `Ok! Let's play and get me some Treats! \n \n Use the buttons below to give me more or less Treats!`
    )

    const addTreat = () => {
        setTreats((prev) => {
            const offset = Math.floor(Math.random()*4)
            if (props.goal - prev + 1 > offset){
                setMessage(
                    `Yay! Thanks for the Treat! \n \n Would you like to give more? That's more Treats for me, and more fun for you!`
                )
            } else if (prev + 1 > props.goal ){
                setMessage(
                    `Oupsie, just barfed a little... \n \n Sorry about that, but we can recycle that barf to make more treats for Treat O'Clock!`
                )
                setInPlay(false)
                setBarfed(true)
            } else {
                setMessage(
                    `So generous! \n \n Starting to get full over there, but keep going!`
                )
            }
            return prev +1
        })
        
    }

    const removeTreat = () => { 
        setMessage(
            `Uh-Uh! A Treat given is a Treat given! No take backs!`
        )
    }

    const stopTreats = () => {
        setInPlay(false)
        if (treats === props.goal){
            setMessage(
                `That was nice! \n \n Exactly the amount I needed! I'll need some more quite soon, at Treat O'Clock, so don't get too far!`
            )
        } else {
            setMessage(
                `Hmmm... I guess that'll do it! \n \n But I think the Treat Lady would have given more. Don't go too far though, Treat O'Clock is approaching!`
            )
        }
    }

    const restartGame = () => {
        props.changeGameState()
    }

    return (
        <div className='gameArea-game'>
            <p className='gameArea-game--message'>
                {message}
            </p>
            {inPlay ?
                (<><div className='gameArea-game--buttonSection'>
                    <button className='gameArea-game--addButton' onClick={addTreat}>Give Treat</button>
                    <button className='gameArea-game--removeButton' onClick={removeTreat}>Remove Treat</button>
                    <button className='gameArea-game--stopButton' onClick={stopTreats}>Stop There</button>
                </div>
                <Bowl
                treats = {treats}
                /></>
                ) : barfed ? 
                (<>
                    <div className='gameArea-game--buttonSection'>
                        <button className='gameArea-game--addButton' onClick={restartGame}>Restart</button>
                    </div>
                    <Barf />
                </> ) :
                (<div className='gameArea-game--buttonSection'>
                    <button className='gameArea-game--addButton' onClick={restartGame}>Restart</button>
                </div>)
            }
            
        </div>
    );
}

export default Game;
