import React, { useEffect, useRef } from 'react';

interface LogEntry {
    message: string;
    timestamp: string;
}

interface TerminalProps {
    logs: LogEntry[];
}

const Terminal: React.FC<TerminalProps> = ({ logs }) => {
    const logsRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom whenever logs change
    useEffect(() => {
        if (logsRef.current) {
            logsRef.current.scrollTo({
                top: logsRef.current.scrollHeight,
                behavior: 'smooth'  // Optional: makes scrolling smooth instead of instant
            });
        }
    }, [logs]);

    return (
        <div 
            style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                width: '50%',
                height: '20%',
                backgroundColor: '#1A1A1A',
                borderRadius: '10px',
                padding: '10px',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                border: '1px solid #404040',
                overflow: 'hidden'
            }}
        >
            {/* Title Bar */}
            <div 
                style={{
                    backgroundColor: '#404040',
                    height: '20px',
                    borderRadius: '5px 5px 0 0',
                    margin: '-10px -10px 10px -10px',
                }}
            />
            
            {/* Logs */}
            <div ref={logsRef} style={{ color: '#00FF00', fontFamily: 'monospace', fontSize: '12px', overflowY: 'scroll', height: '90%' }}>
                {logs.map((log, index) => (
                    <div key={`${log.timestamp}-${index}`}>
                        {`${log.timestamp}: ${log.message}`}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Terminal;