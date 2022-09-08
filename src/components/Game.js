import {useState} from 'react';

import Bowl from './Bowl';
import Barf from './Barf';

const Game = (props) => {
    console.log(props.goal)

    const messagesTreatGiven = [
        `Yay! Thanks for the Treat! \n \n Would you like to give more? That's more Treats for me, and more fun for you!`,
        `One Treat, yes, I love that! \n \n If you have more, I'm all for it! The more Treats, the happier I get!`,
        `TREEEEEEEEEAAAAAAAAAATS! \n \n I'll get into it and do the Bunny, I'm sure you'll want to give me more!`,
        `I love this game, thanks! \n \n I'm the #1 fan of Treats, so if you want to give me more, don't hesitate!`,
        `You're so good at the game! \n \n Ain't it fun? Let's keep playing and get some more Treats for Jumbo, aka me!`
    ]

    const messagesBarf = [
        `Oupsie, just barfed a little... \n \n Sorry about that, but we can recycle that barf to make more treats for Treat O'Clock!`,
        `Oh well, that was a bit too much for me... \n \n Good news though, we can play again whenever you want!`,
        `Oh no... I guess I bit off a bit more than I could chew... \n \n I think we should play again so I can do better... Treats?`,
        `You're too generous! A bit too much for me even! \n \n Alright, next round, same team: you give the Treats, I eat the Treats!`,
        `I love this game, and barfing is part of the game! \n \n I think you need more training, so I'll do the effort and let you give me some more Treats again!`
    ]

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
                const randomIndex = Math.floor(Math.random()*messagesTreatGiven.length)
                setMessage(
                    messagesTreatGiven[randomIndex]
                )
            } else if (prev + 1 > props.goal ){
                const randomIndex = Math.floor(Math.random()*messagesBarf.length)
                setMessage(
                    messagesBarf[randomIndex]
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
