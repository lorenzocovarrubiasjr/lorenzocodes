import { Text, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import { useLoader } from '@react-three/fiber';
import { Mesh, TextureLoader } from "three";

interface WorkHistory {
    id: string;
    companyName: string;
    role: string;
    skills: string[];
    url: string;
    logoUrl: string | null;
}

interface WorkHistoryCardProps {
    position: [number, number, number];
    workHistory: WorkHistory;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const WorkHistoryCard: React.FC<WorkHistoryCardProps> = ({ position, workHistory, onClick }) => {
    const cardRef = useRef<Mesh>(null!);
    const texture = useLoader(TextureLoader, workHistory.logoUrl ?? '');

    return (
        <group position={position} onClick={onClick}>
            <RoundedBox
                ref={cardRef}
                args={[3, 4, 0.1]}
                radius={0.2}
                smoothness={4}
            >
                <meshStandardMaterial color="white" metalness={1.5} roughness={0.5} />
            </RoundedBox>

            {/* Logo Section */}
            <mesh position={[0, 0.9, 0.06]}>
                <planeGeometry args={[2.4, 1]} />
                <meshStandardMaterial 
                    map={texture}
                    transparent={true} 
                    metalness={1.5}
                    roughness={0.3}
                />
            </mesh>

            {/* Company Name and Role Section */}
            <group position={[0, -0.7, 0.1]}>
                <Text
                    position={[0, 0.4, 0]}
                    fontSize={0.25}
                    color="black"
                    anchorX={'center'}
                    anchorY={'middle'}
                    fontWeight={'bold'}
                    maxWidth={2.6}
                >
                    {workHistory.companyName}
                </Text>
                <Text
                    position={[0, 0, 0]}
                    fontSize={0.2}
                    color="gray"
                    anchorX={'center'}
                    anchorY={'middle'}
                    maxWidth={2.6}
                >
                    {workHistory.role}
                </Text>
            </group>

            {/* Skills Chips Section */}
            <group position={[0, -1.2, 0.1]}>
                {
                workHistory.skills.sort((a, b) => a.length - b.length).map((skill: string, index) => {
                    const maxItemsPerRow = workHistory.skills.length > 4 ? 3 : 2
                    const xPos = workHistory.skills.length < 5 ?(index % maxItemsPerRow - .5) : (index % maxItemsPerRow - 1);  
                    const yPos = Math.floor(index / maxItemsPerRow) * -0.4;  // Stack rows downward
                    return (
                        <group key={skill} position={[xPos, yPos, 0]}>
                            <RoundedBox
                                args={[0.2 + skill.length * 0.08 , 0.3, -0.03]}
                                radius={.05}
                                smoothness={4}
                            >
                                <meshStandardMaterial 
                                    color="#c7b307"
                                    metalness={2}
                                    roughness={0.7}
                                />
                            </RoundedBox>
                            <Text
                                position={[0, 0, 0.015]}
                                fontSize={0.15}
                                color="black"
                                anchorX={'center'}
                                anchorY={'middle'}
                                maxWidth={1}
                            >
                                {skill.substring(0, 12)}
                            </Text>
                        </group>
                    );
                })}
            </group>
        </group>
    );
}

export default WorkHistoryCard;