'use client';

import React, { createContext, useContext, useState, useSyncExternalStore } from 'react';
import { StudentProfile, GeneratedProjectSuite } from '../types';
import { generateMockProjectSuite } from '../ai/mockDecisionEngine';
import { projectStore } from './projectStore';

interface ProjectContextType {
  profile: StudentProfile;
  setProfile: (profile: StudentProfile) => void;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  suite: GeneratedProjectSuite | null;
  selectedProjectIndex: number;
  setSelectedProjectIndex: (index: number) => void;
  isGenerating: boolean;
  generateProjectSuite: (customProfile?: StudentProfile) => Promise<boolean>;
  toggleMilestone: (week: number) => void;
  resetAll: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const store = useSyncExternalStore(
    projectStore.subscribe,
    projectStore.getSnapshot,
    projectStore.getServerSnapshot
  );

  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const setProfile = (newProfile: StudentProfile) => {
    projectStore.setState(prev => ({ ...prev, profile: newProfile }));
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    projectStore.setState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updates },
    }));
  };

  const setSelectedProjectIndex = (index: number) => {
    projectStore.setState(prev => ({ ...prev, selectedProjectIndex: index }));
  };

  const generateProjectSuite = async (customProfile?: StudentProfile): Promise<boolean> => {
    setIsGenerating(true);
    const targetProfile = customProfile || store.profile;

    try {
      const res = await fetch('/api/generate-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetProfile),
      });

      if (!res.ok) {
        throw new Error(`API error status ${res.status}`);
      }

      const data: GeneratedProjectSuite = await res.json();
      projectStore.setState(prev => ({
        ...prev,
        suite: data,
        selectedProjectIndex: 0,
      }));
      return true;
    } catch (err) {
      console.warn('Falling back to client-side deterministic engine:', err);
      const fallbackSuite = generateMockProjectSuite(targetProfile);
      projectStore.setState(prev => ({
        ...prev,
        suite: fallbackSuite,
        selectedProjectIndex: 0,
      }));
      return true;
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleMilestone = (week: number) => {
    if (!store.suite) return;
    projectStore.setState(prev => {
      if (!prev.suite) return prev;
      return {
        ...prev,
        suite: {
          ...prev.suite,
          developmentRoadmap: prev.suite.developmentRoadmap.map(m =>
            m.week === week ? { ...m, completed: !m.completed } : m
          ),
        },
      };
    });
  };

  const resetAll = () => {
    projectStore.reset();
  };

  return (
    <ProjectContext.Provider
      value={{
        profile: store.profile,
        setProfile,
        updateProfile,
        suite: store.suite,
        selectedProjectIndex: store.selectedProjectIndex,
        setSelectedProjectIndex,
        isGenerating,
        generateProjectSuite,
        toggleMilestone,
        resetAll,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
