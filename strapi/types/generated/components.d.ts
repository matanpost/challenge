import type { Schema, Attribute } from '@strapi/strapi';

export interface ModuleModule extends Schema.Component {
  collectionName: 'components_module_modules';
  info: {
    displayName: 'module';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    discription: Attribute.Text & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'module.module': ModuleModule;
    }
  }
}
