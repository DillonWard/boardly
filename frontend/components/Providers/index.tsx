"use client";

import { ReactNode } from 'react';
import { SessionProvider } from '@/context/session';
import { ProjectsProvider } from '@/context/projects';
import { UsersProvider } from '@/context/users';

const providers = [
  SessionProvider,
  ProjectsProvider,
  UsersProvider
];

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};