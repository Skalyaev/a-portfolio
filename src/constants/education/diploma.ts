type CompetencyBlockId = "bc01" | "bc02" | "bc04" | "bc05"

export interface CompetencyBlock {
  id: CompetencyBlockId
  code: string
  isOption: boolean
  competencyKeys: string[]
}

interface Diploma {
  level: number
  certifierName: string
  franceCompetencesUrl: string
  awardDate: string
  downloadUrl: string | null
  blocks: CompetencyBlock[]
}

export const diploma: Diploma = {
  level: 7,
  certifierName: "42",
  franceCompetencesUrl:
    "https://www.francecompetences.fr/recherche/rncp/39774/",
  awardDate: "2026-10-29",
  downloadUrl: null,
  blocks: [
    {
      id: "bc01",
      code: "RNCP39774BC01",
      isOption: false,
      competencyKeys: [
        "techWatch",
        "innovation",
        "infrastructureAudit",
        "stakeholderNeeds",
        "feasibility",
        "specifications",
        "architectureDesign",
        "technologySelection",
        "securityRisks"
      ]
    },
    {
      id: "bc04",
      code: "RNCP39774BC04",
      isOption: false,
      competencyKeys: [
        "selectionCriteria",
        "externalResources",
        "projectPlan",
        "teamLeadership",
        "projectSteering",
        "delivery"
      ]
    },
    {
      id: "bc05",
      code: "RNCP39774BC05",
      isOption: false,
      competencyKeys: [
        "documentation",
        "documentationSharing",
        "maintenance",
        "newNeeds",
        "architectureEvolution"
      ]
    },
    {
      id: "bc02",
      code: "RNCP39774BC02",
      isOption: true,
      competencyKeys: [
        "servers",
        "ipNetwork",
        "networkServices",
        "administration",
        "testing",
        "securityObjectives",
        "securityPolicies",
        "identityAccess",
        "securityTesting"
      ]
    }
  ]
}
