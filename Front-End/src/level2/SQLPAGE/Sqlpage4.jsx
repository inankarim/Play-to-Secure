import React from 'react';
import {motion} from 'framer-motion';
import dangericon from '../../assets/short icons/danger icon.png';
import { useNavigate } from 'react-router-dom';

const Sqlpage4 = () => {
     const navigate = useNavigate();
      
    return (
        <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
            <link href="https://fonts.googleapis.com/css2?family=Faster+One&display=swap" rel="stylesheet"></link>
            <div 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center mt-12 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20" 
                style={{
                    fontFamily: 'Faster One, cursive',
                    background: 'linear-gradient(90deg, #F0ED1F 0%, #EF0606 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}
            >
                THE LION'S DEFENCE
            </div>
             
            <link href="https://fonts.googleapis.com/css2?family=Abyssinica+SIL&display=swap" rel="stylesheet"></link>

            <div className='max-w-7xl mx-auto border-4 border-red-600 rounded-2xl overflow-hidden flex flex-col gap-6'>
                <div className='bg-red-600 py-6 sm:py-8'>
                    <p className='text-3xl m-6 sm:text-4xl md:text-5xl text-white text-left font-semibold tracking-wide px-6'>
                        HOW THE FOX ENTERED
                    </p>
                </div>
                
                <div className='bg-[#B08888] text-white px-6 m-6 border-4 border-red-600 rounded-2xl sm:px-8 py-6 sm:py-8' style={{
                    fontFamily:'Abyssinica SIL, serif',
                }}>
                    <p className='text-2xl sm:text-3xl md:text-4xl text-left leading-relaxed'>
                        The Cunning Fox didn't guess the password, he tricked the Stone Door into thinking Empty equals Empty
                    </p>
                </div>

                <div className='text-2xl m-6 border-4 border-red-600 rounded-2xl sm:text-3xl text-white px-6 sm:px-8 py-6 sm:py-8'
                style={{
                    background: 'linear-gradient(90deg, #151515 0%, #413232 51%)',
                    fontFamily: 'Abyssinica SIL, serif',
                }}>
                    <p className='text-left font-semibold mb-4 ml-2 text-3xl sm:text-4xl'>THE FOX WHISPER (INPUT)</p>
                    <p className='text-left text-yellow-300 ml-4 font-mono text-2xl sm:text-3xl md:text-4xl break-all'>"" OR ""=""</p>
                </div>
                
                <p className='text-3xl sm:text-4xl ml-6 text-white mb-2' style={{fontFamily: 'Abyssinica SIL, serif'}}>The Old Code read it like this:</p>
                <div className='text-2xl mt-0 mb-6 mx-6 sm:text-3xl text-white px-6 sm:px-8 py-6 sm:py-8 border-4 border-red-600 rounded-2xl'
                style={{
                    background: 'linear-gradient(90deg, #151515 0%, #191717 51%)',
                    fontFamily: 'Abyssinica SIL, serif',
                }}>
                    <div className='text-left text-yellow-300 ml-4 font-mono text-2xl sm:text-3xl md:text-4xl break-all'> 
                        <span className='text-blue-400'>SELECT</span>{' '}
                        <span className='text-yellow-300'>* </span>
                        <span className='text-blue-400'>FROM</span>{' '}
                        <span className='text-yellow-300'>Users </span>
                        <span className='text-blue-400'>WHERE</span>{' '}
                        <span className='text-yellow-300'>NAME = </span>
                        <span className='text-red-500'>''</span>{' '}
                        <span className='text-blue-400'>OR</span>{' '}
                        <span className='text-red-500'>""</span>{' '}
                        <span className='text-yellow-300'>= </span>
                        <span className='text-red-500'>""</span>{' '}
                        <span className='text-blue-400'>AND</span>{' '}
                        <span className='text-yellow-300'>password = </span>
                        <span className='text-red-500'>""</span>{' '}
                        <span className='text-blue-400'>OR</span>{' '}
                        <span className='text-red-500'>""</span>
                        <span className='text-yellow-300'>=</span>
                        <span className='text-red-500'>""</span>
                    </div>
                </div> 

                {/* Danger Warning Box */}
                <div className='text-2xl mt-0 mb-6 mx-6 sm:text-3xl px-6 sm:px-8 py-6 sm:py-8 border-4 border-red-600 rounded-2xl bg-black flex items-start gap-4'
                style={{
                    fontFamily: 'Abyssinica SIL, serif',
                }}>
                    <img src={dangericon} alt="danger" className='w-12 h-12 sm:w-16 sm:h-16 mt-2 flex-shrink-0'/>
                    <p className='text-red-500 text-2xl sm:text-3xl md:text-4xl leading-relaxed'>
                        Since "" is equal to "", it doesn't matter if the NAME or PASSWORD 
                        is wrong. The door opened anyway. The Fox tricked the door cleverly—
                        OR means "if either side is TRUE, let logic through."
                    </p>
                </div>

                {/* Shield Info Box */}
                <div className='mt-0 mb-6 mx-6 px-6 sm:px-8 py-8 sm:py-10 border-4 border-blue-500 rounded-2xl'
                style={{
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                    fontFamily: 'Abyssinica SIL, serif',
                }}>
                    <div className='flex items-center gap-4 mb-6'>
                        <div className='text-5xl sm:text-6xl'>🛡️</div>
                        <p className='text-white text-3xl sm:text-4xl md:text-5xl font-bold'>HOW TO STOP THE FOX?</p>
                    </div>
                    
                    <div className='bg-gray-800 bg-opacity-50 rounded-xl p-6 mb-5'>
                        <p className='text-gray-300 text-2xl sm:text-3xl md:text-4xl mb-4 leading-relaxed'>
                            Instead of just directly putting user inputs into the SQL query, we use special 
                            containers called <span className='text-yellow-300 font-semibold'>Parameterized Queries</span> or <span className='text-yellow-300 font-semibold'>Prepared Statements</span>. 
                            This makes the database treat all user input as DATA, not as commands.
                        </p>
                    </div>

                    <div className='bg-gray-900 rounded-xl p-6'>
                        <p className='text-green-400 font-semibold mb-4 text-2xl sm:text-3xl'>The Safe (New) Code:</p>
                        <div className='text-left font-mono text-xl sm:text-2xl md:text-3xl break-all leading-relaxed'>
                            <span className='text-purple-400'>db.execute(</span>
                            <span className='text-green-300'>"SELECT * FROM users WHERE name=? AND password=?"</span>
                            <span className='text-purple-400'>, [</span>
                            <span className='text-yellow-300'>username</span>
                            <span className='text-purple-400'>, </span>
                            <span className='text-yellow-300'>password</span>
                            <span className='text-purple-400'>])</span>
                            <br/>
                            <span className='text-gray-500 text-xl'>// ? = placeholders (username, password)</span>
                        </div>
                    </div>
                </div>

                {/* Why Does This Stop The Fox */}
                <div className='mt-0 mb-6 mx-6 px-8 sm:px-10 py-8 sm:py-10 border-4 border-yellow-600 rounded-2xl'
                style={{
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    fontFamily: 'Abyssinica SIL, serif',
                }}>
                    <p className='text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center'
                    style={{
                        background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        WHY DOES THIS STOP THE FOX?
                    </p>
                    
                    <div className='space-y-6'>
                        <div className='flex items-start gap-5 bg-red-900 bg-opacity-30 p-6 rounded-xl border-l-8 border-red-500'>
                            <div className='text-5xl sm:text-6xl flex-shrink-0'>❌</div>
                            <div>
                                <p className='text-red-400 font-bold text-3xl sm:text-4xl mb-3'>The Past (❌ Vulnerable) Style:</p>
                                <p className='text-gray-300 text-2xl sm:text-3xl md:text-4xl leading-relaxed'>
                                    The database takes the Fox input literal WRONG, for instance 
                                    <span className='text-yellow-300 font-mono'> "SELECT * FROM users WHERE name='' OR ''=''"</span>. 
                                    So the Door (literal server) lets ANYONE.
                                </p>
                            </div>
                        </div>

                        <div className='flex items-start gap-5 bg-green-900 bg-opacity-30 p-6 rounded-xl border-l-8 border-green-500'>
                            <div className='text-5xl sm:text-6xl flex-shrink-0'>✅</div>
                            <div>
                                <p className='text-green-400 font-bold text-3xl sm:text-4xl mb-3'>The NOW (✅ Safe) Style:</p>
                                <p className='text-gray-300 text-2xl sm:text-3xl md:text-4xl leading-relaxed'>
                                    The database looks for a plain, literal string USERNAME. OR becomes 
                                    part of the search text, so if there's no one in the whole kingdom 
                                    with the ridiculous NAME, the access is <span className='text-red-500 font-bold'>DENIED</span>!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Test The New Defense */}
                <div className='mt-0 mb-10 mx-6 px-8 sm:px-10 py-12 sm:py-14 border-4 rounded-2xl'
                style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                    borderColor: '#d4af37',
                    fontFamily: 'Abyssinica SIL, serif',
                }}>
                    <p className='text-5xl sm:text-6xl md:text-7xl font-bold text-center mb-5'
                    style={{
                        fontFamily: 'Faster One, cursive',
                        background: 'linear-gradient(90deg, #F0ED1F 0%, #EF0606 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        TEST THE NEW DEFENSE
                    </p>
                    <p className='text-gray-300 text-2xl sm:text-3xl md:text-4xl text-center mb-10'>
                        Simulate the attack against the new (Parameterized) Shield
                    </p>
                    
                    <motion.button
                        onClick={() => navigate('/level2/sqlpage5')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='w-full text-black text-3xl sm:text-4xl md:text-5xl font-bold py-8 sm:py-10 rounded-xl flex items-center justify-center gap-6'
                        style={{
                            background: 'linear-gradient(90deg, #84cc16 0%, #22c55e 100%)',
                        }}
                    >
                        <span className='text-5xl sm:text-6xl'>▶</span>
                        RUN SIMULATION
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default Sqlpage4;