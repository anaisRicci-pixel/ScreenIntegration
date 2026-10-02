import { createPersistentStore } from "@/lib/persistent-store";
import { seedChats, seedProjects, seedSources, type Chat, type Project, type Source } from "@/lib/mock-data";

const projects = createPersistentStore<Project>("ccg:projects:v1", seedProjects);
const chats = createPersistentStore<Chat>("ccg:chats:v1", seedChats);
const sources = createPersistentStore<Source>("ccg:sources:v1", seedSources);

export const useProjects = projects.useItems;
export const updateProjects = projects.update;
export const useChats = chats.useItems;
export const updateChats = chats.update;
export const useSources = sources.useItems;
export const updateSources = sources.update;
