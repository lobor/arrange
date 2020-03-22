import { Component } from '../Components';
import omit from 'lodash/omit';

export interface Scope extends Omit<Component, '_id' | 'page' | '__v' | 'type'>{
  value?: Component["defaultValue"];
}

declare global {
  interface Window {
    dndTool: {
      scope: {
        [key: string]: Scope;
      };
    };
  }
}

class ScopeInterface {
  static get() {}

  static add(scope: Component) {
    if (!window.dndTool) {
      window.dndTool = {
        scope: {}
      };
    }
    window.dndTool.scope[scope.name] = ScopeInterface.componentToScope(scope) as Scope;
  }

  static componentToScope(comp: Component) {
    return omit<Scope>(comp, ['_id', 'name', 'page', '__v', 'type']);
  }
}

export { ScopeInterface as default, ScopeInterface };
