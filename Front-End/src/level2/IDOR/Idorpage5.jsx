import React from 'react';
import { useNavigate } from 'react-router-dom';

const Idorpage5 = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen">
            <button
                onClick={() => navigate('/level2/idorpage3')}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg text-xl font-semibold 
                hover:bg-blue-600 transition-all duration-300"
            >
                crown
            </button>
        </div>
    );
};

export default Idorpage5;
