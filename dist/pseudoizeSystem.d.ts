import { styleFn } from 'styled-system';
export declare type PseudoToCamel<T extends string> = string extends T ? string : T extends `${infer C0}${infer C1}${infer R}` ? `${C0 extends ':' | '-' ? '' : C0}${C0 extends '-' ? `${Capitalize<C1>}${PseudoToCamel<R>}` : C1 extends '-' ? PseudoToCamel<Capitalize<R>> : `${C1}${PseudoToCamel<R>}`}` : T extends `${infer C0}${infer R}` ? `${C0 extends ':' | '-' ? '' : C0}${C0 extends '-' ? PseudoToCamel<Capitalize<R>> : PseudoToCamel<R>}` : '';
export declare type Pseudos = ':active' | ':checked' | ':disabled' | ':empty' | ':first-child' | ':focus' | ':focus-within' | ':hover' | ':invalid' | ':last-child' | ':only-child' | ':required' | ':visited' | `:${string}`;
export declare type PseudoizedSystemProps<T, P extends Pseudos> = T & Partial<{
    [K in Extract<keyof T, string> as `${PseudoToCamel<P>}${Capitalize<K>}`]: T[K];
}>;
export declare const pseudoizeSystem: (existingSystem: styleFn, pseudo: Pseudos | Pseudos[]) => styleFn;
