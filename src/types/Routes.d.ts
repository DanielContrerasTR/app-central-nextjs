import { type RouteObject } from 'react-router-dom';

export type CustomRoute = Omit<RouteObject, 'children'> & { name?: string; path: string };
export type Route = CustomRoute & { children?: CustomRoute[]; isRestricted?: boolean };
