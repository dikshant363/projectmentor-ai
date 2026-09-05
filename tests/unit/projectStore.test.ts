import { describe, test, expect, beforeEach, vi } from 'vitest';
import { projectStore } from '../../lib/context/projectStore';
import { DEFAULT_STUDENT_PROFILE } from '../../lib/constants/index';
import { generateMockProjectSuite } from '../../lib/ai/mockDecisionEngine';

describe('Unit: projectStore (External Store & Persistence)', () => {
  beforeEach(() => {
    localStorage.clear();
    projectStore.reset();
  });

  test('provides valid server snapshot with default profile', () => {
    const serverSnap = projectStore.getServerSnapshot();
    expect(serverSnap.profile).toEqual(DEFAULT_STUDENT_PROFILE);
    expect(serverSnap.suite).toBeNull();
    expect(serverSnap.selectedProjectIndex).toBe(0);
  });

  test('initializes client snapshot and synchronizes with localStorage', () => {
    const initialSnap = projectStore.getSnapshot();
    expect(initialSnap.profile).toBeDefined();
    expect(initialSnap.selectedProjectIndex).toBe(0);
  });

  test('updates profile in state and persists to localStorage', () => {
    projectStore.setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        branch: 'Mechanical Engineering',
      },
    }));

    const updated = projectStore.getSnapshot();
    expect(updated.profile.branch).toBe('Mechanical Engineering');
    expect(localStorage.getItem('projectmentor_profile')).toContain('Mechanical Engineering');
  });

  test('sets and persists generated project suite', () => {
    const suite = generateMockProjectSuite(DEFAULT_STUDENT_PROFILE);
    projectStore.setState((prev) => ({
      ...prev,
      suite,
      selectedProjectIndex: 2,
    }));

    const updated = projectStore.getSnapshot();
    expect(updated.suite).toBeDefined();
    expect(updated.suite?.recommendedProjects.length).toBe(5);
    expect(updated.selectedProjectIndex).toBe(2);
    expect(localStorage.getItem('projectmentor_selected_idx')).toBe('2');
  });

  test('notifies subscribers on state changes and allows unsubscription', () => {
    const listener = vi.fn();
    const unsubscribe = projectStore.subscribe(listener);

    projectStore.setState((prev) => ({
      ...prev,
      selectedProjectIndex: 1,
    }));

    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();

    projectStore.setState((prev) => ({
      ...prev,
      selectedProjectIndex: 3,
    }));

    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('reset clears state and removes storage items', () => {
    const suite = generateMockProjectSuite(DEFAULT_STUDENT_PROFILE);
    projectStore.setState((prev) => ({
      ...prev,
      suite,
      selectedProjectIndex: 4,
    }));

    projectStore.reset();

    const resetSnap = projectStore.getSnapshot();
    expect(resetSnap.suite).toBeNull();
    expect(resetSnap.selectedProjectIndex).toBe(0);
    expect(localStorage.getItem('projectmentor_suite')).toBeNull();
  });
});
