export type Discussion = {
  id: string;
  title: string;
  ephemeral?: boolean;
};

export type SuggestedPrompt = {
  id: string;
  title: string;
  text: string;
};

export const currentUser = {
  firstName: "Jeanne",
  fullName: "Hubert Jeanne (Safran)",
  avatar: "/images/avatar.png",
};

export const pinnedDiscussions: Discussion[] = [
  { id: "d-openrouter", title: "A quoi sert Open Router ?" },
  { id: "d-azure", title: "Peux tu me proposer un plan de migration AZURE?" },
];

export const discussions: Discussion[] = [
  { id: "d-tokens", title: "Quelle est ma consommation de token de ce mois ?" },
  { id: "d-fable", title: "Dans quels cas utiliser Fable 5 ?" },
  { id: "d-llm", title: "What are Pros and Cons for LLM use ?", ephemeral: true },
  { id: "d-n8n", title: "Je souhaite réaliser une automation avec N8N", ephemeral: true },
  { id: "d-benchmark", title: "Réalise un benchmark des outils open sources" },
];

export type Project = {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  pinned: boolean;
};

// Seed order and copy follow the "Liste Projets - Desktop" Figma frame (SPEC.md §4).
export const seedProjects: Project[] = [
  {
    id: "dashboard-suivi",
    name: "Dashboard de suivi de projet",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industryum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'...",
    updatedAt: new Date().toISOString(),
    pinned: false,
  },
  { id: "projet-secured", name: "Projet Secured", description: "", updatedAt: "2026-08-20T10:00:00.000Z", pinned: false },
  {
    id: "site-ecommerce-velo",
    name: "Site e-commerce de pièces de revente vélo",
    description: "Vendez, Achetez, Roulez - Troc Vélo, petites annonces vélo entre particuliers",
    updatedAt: "2026-08-03T10:00:00.000Z",
    pinned: false,
  },
  {
    id: "poc-salesforce",
    name: "POC Salesforce",
    description: "Lorem Ipsum has been the industryum is simply",
    updatedAt: "2026-08-20T10:00:00.000Z",
    pinned: false,
  },
  {
    id: "migration-azure-aws",
    name: "Migration cloud AZURE vers AWS",
    description: "Lorem Ipsum has been the industryum is simply",
    updatedAt: "2026-03-13T10:00:00.000Z",
    pinned: false,
  },
];

export type Chat = {
  id: string;
  projectId: string;
  title: string;
  updatedAt: string;
  pinned: boolean;
};

export type SourceKind = "excel" | "pdf" | "image" | "docx" | "md" | "json";

export type Source = {
  id: string;
  projectId: string;
  name: string;
  kind: SourceKind;
  addedAt: string;
};

const today = new Date().toISOString();

// Copy and order follow the "Projet > Chat" Figma frames.
export const seedChats: Chat[] = [
  { id: "c-plan-prd", projectId: "dashboard-suivi", title: "Propose un plan pour implémenter le projet à partir du PRD", updatedAt: today, pinned: false },
  { id: "c-kanban", projectId: "dashboard-suivi", title: "Créer un kanban à partir des user stories que tu as trouvé dans les sources", updatedAt: today, pinned: false },
  { id: "c-openrouter", projectId: "dashboard-suivi", title: "Comment ajouter l’API Openrouter à mon projet ?", updatedAt: "2026-08-14T10:00:00.000Z", pinned: false },
  { id: "c-a11y-skill", projectId: "dashboard-suivi", title: "Créer une skills permettant de review le respect des normes d’accessibilité", updatedAt: "2026-08-11T10:00:00.000Z", pinned: false },
  { id: "c-excel", projectId: "dashboard-suivi", title: "Genere un fichier excel avec les données à partir d’août", updatedAt: "2026-07-14T10:00:00.000Z", pinned: false },
  { id: "c-storybook", projectId: "dashboard-suivi", title: "Comment lancer un storybook ?", updatedAt: "2026-07-11T10:00:00.000Z", pinned: false },
];

// Copy and order follow the "Projet > Sources" Figma frames.
export const seedSources: Source[] = [
  { id: "s-quarterly", projectId: "dashboard-suivi", name: "Quarterly June-July 2026 analysis.xls", kind: "excel", addedAt: "2026-08-12T10:00:00.000Z" },
  { id: "s-llm-market", projectId: "dashboard-suivi", name: "Analyse de marché sur les LLM 2026", kind: "pdf", addedAt: "2026-08-10T10:00:00.000Z" },
  { id: "s-gartner", projectId: "dashboard-suivi", name: "Gartner adoption graph.jpg", kind: "image", addedAt: "2026-08-09T10:00:00.000Z" },
  { id: "s-prd", projectId: "dashboard-suivi", name: "Product requirement Dashboard de suivi.docx", kind: "docx", addedAt: "2026-07-14T10:00:00.000Z" },
  { id: "s-faisabilite", projectId: "dashboard-suivi", name: "Fichier partagé - etude de faisabilité.md", kind: "md", addedAt: "2026-07-10T10:00:00.000Z" },
  { id: "s-dataset", projectId: "dashboard-suivi", name: "Dataset.json", kind: "json", addedAt: "2026-07-08T10:00:00.000Z" },
  // Added so the scripted answer's citation badges resolve to real rows (SPEC.md §4 gap note); not in the Figma Sources reference screen.
  { id: "s-ai-fluency", projectId: "dashboard-suivi", name: "1.2_AI_Fluency_Summary_16x9.pdf", kind: "pdf", addedAt: "2026-08-13T10:00:00.000Z" },
  { id: "s-description", projectId: "dashboard-suivi", name: "1.5_Description_Summary.pdf", kind: "pdf", addedAt: "2026-08-13T10:00:00.000Z" },
];

// The one scripted chat exchange (SPEC.md §4). Citations reference two sources added to
// seedSources below; any other prompt gets a generic reply with no citation (ProjectChats).
export const scriptedPrompt = "Quelles sont les 4 catégories du 4D Frameworks ?";
export const scriptedCitations = [
  { id: "cite-ai-fluency", label: "1.2_AI_Fluency_Summary_16x9.pdf" },
  { id: "cite-description", label: "1.5_Description_Summary.pdf" },
];
export const genericReply = "Je n’ai pas d’information supplémentaire à ce sujet dans les sources de ce projet pour le moment.";

export const suggestedPrompts: SuggestedPrompt[] = Array.from({ length: 6 }, (_, i) => ({
  id: `sp-${i + 1}`,
  title: "Titre",
  text: "Crée un plan d'action basé sur ce fichier Power Point.",
}));
