import { useRef } from "react";
import { useLoader } from '@react-three/fiber';
import { Mesh, TextureLoader } from "three";
import { RoundedBox } from "@react-three/drei";

interface Certification {
    id: number;
    name: string;
    issuer: string;
    url: string;
    imageUrl: string;
}

interface CertificationCardProps {
    position: [number, number, number];
    certification: Certification;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ position, certification, onClick }) => {
    const cardRef = useRef<Mesh>(null!);
    const texture = useLoader(TextureLoader, certification.imageUrl ?? '');

    return (
        <group 
            position={position} 
            onClick={onClick}
        >
            <RoundedBox
                ref={cardRef}
                args={[5.5, 4.5, 0.1]}  // Square dimensions: 4x4 with 0.1 depth
                radius={0.2}
                smoothness={4}
            >
                <meshStandardMaterial 
                    map={texture}
                    metalness={1.5}
                    roughness={0.5}
                />
            </RoundedBox>
            <mesh position={[0, 0, 0.06]}>
                <planeGeometry args={[5.2, 4.2]} />  // Match the RoundedBox dimensions
                <meshStandardMaterial 
                    map={texture}
                    metalness={1.5}
                    roughness={0.5}
                />
            </mesh>
        </group>
    );
}

export default CertificationCard;