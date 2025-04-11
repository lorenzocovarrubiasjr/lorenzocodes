import axios from 'axios'
import { Project } from '../types/Project'
import { WorkHistoryItem } from '../types/WorkHistoryItem';
import { Certification } from '../types/Certification';

export const fetchProjects = async () => 
    await axios.get<Project[]>('http://lorenzocodesapi-env.eba-jxtdemfs.us-west-2.elasticbeanstalk.com/projects')
    .then(response => response.data)
    .catch(error => {console.log(`Error fetching projects: ${error}`); return []})

export const fetchWorkHistory = async () => 
    await axios.get<WorkHistoryItem[]>('http://lorenzocodesapi-env.eba-jxtdemfs.us-west-2.elasticbeanstalk.com/workhistory')
    .then(response => response.data)
    .catch(error => {console.log(`Error fetching work history: ${error}`); return []});

export const fetchCertifications = async () => 
    await axios.get<Certification[]>('http://lorenzocodesapi-env.eba-jxtdemfs.us-west-2.elasticbeanstalk.com/certifications')
    .then(response => response.data)
    .catch(error => {console.log(`Error fetching certifications: ${error}`); return []});
