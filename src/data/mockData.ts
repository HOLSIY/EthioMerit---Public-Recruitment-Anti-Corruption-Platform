import { Vacancy, CandidateApplication, ExamQuestion, AuditLogEntry, FraudAlert, WhistleblowerReport, AppealCase } from '../types';

export const INITIAL_VACANCIES: Vacancy[] = [
  {
    id: 'VAC-ETH-2026-001',
    title: 'Senior Software Systems Engineer',
    institution: 'Ministry of Innovation and Technology (MInT)',
    category: 'Information Technology',
    location: 'Addis Ababa, Ethiopia',
    availablePositions: 2,
    maxExamCapacity: 3000,
    registeredCount: 2998,
    status: 'REGISTRATION_OPEN',
    requirements: {
      degreeField: 'Computer Science / Software Engineering',
      minGpa: 3.2,
      minYearsExperience: 2,
      certificationsRequired: ['Software Engineering Fundamentals'],
    },
    scoreWeights: {
      writtenExamPercent: 50,
      technicalAssessmentPercent: 30,
      interviewPercent: 20,
      lockedAt: '2026-08-01T09:00:00Z',
      lockedBy: 'Compliance_Officer_MInT',
    },
    openingDate: '2026-08-01',
    closingDate: '2026-08-20',
    approvedByOfficer1: 'MInT_Director_General',
    approvedByOfficer2: 'CivilService_Commission_Auditor',
    digitalSignature: 'RSA-SHA256-4b89f0e1a89c02d18471e9a',
    description: 'Responsible for leading digital transformation projects, designing secure cloud systems, and maintaining high-availability e-government web applications for Ethiopia.'
  },
  {
    id: 'VAC-ETH-2026-002',
    title: 'Senior Tax Compliance Auditor',
    institution: 'Ministry of Revenue (MOR)',
    category: 'Finance & Audit',
    location: 'Addis Ababa / Regional Offices',
    availablePositions: 5,
    maxExamCapacity: 1500,
    registeredCount: 1500,
    status: 'REGISTRATION_CLOSED',
    requirements: {
      degreeField: 'Accounting and Finance / Economics',
      minGpa: 3.0,
      minYearsExperience: 3,
      certificationsRequired: ['ACCA / CPA Foundation'],
    },
    scoreWeights: {
      writtenExamPercent: 60,
      technicalAssessmentPercent: 25,
      interviewPercent: 15,
      lockedAt: '2026-07-15T08:00:00Z',
      lockedBy: 'Compliance_MOR',
    },
    openingDate: '2026-07-15',
    closingDate: '2026-08-10',
    approvedByOfficer1: 'MOR_Recruitment_Head',
    approvedByOfficer2: 'Ethics_AntiCorruption_Officer',
    digitalSignature: 'RSA-SHA256-9a0081d2f8e120194bc0281',
    description: 'Conducted impartial forensic financial audits, tax law compliance verification, and anti-tax evasion risk analysis.'
  },
  {
    id: 'VAC-ETH-2026-003',
    title: 'Public Health Data Analyst',
    institution: 'Ethiopian Public Health Institute (EPHI)',
    category: 'Healthcare & Research',
    location: 'Addis Ababa, Ethiopia',
    availablePositions: 3,
    maxExamCapacity: 2000,
    registeredCount: 1240,
    status: 'REGISTRATION_OPEN',
    requirements: {
      degreeField: 'Public Health / Biostatistics / Health Informatics',
      minGpa: 3.1,
      minYearsExperience: 1,
      certificationsRequired: ['Epidemiological Survey Methodology'],
    },
    scoreWeights: {
      writtenExamPercent: 50,
      technicalAssessmentPercent: 30,
      interviewPercent: 20,
      lockedAt: '2026-08-05T10:00:00Z',
      lockedBy: 'EPHI_Ethics_Lead',
    },
    openingDate: '2026-08-05',
    closingDate: '2026-08-25',
    approvedByOfficer1: 'EPHI_Research_Director',
    approvedByOfficer2: 'Federal_CivilService_Auditor',
    digitalSignature: 'RSA-SHA256-3c7711200fa23e1927bbca',
    description: 'Analyze national health surveillance metrics, build disease predictive models, and prepare epidemiological reports.'
  }
];

export const INITIAL_CANDIDATES: CandidateApplication[] = [
  {
    id: 'APP-001',
    candidateId: 'ETH-2026-004821',
    vacancyId: 'VAC-ETH-2026-001',
    vacancyTitle: 'Senior Software Systems Engineer',
    candidateFullName: 'Kaleb Worku Desta',
    email: 'kaleb.worku@ethio.edu.et',
    phone: '+251 91 123 4567',
    degreeField: 'Software Engineering',
    university: 'Addis Ababa University',
    gpa: 3.85,
    yearsExperience: 3,
    status: 'EXAM_COMPLETED',
    eligibilityReason: 'Meets degree requirement (Software Engineering) and GPA threshold (3.85 >= 3.2). Verified 3 years relevant experience.',
    writtenScore: 92,
    technicalScore: 95,
    interviewScore: 88,
    weightedScore: 92.1,
    rank: 1,
    appliedAt: '2026-08-02T10:14:22Z',
    examStartedAt: '2026-08-12T09:00:00Z',
    examSubmittedAt: '2026-08-12T09:42:15Z',
    receiptHash: 'SHA256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'APP-002',
    candidateId: 'ETH-2026-004822',
    vacancyId: 'VAC-ETH-2026-001',
    vacancyTitle: 'Senior Software Systems Engineer',
    candidateFullName: 'Saron Hailu Tesfaye',
    email: 'saron.hailu@aastu.edu.et',
    phone: '+251 92 234 5678',
    degreeField: 'Computer Science',
    university: 'Addis Ababa Science and Technology University (AASTU)',
    gpa: 3.78,
    yearsExperience: 2,
    status: 'EXAM_COMPLETED',
    eligibilityReason: 'Degree in Computer Science matches requirements. GPA 3.78 >= 3.2.',
    writtenScore: 89,
    technicalScore: 92,
    interviewScore: 90,
    weightedScore: 90.1,
    rank: 2,
    appliedAt: '2026-08-02T10:15:01Z',
    examStartedAt: '2026-08-12T09:00:00Z',
    examSubmittedAt: '2026-08-12T09:45:00Z',
    receiptHash: 'SHA256-8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4'
  },
  {
    id: 'APP-003',
    candidateId: 'ETH-2026-004823',
    vacancyId: 'VAC-ETH-2026-001',
    vacancyTitle: 'Senior Software Systems Engineer',
    candidateFullName: 'Bruk Assefa Bekele',
    email: 'bruk.assefa@gmail.com',
    phone: '+251 93 345 6789',
    degreeField: 'Civil Engineering',
    university: 'Adama Science and Technology University (ASTU)',
    gpa: 3.50,
    yearsExperience: 4,
    status: 'INELIGIBLE',
    eligibilityReason: 'Degree field (Civil Engineering) does not match mandatory vacancy criteria (Computer Science / Software Engineering).',
    appliedAt: '2026-08-03T11:20:00Z',
    receiptHash: 'SHA256-140a33118ef8648c08123bf018a14d59a24446e10228800ba83433503f8373a0'
  }
];

export const INITIAL_EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 'Q-IT-001',
    vacancyCategory: 'Information Technology',
    competency: 'System Architecture & Concurrency',
    questionText: 'In a high-concurrency recruitment application with 100,000 simultaneous users, which mechanism prevents race conditions when updating the remaining capacity limit?',
    options: [
      'Client-side JavaScript validation',
      'Atomic database transaction with SELECT FOR UPDATE or Redis DECRBY lock',
      'Periodic background cron worker checking count',
      'Increasing web server memory'
    ],
    correctOptionIndex: 1,
    difficulty: 'HARD',
    aiGenerated: true,
    biasChecked: true,
    qualityValidated: true,
    status: 'APPROVED',
    explanation: 'Atomic transactions or Redis operations guarantee single-execution isolation at the database level, preventing multiple threads from concurrently exceeding the capacity limit.'
  },
  {
    id: 'Q-IT-002',
    vacancyCategory: 'Information Technology',
    competency: 'Cybersecurity & Auditability',
    questionText: 'Which cryptographic structure ensures that recruitment audit logs cannot be altered retroactively without detection?',
    options: [
      'Symmetric AES-128 encryption',
      'Cryptographic hash chain where each log entry includes the SHA-256 hash of the previous log entry',
      'Compressing logs into a ZIP archive',
      'Storing logs in a standard SQL database without constraints'
    ],
    correctOptionIndex: 1,
    difficulty: 'MEDIUM',
    aiGenerated: true,
    biasChecked: true,
    qualityValidated: true,
    status: 'APPROVED',
    explanation: 'Hash chaining creates an append-only sequence where altering any historical entry invalidates all subsequent hash signatures in the chain.'
  },
  {
    id: 'Q-IT-003',
    vacancyCategory: 'Information Technology',
    competency: 'RESTful API & Security',
    questionText: 'What is the primary security flaw of exposing raw database query parameters directly to frontend applications?',
    options: [
      'Increases network latency',
      'Exposes the application to SQL Injection (SQLi) attacks',
      'Requires additional CSS styling',
      'Prevents JSON formatting'
    ],
    correctOptionIndex: 1,
    difficulty: 'EASY',
    aiGenerated: true,
    biasChecked: true,
    qualityValidated: true,
    status: 'APPROVED',
    explanation: 'Unsanitized user inputs concatenated into database queries allow attackers to manipulate execution commands and bypass access controls.'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'LOG-1001',
    timestamp: '2026-08-01T09:00:00Z',
    actorRole: 'COMPLIANCE_OFFICER',
    actorId: 'COMP-MInT-01',
    actorName: 'Tewodros Girma (Compliance Lead)',
    action: 'LOCK_VACANCY_WEIGHTS',
    resourceType: 'VACANCY',
    resourceId: 'VAC-ETH-2026-001',
    details: 'Locked score evaluation weights (Written 50%, Tech 30%, Interview 20%) before candidate registration opened.',
    previousValue: 'Unset',
    newValue: '50/30/20 Locked',
    ipAddress: '197.156.64.12',
    previousHash: 'GENESIS_BLOCK_ETHIO_MERIT_2026_00000000000000000000000000000000',
    hash: 'a3d4f82910c2847592318490a120485d921b0e7821c90082f1b4902882a19283',
    tamperProofVerified: true
  },
  {
    id: 'LOG-1002',
    timestamp: '2026-08-01T10:15:00Z',
    actorRole: 'RECRUITMENT_OFFICER',
    actorId: 'REC-MInT-04',
    actorName: 'Abeba Tadesse (Recruitment Head)',
    action: 'APPROVE_VACANCY_CAPACITY',
    resourceType: 'VACANCY',
    resourceId: 'VAC-ETH-2026-001',
    details: 'Set hard examination quota limit to 3,000 valid registrations max.',
    previousValue: '0',
    newValue: '3000',
    ipAddress: '197.156.64.15',
    previousHash: 'a3d4f82910c2847592318490a120485d921b0e7821c90082f1b4902882a19283',
    hash: 'b7839201948271048291b92049182701f28b3829102837192849102938491029',
    tamperProofVerified: true
  },
  {
    id: 'LOG-1003',
    timestamp: '2026-08-12T09:42:15Z',
    actorRole: 'SYSTEM_SECURITY_ADMIN',
    actorId: 'SYS-AUTO-EVAL',
    actorName: 'EthioMerit Automated Grading Engine',
    action: 'RECORD_ANONYMOUS_EXAM_SCORE',
    resourceType: 'EXAM',
    resourceId: 'ETH-2026-004821',
    details: 'Deterministic grading executed for anonymous Candidate ETH-2026-004821. Written score: 92/100.',
    previousValue: 'None',
    newValue: 'Written: 92',
    ipAddress: '10.0.4.102 (Internal Container)',
    previousHash: 'b7839201948271048291b92049182701f28b3829102837192849102938491029',
    hash: 'c891029384910293849102938491029384910293849102938491029384910293',
    tamperProofVerified: true
  }
];

export const INITIAL_FRAUD_ALERTS: FraudAlert[] = [
  {
    id: 'ALT-801',
    timestamp: '2026-08-12T09:15:00Z',
    candidateId: 'ETH-2026-009102',
    anomalyType: 'IMPOSSIBLE_EXAM_SPEED',
    severity: 'HIGH',
    description: 'Candidate submitted a 50-question complex technical examination in 1 minute and 12 seconds with 100% score.',
    confidenceScore: 0.94,
    status: 'FLAGGED',
    reviewedBy: 'Security_Auditor_MInT'
  },
  {
    id: 'ALT-802',
    timestamp: '2026-08-02T10:14:50Z',
    candidateId: 'ETH-2026-004901',
    anomalyType: 'IP_CLUSTER_ABUSE',
    severity: 'MEDIUM',
    description: '14 candidate registrations originated from a single external IP address within 3 seconds.',
    confidenceScore: 0.82,
    status: 'PENDING_REVIEW'
  }
];

export const INITIAL_WHISTLEBLOWER_REPORTS: WhistleblowerReport[] = [
  {
    id: 'WB-2026-9812',
    trackingCode: 'ETH-SAFE-882190',
    timestamp: '2026-08-08T14:20:00Z',
    allegationType: 'EXTORTION_SOLICITATION',
    vacancyTitle: 'Senior Software Systems Engineer',
    accusedPerson: 'Unidentified individual claiming to be a recruitment officer',
    details: 'Received a Telegram message requesting 100,000 ETB to guarantee selection for position VAC-ETH-2026-001. Attached screenshot of payment demand.',
    status: 'UNDER_INVESTIGATION',
    investigatorNotes: 'Cross-referenced with system logs: No internal score edits detected. Attempt identified as an external fraud impersonation scam. Security warning issued.'
  }
];

export const INITIAL_APPEALS: AppealCase[] = [
  {
    id: 'APP-CASE-401',
    candidateId: 'ETH-2026-004823',
    candidateName: 'Bruk Assefa Bekele',
    vacancyTitle: 'Senior Software Systems Engineer',
    appealType: 'ELIGIBILITY_REJECTION',
    submissionDate: '2026-08-04T12:00:00Z',
    justification: 'I hold a Civil Engineering degree but have 4 years of documented professional experience as a senior full-stack web developer with accredited certifications.',
    status: 'IN_REVIEW',
    reviewDeadline: '2026-08-18T17:00:00Z',
    resolutionNotes: 'Under review by Civil Service Commission Panel to evaluate equivalency clauses in Ethiopian Civil Service Proclamation No. 1064/2017.'
  }
];
