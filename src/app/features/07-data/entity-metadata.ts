import { EntityMetadataMap, DefaultDataServiceConfig } from '@ngrx/data';

export const entityMetadata: EntityMetadataMap = {
  Product: {},
};

export const pluralNames: { [name: string]: string } = {
  Product: 'Products',
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: '/api',
};
