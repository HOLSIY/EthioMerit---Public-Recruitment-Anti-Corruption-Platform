export type UserRole = 
  | 'PUBLIC'
  | 'CANDIDATE'
  | 'RECRUITMENT_OFFICER'
  | 'EXAM_ADMIN'
  | 'AUDITOR'
  | 'COMPLIANCE_OFFICER'
  | 'SYSTEM_SECURITY_ADMIN'
  | 'WHISTLEBLOWER';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution?: string;
  candidateId?: string; // e.g. ETH-2026-004821
  mfaEnabled: boolean;
}

export interface QualificationRequirement {
  degreeField: string;
  minGpa: number;
  minYearsExperience: number;
  certificationsRequired: string[];
}

export interface ScoreWeights {
  writtenExamPercent: number; // e.g. 50
  technicalAssessmentPercent: number; // e.g. 30
  interviewPercent: number; // e.g. 20
  lockedAt?: string;
  lockedBy?: string;
}

export interface Vacancy {
  id: string;
  title: string;
  institution: string; // e.g. "Ministry of Innovation and Technology (MInT)"
  category: string;
  location: string;
  availablePositions: number; // e.g. 2
  maxExamCapacity: number; // e.g. 3000
  registeredCount: number;
  status: 'DRAFT' | 'APPROVED' | 'REGISTRATION_OPEN' | 'REGISTRATION_CLOSED' | 'EXAM_IN_PROGRESS' | 'EVALUATION' | 'PUBLISHED' | 'ARCHIVED';
  requirements: QualificationRequirement;
  scoreWeights: ScoreWeights;
  openingDate: string;
  closingDate: string;
  approvedByOfficer1?: string;
  approvedByOfficer2?: string;
  digitalSignature?: string;
  description: string;
}

export interface CandidateApplication {
  id: string;
  candidateId: string; // Anonymous ID e.g. ETH-2026-004821
  vacancyId: string;
  vacancyTitle: string;
  candidateFullName: string; // Masked during exam evaluation
  email: string;
  phone: string;
  degreeField: string;
  university: string;
  gpa: number;
  yearsExperience: number;
  status: 'PENDING_ELIGIBILITY' | 'ELIGIBLE' | 'INELIGIBLE' | 'EXAM_COMPLETED' | 'SELECTED' | 'WAITLISTED' | 'REJECTED';
  eligibilityReason?: string;
  writtenScore?: number; // Out of 100
  technicalScore?: number; // Out of 100
  interviewScore?: number; // Out of 100
  weightedScore?: number;
  rank?: number;
  appliedAt: string;
  examStartedAt?: string;
  examSubmittedAt?: string;
  receiptHash: string; // Cryptographic proof of submission
}

export interface ExamQuestion {
  id: string;
  vacancyCategory: string;
  competency: string; // e.g., "Algorithms & Data Structures"
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  aiGenerated: boolean;
  biasChecked: boolean;
  qualityValidated: boolean;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  explanation: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorRole: UserRole;
  actorId: string;
  actorName: string;
  action: string; // e.g. "VACANCY_CAPACITY_LOCKED", "SCORE_EVALUATION_FINALIZED"
  resourceType: 'VACANCY' | 'CANDIDATE' | 'EXAM' | 'SYSTEM' | 'WHISTLEBLOWER';
  resourceId: string;
  details: string;
  previousValue?: string;
  newValue?: string;
  ipAddress: string;
  previousHash: string;
  hash: string; // Current SHA-256 hash chaining
  tamperProofVerified: boolean;
}

export interface FraudAlert {
  id: string;
  timestamp: string;
  candidateId: string;
  anomalyType: 'DUPLICATE_REGISTRATION' | 'IP_CLUSTER_ABUSE' | 'IMPOSSIBLE_EXAM_SPEED' | 'UNAUTHORIZED_SCORE_CHANGE_ATTEMPT' | 'BOT_BEHAVIOR';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  confidenceScore: number; // 0 to 1
  status: 'PENDING_REVIEW' | 'FLAGGED' | 'CLEARED' | 'DISQUALIFIED';
  reviewedBy?: string;
}

export interface WhistleblowerReport {
  id: string; // e.g. WB-2026-9812
  trackingCode: string; // Given to user to check anonymously
  timestamp: string;
  allegationType: 'EXTORTION_SOLICITATION' | 'FAVORITISM' | 'DOCUMENT_FORGERY' | 'EXAM_LEAK' | 'SYSTEM_TAMPERING';
  vacancyTitle?: string;
  accusedPerson?: string;
  details: string;
  status: 'RECEIVED' | 'UNDER_INVESTIGATION' | 'VERIFIED' | 'DISMISSED';
  investigatorNotes?: string;
}

export interface AppealCase {
  id: string;
  candidateId: string;
  candidateName: string;
  vacancyTitle: string;
  appealType: 'ELIGIBILITY_REJECTION' | 'TECHNICAL_GRADING_DISPUTE' | 'PROCEDURAL_VIOLATION' | 'SYSTEM_ERROR';
  submissionDate: string;
  justification: string;
  status: 'SUBMITTED' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';
  reviewDeadline: string;
  resolutionNotes?: string;
}

export interface ConcurrencySimResult {
  totalAttempted: number;
  capacityLimit: number;
  successfulRegistrations: number;
  rejectedDueToLimit: number;
  rejectedDuplicates: number;
  p99LatencyMs: number;
  raceConditionsDetected: number;
  atomicLockSuccess: boolean;
}
