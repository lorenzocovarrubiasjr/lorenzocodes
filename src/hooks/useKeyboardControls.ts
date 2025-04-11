import {useEffect, useState } from 'react';

interface Movement {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
}

export const useKeyboardControls = (): Movement => {
    const [movement, setMovement] = useState<Movement>({
        forward: false,
        backward: false,
        left: false,
        right: false
    })

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setMovement((m) => ({
                ...m,
                forward: e.key === 'ArrowUp' || e.key === 'w' ? true : m.forward,
                backward: e.key === 'ArrowDown' || e.key === 's' ? true : m.backward,
                left: e.key === 'ArrowLeft' || e.key === 'a' ? true : m.left,
                right: e.key === 'ArrowRight' || e.key === 'd' ? true : m.right
            }))
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            setMovement((m) => ({
                ...m,
                forward: e.key === 'ArrowUp' || e.key === 'w' ? false : m.forward,
                backward: e.key === 'ArrowDown' || e.key === 's' ? false : m.backward,
                left: e.key === 'ArrowLeft' || e.key === 'a' ? false : m.left,
                right: e.key === 'ArrowRight' || e.key === 'd' ? false : m.right
            }))
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [])

    return movement;
}