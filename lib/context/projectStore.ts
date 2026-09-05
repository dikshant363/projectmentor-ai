import { StudentProfile, GeneratedProjectSuite } from '@/lib/types';
import { DEFAULT_STUDENT_PROFILE } from '@/lib/constants';

export interface ProjectStoreState {
  profile: StudentProfile;
  suite: GeneratedProjectSuite | null;
  selectedProjectIndex: number;
}

const serverState: ProjectStoreState = {
  profile: DEFAULT_STUDENT_PROFILE,
  suite: null,
  selectedProjectIndex: 0,
};

let clientState: ProjectStoreState = serverState;
let hasInitialized = false;

function initClientState(): ProjectStoreState {
  if (typeof window === 'undefined') return serverState;
  if (!hasInitialized) {
    hasInitialized = true;
    try {
      const savedProf = localStorage.getItem('projectmentor_profile');
      const savedSuite = localStorage.getItem('projectmentor_suite');
      const savedIdx = localStorage.getItem('projectmentor_selected_idx');
      clientState = {
        profile: savedProf ? JSON.parse(savedProf) : DEFAULT_STUDENT_PROFILE,
        suite: savedSuite ? JSON.parse(savedSuite) : null,
        selectedProjectIndex: savedIdx ? parseInt(savedIdx, 10) : 0,
      };
    } catch (e) {
      console.warn('Could not read store from localStorage:', e);
    }
  }
  return clientState;
}

const listeners = new Set<() => void>();

export const projectStore = {
  getSnapshot(): ProjectStoreState {
    return initClientState();
  },
  getServerSnapshot(): ProjectStoreState {
    return serverState;
  },
  subscribe(callback: () => void): () => void {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },
  setState(updater: (prev: ProjectStoreState) => ProjectStoreState) {
    const current = initClientState();
    const next = updater(current);
    clientState = next;
    try {
      localStorage.setItem('projectmentor_profile', JSON.stringify(next.profile));
      if (next.suite) {
        localStorage.setItem('projectmentor_suite', JSON.stringify(next.suite));
      } else {
        localStorage.removeItem('projectmentor_suite');
      }
      localStorage.setItem('projectmentor_selected_idx', next.selectedProjectIndex.toString());
    } catch (e) {
      console.warn('Could not write store to localStorage:', e);
    }
    listeners.forEach((l) => l());
  },
  reset() {
    clientState = {
      profile: DEFAULT_STUDENT_PROFILE,
      suite: null,
      selectedProjectIndex: 0,
    };
    try {
      localStorage.removeItem('projectmentor_profile');
      localStorage.removeItem('projectmentor_suite');
      localStorage.removeItem('projectmentor_selected_idx');
    } catch (e) {
      console.warn('Could not clear store in localStorage:', e);
    }
    listeners.forEach((l) => l());
  },
};
