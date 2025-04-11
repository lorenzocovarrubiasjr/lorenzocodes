import { useRef, useImperativeHandle, forwardRef, RefAttributes } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';    
import { Group, Mesh } from 'three';

interface PlayerProps {
    position: [number, number, number];
}

export interface PlayerRef {
    getPosition: () => [number, number, number]
}

const Player = forwardRef<PlayerRef, PlayerProps>(({ position }, ref) => {
    const groupRef = useRef<Group>(null!);
    const bodyRef = useRef<Mesh>(null!);
    const leftLegRef = useRef<Mesh>(null!);
    const rightLegRef = useRef<Mesh>(null!);
    const leftArmRef = useRef<Mesh>(null!);
    const rightArmRef = useRef<Mesh>(null!);
    const headRef = useRef<Mesh>(null!);
    const bunRef = useRef<Mesh>(null!);

    const { forward, backward, left, right } = useKeyboardControls();

    // Animation State
    const walkSpeed = 0.1;
    let walkTime = 0;

    useImperativeHandle(ref, () => ({
        getPosition: () => 
            groupRef.current ? [
                groupRef.current.position.x,
                groupRef.current.position.y,
                groupRef.current.position.z
            ] : [0,0,0]
    }));

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Movement
        const isMoving = forward || backward || left || right;
        const speed = 0.1;

        if (forward) groupRef.current.position.z -= speed;
        if (backward)groupRef.current.position.z += speed;
        if (left) groupRef.current.position.x -= speed;
        if (right) groupRef.current.position.x += speed;

        // Walking Animation
        if (isMoving){
            walkTime += delta * 5;

            // Leg Animation
            if(leftLegRef.current && rightLegRef.current){
                const legSwing = Math.sin(walkTime) * 2;
                leftLegRef.current.rotation.x = legSwing;
                rightLegRef.current.rotation.x = -legSwing;
            }

            // Arm Animation
            if(leftArmRef.current && rightArmRef.current){
                const armSwing = Math.sin(walkTime) * 2;
                leftArmRef.current.rotation.x = armSwing;
                rightArmRef.current.rotation.x = -armSwing;
            }
        } else {
            // Reset to standing position
            if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
            if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
            if (leftArmRef.current) leftArmRef.current.rotation.x = 0;
            if (rightArmRef.current) rightArmRef.current.rotation.x = 0;
            walkTime = 0;
        }
    })

    return (
        <group ref={groupRef} position={position}>
            {/* Body */}
            <mesh ref={bodyRef} position={[0, 0.2, 0]}>
                <boxGeometry args={[0.5,0.5,0.3]} />
                <meshStandardMaterial color="blue" /> 
            </mesh>

            {/* Head */}
            <mesh ref={headRef} position={[0, 0.75, 0]}>
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshStandardMaterial color="peachpuff" /> 
            </mesh>

            {/* Manbun */}
            <mesh ref={bunRef} position={[0, 0.95, -0.1]}>
                <sphereGeometry args={[0.1, 32, 32]} />
                <meshStandardMaterial color="brown" /> 
            </mesh>

            {/* Left Leg */}
            <mesh ref={leftLegRef} position={[-0.15, -0.25, 0]}>
                <boxGeometry args={[0.2, 0.5, 0.2]} />
                <meshStandardMaterial 
                color="#000000"  // Explicit black hex code
                metalness={0}    // Reduce shininess
                roughness={1}    // Make less reflective
                /> 
            </mesh>

            {/* Right Leg */}
            <mesh ref={rightLegRef} position={[0.15, -0.25, 0]}>
                <boxGeometry args={[0.2, 0.5, 0.2]} />
                <meshStandardMaterial color="#000000"  // Explicit black hex code
                    metalness={0}    // Reduce shininess
                    roughness={1}    // Make less reflective 
                    /> 
            </mesh>

            {/* Left Arm */}
            <mesh ref={leftArmRef} position={[-0.35, 0.25, 0]}>
                <boxGeometry args={[0.2, 0.5, 0.2]} />
                <meshStandardMaterial color="blue" />
            </mesh>

            {/* Right Arm */}
            <mesh ref={rightArmRef} position={[0.35, 0.25, 0]}>
                <boxGeometry args={[0.2, 0.5, 0.2]} />
                <meshStandardMaterial color="blue" />
            </mesh>
        </group>
    )
})

export default Player;