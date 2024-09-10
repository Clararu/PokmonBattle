import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext, useRef } from 'react';
import { GetPokemonBackGIF, GetPokemonFrontGIF } from '../components/GetPokemonImages';
import { PokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import Stadium from '../assets/images/stadium1.png';
import AshKetchum from '../assets/images/Ash_Ketchum.png';
import HeartIcon from '../assets/icons/heart.svg';
import Confetti from 'react-confetti';

export default function BattleScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerPokemonId, opponentPokemonId } = location.state || {};
  const { pokemonData, setPlayerPokemonId, setOpponentPokemonId } = useContext(PokemonContext);

  const [playerPokemonBackGif, setPlayerPokemonBackGif] = useState('');
  const [opponentPokemonFrontGif, setOpponentPokemonFrontGif] = useState('');
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [playerHP, setPlayerHP] = useState(100);
  const [opponentHP, setOpponentHP] = useState(100);
  const [round, setRound] = useState(0);
  const [winner, setWinner] = useState(null);
  const [fightLog, setFightLog] = useState([]);
  const [isAttacking, setIsAttacking] = useState(false);
  const [currentTurn, setCurrentTurn] = useState('player'); // 'player' or 'opponent'

  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [fightLog]);

  const addToFightLog = (message) => {
    setFightLog((prevLog) => [...prevLog, message]);
  };

  const calculateDamage = (attacker, defender) => {
    const useSpecialAttack = Math.random() < 0.25;
    const useSpecialDefense = Math.random() < 0.25;
    let attack = attacker.base.Attack;
    let defense = defender.base.Defense;
    let attackType = 'Base Attack';
    let defenseType = 'Base Defense';

    if (useSpecialAttack) {
      attack = attacker.base['Sp. Attack'];
      attackType = 'Special Attack';
      addToFightLog(`${attacker.name.english} uses ${attackType} with <b>${attack}</b>!`);
    } else {
      addToFightLog(`${attacker.name.english} uses ${attackType} with <b>${attack}</b>!`);
    }

    if (useSpecialDefense) {
      defense = defender.base['Sp. Defense'];
      defenseType = 'Special Defense';
      addToFightLog(`${defender.name.english} uses ${defenseType} with <b>${defense}</b>!`);
    } else {
      addToFightLog(`${defender.name.english} uses ${defenseType} with <b>${defense}</b>!`);
    }

    const damage = Math.max(attack - defense / 2, 10);
    return damage;
  };

  const handleFight = () => {
    if (playerHP <= 0 || opponentHP <= 0) return;

    setIsAttacking(true);

    setTimeout(() => {
      setRound((prevRound) => prevRound + 1);

      if (currentTurn === 'player') {
        const damage = calculateDamage(playerPokemon, opponentPokemon);
        setOpponentHP((prevHP) => Math.max(Math.round(prevHP - damage), 0));
        addToFightLog(`${playerPokemon.name.english} deals <b>${Math.round(damage)}</b> damage!`);
        setCurrentTurn('opponent');
      } else {
        const damage = calculateDamage(opponentPokemon, playerPokemon);
        setPlayerHP((prevHP) => Math.max(Math.round(prevHP - damage), 0));
        addToFightLog(`${opponentPokemon.name.english} deals <b>${Math.round(damage)}</b> damage!`);
        setCurrentTurn('player');
      }

      setIsAttacking(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (playerPokemonId && opponentPokemonId) {
        const playerData = pokemonData.find((pokemon) => pokemon.id === playerPokemonId);
        const opponentData = pokemonData.find((pokemon) => pokemon.id === opponentPokemonId);

        if (playerData) {
          setPlayerPokemon(playerData);
          setPlayerHP(playerData.base.HP);
        }
        if (opponentData) {
          setOpponentPokemon(opponentData);
          setOpponentHP(opponentData.base.HP);
        }

        const playerBackGif = await GetPokemonBackGIF(playerPokemonId);
        const opponentFrontGif = await GetPokemonFrontGIF(opponentPokemonId);
        setPlayerPokemonBackGif(playerBackGif);
        setOpponentPokemonFrontGif(opponentFrontGif);

        const playerSpeed = playerData.base.Speed;
        const opponentSpeed = opponentData.base.Speed;

        if (playerSpeed >= opponentSpeed) {
          addToFightLog(`${playerData.name.english} is faster and attacks first.`);
        } else {
          addToFightLog(`${opponentData.name.english} is faster and attacks first.`);
          setRound(1);
          setCurrentTurn('opponent');
        }
      }
    };
    fetchPokemonData();
  }, [playerPokemonId, opponentPokemonId, pokemonData]);

  useEffect(() => {
    if (playerHP <= 0) {
      setWinner(opponentPokemon.name.english);
      addToFightLog(`${opponentPokemon.name.english} wins the battle!`);
    } else if (opponentHP <= 0) {
      setWinner(playerPokemon.name.english);
      addToFightLog(`${playerPokemon.name.english} wins the battle!`);
    }
  }, [playerHP, opponentHP, playerPokemon, opponentPokemon]);

  const returnToArena = () => {
    if (winner === playerPokemon.name.english) {
      const randomOpponentId = Math.floor(Math.random() * pokemonData.length) + 1;
      setOpponentPokemonId(randomOpponentId);
    } else {
      const randomPlayerId = Math.floor(Math.random() * pokemonData.length) + 1;
      setPlayerPokemonId(randomPlayerId);
    }

    navigate('/arena');
  };

  return (
    <div
      className="relative flex h-screen flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${Stadium})`,
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        gridColumnGap: '0px',
        gridRowGap: '0px',
      }}>
      {/* Player's Turn Indicator */}
      {currentTurn === 'player' && (
        <div className="absolute left-[10%] top-[10%] text-4xl font-bold text-red-500">Player&apos;s Turn!</div>
      )}

      {/* Opponent's Turn Indicator */}
      {currentTurn === 'opponent' && (
        <div className="absolute right-[10%] top-[10%] text-4xl font-bold text-blue-500">Opponent&apos;s Turn!</div>
      )}

      {/* Player's Pokémon Card - Left */}
      <div style={{ gridArea: '2 / 1 / 4 / 2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {playerPokemon && <PokemonCard pokemonId={playerPokemon.id} />}
      </div>

      {/* Player's Pokémon Back GIF */}
      <div
        style={{
          gridArea: '2 / 2 / 4 / 3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '-15em',
          marginBottom: '-10em',
          transform: isAttacking && round % 2 === 0 ? 'translateX(30px)' : 'translateX(0)',
          transition: 'transform 0.5s ease',
        }}>
        {playerPokemonBackGif && (
          <>
            <div className="mb-2">
              <div className="relative flex flex-col items-center">
                <div className="h-4 w-full bg-red-500">
                  <div
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${(playerHP / playerPokemon.base.HP) * 100}%` }}></div>
                </div>
                <div className="relative flex items-center">
                  <img src={HeartIcon} alt="Heart" className="h-10 w-10" />
                  <p className="absolute left-1/2 -translate-x-1/2 transform text-lg font-bold">{playerHP}</p>
                </div>
              </div>
            </div>
            <img src={playerPokemonBackGif} alt="Player Pokémon Back" className="h-36 w-auto" />
          </>
        )}
      </div>

      {/* Opponent's Pokémon Front GIF */}
      <div
        style={{
          gridArea: '2 / 3 / 4 / 4',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '-15em',
          marginTop: '-2em',
          transform: isAttacking && round % 2 !== 0 ? 'translateX(-30px)' : 'translateX(0)',
          transition: 'transform 0.5s ease',
        }}>
        {opponentPokemonFrontGif && (
          <>
            <div className="mb-2">
              <div className="relative flex flex-col items-center">
                <div className="h-4 w-full bg-red-500">
                  <div
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${(opponentHP / opponentPokemon.base.HP) * 100}%` }}></div>
                </div>
                <div className="relative flex items-center">
                  <img src={HeartIcon} alt="Heart" className="h-10 w-10" />
                  <p className="absolute left-1/2 -translate-x-1/2 transform text-lg font-bold">{opponentHP}</p>
                </div>
              </div>
            </div>
            <img src={opponentPokemonFrontGif} alt="Opponent Pokémon Front" className="h-36 w-auto" />
          </>
        )}
      </div>

      {/* Opponent's Pokémon Card - Right */}
      <div style={{ gridArea: '2 / 4 / 4 / 5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {opponentPokemon && <PokemonCard pokemonId={opponentPokemon.id} />}
      </div>

      <button
        onClick={handleFight}
        className="btn btn-primary absolute bottom-[12%] left-[50%] -translate-x-[50%] transform whitespace-nowrap border-4 border-black bg-red-500 px-16 py-8 font-pixel text-4xl text-white shadow-lg">
        <div className="flex h-full w-full items-center justify-center">Attack!</div>
      </button>

      <img src={AshKetchum} alt="Ash Ketchum" className="absolute bottom-0 left-[20%] h-96 w-96" />

      <div
        className="absolute bottom-0 h-56 w-1/5 overflow-y-scroll bg-white bg-opacity-80 p-2 text-black"
        ref={logRef}>
        {fightLog.map((log, index) => (
          <p key={index} className="text-xs" dangerouslySetInnerHTML={{ __html: log }} />
        ))}
      </div>

      {winner && (
        <>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-white p-10 text-center shadow-lg">
              <h2 className="text-2xl font-bold">{winner} Wins!</h2>
              <img
                src={winner === playerPokemon.name.english ? playerPokemonBackGif : opponentPokemonFrontGif}
                alt="Winning Pokemon"
                className="my-4 h-36 w-auto"
              />
              <button onClick={returnToArena} className="btn btn-primary mt-4">
                Back to Arena
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
