'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile, GeneratedProjectSuite } from '../types';
import { DEFAULT_STUDENT_PROFILE } from '../constants';
import { generateMockProjectSuite } from '../ai/mockDecisionEngine';

interface ProjectContextType {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
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
  const [profile, setProfile] = useState<StudentProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('projectmentor_profile');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Could not read profile from storage:', e);
      }
    }
    return DEFAULT_STUDENT_PROFILE;
  });

  const [suite, setSuite] = useState<GeneratedProjectSuite | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('projectmentor_suite');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Could not read suite from storage:', e);
      }
    }
    return null;
  });

  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('projectmentor_selected_idx');
        if (saved) return parseInt(saved, 10);
      } catch (e) {
        console.warn('Could not read index from storage:', e);
      }
    }
    return 0;
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Sync to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem('projectmentor_profile', JSON.stringify(profile));
    } catch (e) {
      console.warn('Could not save profile to localStorage:', e);
    }
  }, [profile]);

  useEffect(() => {
    if (suite) {
      try {
        localStorage.setItem('projectmentor_suite', JSON.stringify(suite));
      } catch (e) {
        console.warn('Could not save suite to localStorage:', e);
      }
    }
  }, [suite]);

  useEffect(() => {
    try {
      localStorage.setItem('projectmentor_selected_idx', selectedProjectIndex.toString());
    } catch (e) {
      console.warn('Could not save index to localStorage:', e);
    }
  }, [selectedProjectIndex]);

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const generateProjectSuite = async (customProfile?: StudentProfile): Promise<boolean> => {
    setIsGenerating(true);
    const targetProfile = customProfile || profile;

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
      setSuite(data);
      setSelectedProjectIndex(0);
      return true;
    } catch (err) {
      console.warn('Falling back to client-side deterministic engine:', err);
      const fallbackSuite = generateMockProjectSuite(targetProfile);
      setSuite(fallbackSuite);
      setSelectedProjectIndex(0);
      return true;
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleMilestone = (week: number) => {
    if (!suite) return;
    setSuite(prev => {
      if (!prev) return null;
      return {
        ...prev,
        developmentRoadmap: prev.developmentRoadmap.map(m =>
          m.week === week ? { ...m, completed: !m.completed } : m
        ),
      };
    });
  };

  const resetAll = () => {
    setProfile(DEFAULT_STUDENT_PROFILE);
    setSuite(null);
    setSelectedProjectIndex(0);
    try {
      localStorage.removeItem('projectmentor_profile');
      localStorage.removeItem('projectmentor_suite');
      localStorage.removeItem('projectmentor_selected_idx');
    } catch (e) {
      console.warn('Could not clear localStorage:', e);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        profile,
        setProfile,
        updateProfile,
        suite,
        selectedProjectIndex,
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
