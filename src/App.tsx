import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import Player, { PlayerRef } from './components/Player/Player'; 
import ProjectCard from './components/ProjectCard/ProjectCard'; 
import WorkHistoryCard from './components/WorkHistoryCard/WorkHistoryCard';
import CertificationCard from './components/CertificationCard/CertificationCard';
import { Mesh } from 'three';
import LorenzoCodesIcon from './assets/lorenzocodes_icon.png';
import Terminal from './components/Terminal/Terminal';
import { Project } from './types/Project';
import { WorkHistoryItem } from './types/WorkHistoryItem';
import { Certification } from './types/Certification';
import { LogEntry } from './types/LogEntry';
import { fetchCertifications, fetchProjects, fetchWorkHistory } from './services/api';

interface SceneUpdaterProps {
    playerRef: React.RefObject<PlayerRef>;
    groundRef: React.RefObject<Mesh>;
}

const BackgroundSetup: React.FC = () => {
  const { gl } = useThree();
  
  // Set the background color once when the component mounts
  useEffect(() => {
      gl.setClearColor('#87CEEB'); // Light blue
  }, [gl]);

  return null;
};

const SceneUpdater: React.FC<SceneUpdaterProps> = ({ playerRef, groundRef }) => {
    const { camera } = useThree();

    useFrame(() => {
        if (playerRef.current && groundRef.current) {
            const playerPos = playerRef.current.getPosition();
            
            // Update ground position
            groundRef.current.position.set(playerPos[0], -0.5, playerPos[2]);
            groundRef.current.updateMatrix(); // Force update the matrix
            groundRef.current.updateMatrixWorld(); // Ensure world matrix is updated

            // Update camera position
            camera.position.set(playerPos[0], 5, playerPos[2] + 10);
            camera.lookAt(playerPos[0], playerPos[1], playerPos[2]);
        }
    });

    return null;
};

const App: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [workHistoryItem, setWorkHistoryItem] = useState<WorkHistoryItem[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const playerRef = useRef<PlayerRef>(null!);
    const groundRef = useRef<Mesh>(null!);

    const addLog = (message: string) => {
        const timestamp = new Date().toLocaleString();
        setLogs(prev => [...prev, { message, timestamp }])
    }

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, url: string, type: string) => {
        e.stopPropagation();
        addLog(`Opening ${type} link: ${url}`);
        window.open(url, '_blank');
    }

    useEffect(() => {
        fetchProjects().then(projects => {
            addLog('GET Request: Projects fetched successfully');
            setProjects(projects)
        })

        fetchWorkHistory().then(workHistory => {
            addLog('GET Request: Work History fetched successfully');
            setWorkHistoryItem(workHistory)
        })

        fetchCertifications().then(certifications => {
            addLog('GET Request: Certifications fetched successfully');
            setCertifications(certifications)
        })  
    }, [])

    return (
        <div style={{height: '100vh'}}>
            <Canvas 
              camera={{ position: [0, 5, 10]}} 
              >
                <ambientLight intensity={2} />
                <pointLight position={[10, 10, 10]} />

                <BackgroundSetup />

                {/* Ground */}
                <mesh 
                    ref={groundRef}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -0.5, 1]} // Initial position
                >
                    <planeGeometry args={[100, 100]} /> Increased size to ensure visibility
                    <meshStandardMaterial color="lightgreen" />
                </mesh>

                {/* Player */}
                <Player ref={playerRef} position={[0, 0, 10]} />

                {/* Projects */}
                <group >
                <Text
                    color="black"
                    fontWeight={900}
                    position={[-8, 5, -7]}
                >
                    Projects
                </Text>
                {projects.map((project, index) => (
                    <ProjectCard 
                        key={project.id} 
                        position={[index * 5 - 9, 2, -7]} 
                        project={project}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => handleCardClick(e, project.url, 'Project')} 
                    />
                ))}
                </group>

                {/* Work History */}
                <group >
                <Text
                    color="black"
                    fontWeight={900}
                    position={[0, 5, -22]}
                >
                    Work History
                </Text>
                {workHistoryItem.map((wh, index) => (
                    <WorkHistoryCard 
                        key={wh.id} 
                        position={[index * 5 - 9, 2, -22]} 
                        workHistory={wh} 
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => handleCardClick(e, wh.url, 'Work History')}
                    />
                ))}
                </group>

                 {/* Certifications */}
                 <group >
                <Text
                    color="black"
                    fontWeight={900}
                    position={[15, 5, -40]}
                >
                    Certifications
                </Text>
                {certifications.map((cert, index) => (
                    <CertificationCard 
                        key={cert.id} 
                        position={[index * 6 - 9, 2, -40]} 
                        certification={cert}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => handleCardClick(e, cert.url, 'Certification')}
                    />
                ))}
                </group>

                {/* Scene Updater */}
                <SceneUpdater playerRef={playerRef} groundRef={groundRef} />

                <OrbitControls />

            </Canvas>

            <img src={LorenzoCodesIcon} alt="Lorenzo Codes Icon" style={{ position: 'absolute', bottom: '0px', left: '24px', width: '200px', }} />
            <Terminal 
                logs={logs}
                />
        </div>
    );
};

export default App;