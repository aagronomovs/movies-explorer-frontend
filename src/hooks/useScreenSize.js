import React, { useState } from 'react'

export default function ScreenSize() {
    const [size, setSize] = useState(0);

React.useLayoutEffect(() => {
    function updateSize() {
        setSize(window.innerWidth);
    }
        
    window.addEventListener('resize', updateSize);
    
    updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}