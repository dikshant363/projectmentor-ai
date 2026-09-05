'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, ArrowLeft, Check, Compass, Code, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { ProgressIndicator } from '@/components/ui/ProgressIndicator';
import { useProject } from '@/lib/context/ProjectContext';
import {
  BRANCH_OPTIONS,
  DOMAIN_OPTIONS,
  SKILL_OPTIONS,
  CAREER_GOALS,
} from '@/lib/constants';
import { validateStudentProfile } from '@/lib/validation/profileSchema';

export default function ProfilePage() {
  const router = useRouter();
  const { profile, updateProfile, generateProjectSuite, isGenerating } = useProject();
  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customSkill, setCustomSkill] = useState('');

  const stepLabels = [
    'Academic & Domain Interests',
    'Technical Skills & Level',
    'Timeline & Career Target',
  ];

  const handleNext = () => {
    if (step === 1) {
      if (!profile.branch) {
        setErrors({ branch: 'Please select your engineering discipline' });
        return;
      }
      if (profile.interests.length === 0) {
        setErrors({ interests: 'Please choose at least one interest area' });
        return;
      }
      setErrors({});
      setStep(2);
    } else if (step === 2) {
      if (profile.currentSkills.length === 0) {
        setErrors({ currentSkills: 'Please select at least one technology or skill' });
        return;
      }
      setErrors({});
      setStep(3);
    }
  };

  const handlePrev = () => {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleToggleInterest = (domain: string) => {
    const exists = profile.interests.includes(domain);
    const newInterests = exists
      ? profile.interests.filter((i) => i !== domain)
      : [...profile.interests, domain];
    updateProfile({ interests: newInterests, preferredDomains: newInterests });
    if (errors.interests) setErrors((prev) => ({ ...prev, interests: '' }));
  };

  const handleToggleSkill = (skill: string) => {
    const exists = profile.currentSkills.includes(skill);
    const newSkills = exists
      ? profile.currentSkills.filter((s) => s !== skill)
      : [...profile.currentSkills, skill];
    updateProfile({ currentSkills: newSkills });
    if (errors.currentSkills) setErrors((prev) => ({ ...prev, currentSkills: '' }));
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkill.trim() && !profile.currentSkills.includes(customSkill.trim())) {
      updateProfile({ currentSkills: [...profile.currentSkills, customSkill.trim()] });
      setCustomSkill('');
      if (errors.currentSkills) setErrors((prev) => ({ ...prev, currentSkills: '' }));
    }
  };

  const handleSubmit = async () => {
    const validation = validateStudentProfile(profile);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const success = await generateProjectSuite();
    if (success) {
      router.push('/recommendations');
    }
  };

  return (
    <div className="w-full bg-[#f5f5f7] min-h-[calc(100vh-96px)] py-12 px-4 sm:px-8">
      <div className="max-w-[800px] mx-auto">
        {/* Header Title */}
        <div className="text-center mb-8">
          <span className="text-[12px] uppercase tracking-[0.2em] text-[#0066cc] font-semibold block mb-2">
            Step {step} of 3
          </span>
          <h1 className="font-display-lg text-[#1d1d1f] tracking-tight">
            Student Profiler
          </h1>
          <p className="text-[15px] text-[#7a7a7a] mt-2">
            Provide your academic profile so our decision engine can generate personalized, feasibility-tested ideas.
          </p>
        </div>

        {/* Progress bar */}
        <div className="bg-white border border-[#e0e0e0] rounded-[18px] p-6 mb-8">
          <ProgressIndicator currentStep={step} totalSteps={3} stepLabels={stepLabels} />
        </div>

        {/* STEP 1: Academic Discipline & Interests */}
        {step === 1 && (
          <Card variant="utility" className="p-8 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Compass className="w-5 h-5 text-[#0066cc]" />
                <h2 className="text-[20px] font-semibold text-[#1d1d1f]">
                  Engineering Discipline / Branch
                </h2>
              </div>
              <p className="text-[14px] text-[#7a7a7a] mb-4">
                Select your current major so we align project outcomes with department expectations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BRANCH_OPTIONS.map((branch) => {
                  const isSelected = profile.branch === branch;
                  return (
                    <button
                      key={branch}
                      type="button"
                      onClick={() => {
                        updateProfile({ branch });
                        if (errors.branch) setErrors((prev) => ({ ...prev, branch: '' }));
                      }}
                      className={`text-left p-3.5 rounded-[11px] border text-[14px] transition-all duration-150 btn-apple-active ${
                        isSelected
                          ? 'border-[#0071e3] bg-[#0066cc]/5 text-[#0066cc] font-medium'
                          : 'border-[#e0e0e0] bg-white text-[#1d1d1f] hover:border-[#cccccc]'
                      }`}
                    >
                      {branch}
                    </button>
                  );
                })}
              </div>
              {errors.branch && (
                <p className="text-[12px] text-[#d93025] mt-2 font-medium">{errors.branch}</p>
              )}
            </div>

            <div className="pt-6 border-t border-[#f0f0f0]">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-[#0066cc]" />
                <h2 className="text-[20px] font-semibold text-[#1d1d1f]">
                  Domains of Interest
                </h2>
              </div>
              <p className="text-[14px] text-[#7a7a7a] mb-4">
                Choose the specializations you are enthusiastic about building in.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {DOMAIN_OPTIONS.map((domain) => {
                  const isSelected = profile.interests.includes(domain);
                  return (
                    <Chip
                      key={domain}
                      selected={isSelected}
                      onToggle={() => handleToggleInterest(domain)}
                    >
                      {domain}
                    </Chip>
                  );
                })}
              </div>
              {errors.interests && (
                <p className="text-[12px] text-[#d93025] mt-2 font-medium">{errors.interests}</p>
              )}
            </div>
          </Card>
        )}

        {/* STEP 2: Technical Skills & Experience */}
        {step === 2 && (
          <Card variant="utility" className="p-8 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-5 h-5 text-[#0066cc]" />
                <h2 className="text-[20px] font-semibold text-[#1d1d1f]">
                  Existing Technical Arsenal
                </h2>
              </div>
              <p className="text-[14px] text-[#7a7a7a] mb-4">
                Select tools, frameworks, and languages you are comfortable with.
              </p>

              <div className="flex flex-wrap gap-2.5 mb-6">
                {SKILL_OPTIONS.map((skill) => {
                  const isSelected = profile.currentSkills.includes(skill);
                  return (
                    <Chip
                      key={skill}
                      selected={isSelected}
                      onToggle={() => handleToggleSkill(skill)}
                    >
                      {skill}
                    </Chip>
                  );
                })}
              </div>

              {/* Add custom skill input */}
              <form onSubmit={handleAddCustomSkill} className="flex gap-2 max-w-[420px]">
                <input
                  type="text"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  placeholder="Add another tool/framework..."
                  className="flex-1 text-[14px] px-4 py-2 bg-white border border-[#e0e0e0] rounded-full outline-none focus:border-[#0071e3]"
                />
                <Button type="submit" variant="secondary-pill" size="sm">
                  Add
                </Button>
              </form>

              {errors.currentSkills && (
                <p className="text-[12px] text-[#d93025] mt-2 font-medium">{errors.currentSkills}</p>
              )}
            </div>

            <div className="pt-6 border-t border-[#f0f0f0]">
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">
                Overall Experience Level
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => {
                  const isSelected = profile.experienceLevel === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => updateProfile({ experienceLevel: level })}
                      className={`py-3 px-4 rounded-[11px] border text-center text-[14px] transition-all duration-150 btn-apple-active ${
                        isSelected
                          ? 'border-[#0071e3] bg-[#0066cc]/5 text-[#0066cc] font-medium'
                          : 'border-[#e0e0e0] bg-white text-[#1d1d1f] hover:border-[#cccccc]'
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-[#f0f0f0]">
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">
                Development Style Preferences
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <label className="flex items-center gap-2.5 p-3 rounded-[11px] border border-[#e0e0e0] bg-white cursor-pointer text-[13px] text-[#1d1d1f]">
                  <input
                    type="checkbox"
                    checked={profile.likesAI}
                    onChange={(e) => updateProfile({ likesAI: e.target.checked })}
                    className="accent-[#0066cc] w-4 h-4 rounded"
                  />
                  <span>AI & ML</span>
                </label>
                <label className="flex items-center gap-2.5 p-3 rounded-[11px] border border-[#e0e0e0] bg-white cursor-pointer text-[13px] text-[#1d1d1f]">
                  <input
                    type="checkbox"
                    checked={profile.likesBackend}
                    onChange={(e) => updateProfile({ likesBackend: e.target.checked })}
                    className="accent-[#0066cc] w-4 h-4 rounded"
                  />
                  <span>Backend APIs</span>
                </label>
                <label className="flex items-center gap-2.5 p-3 rounded-[11px] border border-[#e0e0e0] bg-white cursor-pointer text-[13px] text-[#1d1d1f]">
                  <input
                    type="checkbox"
                    checked={profile.likesDesign}
                    onChange={(e) => updateProfile({ likesDesign: e.target.checked })}
                    className="accent-[#0066cc] w-4 h-4 rounded"
                  />
                  <span>Frontend / UX</span>
                </label>
                <label className="flex items-center gap-2.5 p-3 rounded-[11px] border border-[#e0e0e0] bg-white cursor-pointer text-[13px] text-[#1d1d1f]">
                  <input
                    type="checkbox"
                    checked={profile.likesResearch}
                    onChange={(e) => updateProfile({ likesResearch: e.target.checked })}
                    className="accent-[#0066cc] w-4 h-4 rounded"
                  />
                  <span>Paper Research</span>
                </label>
              </div>
            </div>
          </Card>
        )}

        {/* STEP 3: Timeline & Strategic Goals */}
        {step === 3 && (
          <Card variant="utility" className="p-8 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-[#0066cc]" />
                <h2 className="text-[20px] font-semibold text-[#1d1d1f]">
                  Timeline & Commitment
                </h2>
              </div>
              <p className="text-[14px] text-[#7a7a7a] mb-6">
                Accurate time constraints allow the decision engine to bound scope and prevent project delays.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between text-[14px] mb-2 font-medium text-[#1d1d1f]">
                    <span>Available Semester Months</span>
                    <span className="text-[#0066cc] font-semibold">{profile.availableMonths} Months</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={profile.availableMonths}
                    onChange={(e) => updateProfile({ availableMonths: parseInt(e.target.value, 10) })}
                    className="w-full accent-[#0066cc] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#7a7a7a] mt-1">
                    <span>1 Month (Express)</span>
                    <span>4 Months (Standard)</span>
                    <span>8 Months (Full Year)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[14px] mb-2 font-medium text-[#1d1d1f]">
                    <span>Weekly Commitment</span>
                    <span className="text-[#0066cc] font-semibold">{profile.weeklyHours} Hours/Week</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="5"
                    value={profile.weeklyHours}
                    onChange={(e) => updateProfile({ weeklyHours: parseInt(e.target.value, 10) })}
                    className="w-full accent-[#0066cc] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#7a7a7a] mt-1">
                    <span>5 hrs (Light)</span>
                    <span>15–20 hrs (Recommended)</span>
                    <span>40 hrs (Intensive)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#f0f0f0]">
              <h2 className="text-[20px] font-semibold text-[#1d1d1f] mb-2">
                Primary Career Destination
              </h2>
              <p className="text-[14px] text-[#7a7a7a] mb-4">
                We calibrate architectural choices to maximize the project&apos;s impact during technical interviews.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CAREER_GOALS.map((goal) => {
                  const isSelected = profile.careerGoal === goal.id;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => updateProfile({ careerGoal: goal.id })}
                      className={`text-left p-4 rounded-[11px] border transition-all duration-150 btn-apple-active ${
                        isSelected
                          ? 'border-[#0071e3] bg-[#0066cc]/5'
                          : 'border-[#e0e0e0] bg-white hover:border-[#cccccc]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[15px] font-semibold ${isSelected ? 'text-[#0066cc]' : 'text-[#1d1d1f]'}`}>
                          {goal.label}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#0066cc]" />}
                      </div>
                      <p className="text-[12px] text-[#7a7a7a] leading-normal">
                        {goal.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        {/* Navigation CTAs */}
        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <Button variant="secondary-pill" onClick={handlePrev}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Step
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button variant="primary" onClick={handleNext}>
              Continue to Step {step + 1}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              isLoading={isGenerating}
              onClick={handleSubmit}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate 5 Tailored Projects
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
