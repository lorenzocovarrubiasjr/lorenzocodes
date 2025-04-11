import { Text, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import { useLoader } from '@react-three/fiber';
import { Mesh, TextureLoader } from "three";

interface Project {
    id: string;
    name: string;
    url: string;
    imageUrl: string;
}

interface ProjectCardProps {
    position: [number, number, number];
    project: Project,
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  }
  
  const ProjectCard: React.FC<ProjectCardProps> = ({ position, project, onClick }) => {
    const cardRef = useRef<Mesh>(null!);
    const texture = useLoader(TextureLoader,  project.imageUrl ?? '');

    return ( 
      <group position={position} onClick={onClick}>
        <RoundedBox
            ref={cardRef}
            args={[3, 4, 0.1]}
            radius={0.2}
            smoothness={4}
        >
            <meshStandardMaterial color="white" metalness={1.5} roughness={0.5}/>
        </RoundedBox>

        <mesh position={[0 ,0.9, 0.06]}>
            <planeGeometry args={[2.6, 1.6]} />
            <meshStandardMaterial 
                map={texture} metalness={0.1} roughness={0.3}
                />
        </mesh>

        <group position={[0, -0.6, 0.1]}>
            <Text 
                position={[0, 0.3, 0]}
                fontSize={0.2}
                color="black"
                anchorX={'center'}
                anchorY={'middle'}
                fontWeight={'bold'}
                maxWidth={2.6}
            >{project.name}
            </Text>
            <Text
                position={[0, -0.5, 0]}
                fontSize={0.1}
                color="blue"
                anchorX={'center'}
                anchorY={'middle'}
                maxWidth={2.6}
            >
                {project.url}
            </Text>
        </group>
      </group>
  )}

  export default ProjectCard;

