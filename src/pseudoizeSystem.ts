import { compose, Scale, styleFn, system } from 'styled-system';

export type PseudoToCamel<T extends string> = string extends T
  ? string
  : // eslint-disable-next-line
  T extends `${infer C0}${infer C1}${infer R}`
  ? `${C0 extends ':' | '-' ? '' : C0}${C0 extends '-'
      ? `${Capitalize<C1>}${PseudoToCamel<R>}`
      : C1 extends '-'
      ? PseudoToCamel<Capitalize<R>>
      : `${C1}${PseudoToCamel<R>}`}`
  : T extends `${infer C0}${infer R}`
  ? `${C0 extends ':' | '-' ? '' : C0}${C0 extends '-'
      ? PseudoToCamel<Capitalize<R>>
      : PseudoToCamel<R>}`
  : '';

export type Pseudos =
  | ':active'
  | ':checked'
  | ':disabled'
  | ':empty'
  | ':first-child'
  | ':focus'
  | ':focus-within'
  | ':hover'
  | ':invalid'
  | ':last-child'
  | ':only-child'
  | ':required'
  | ':visited'
  | `:${string}`;

export type PseudoizedSystemProps<T, P extends Pseudos> = T &
  Partial<
    {
      [K in Extract<
        keyof T,
        string
      > as `${PseudoToCamel<P>}${Capitalize<K>}`]: T[K];
    }
  >;

function capitalize(s: string, lowerRest: boolean = false) {
  return (
    s &&
    s.charAt(0).toUpperCase() +
      (lowerRest ? s.slice(1).toLowerCase() : s.slice(1))
  );
}

export const pseudoizeSystem = (
  existingSystem: styleFn,
  pseudo: Pseudos | Pseudos[],
) => {
  const list = ([] as Pseudos[]).concat(pseudo);

  const result = list.reduce<styleFn>((newSystem, pseudoSelector: Pseudos) => {
    const pseudoProp = pseudoSelector.replace(/:|-([a-z])/g, function (g) {
      return g === ':' ? '' : g[1].toUpperCase();
    });

    const pseudoSystemConfig = Object.entries(
      existingSystem.config ?? {},
    ).reduce<{ [key: string]: object }>((acc, [propName, config]) => {
      acc[`${pseudoProp}${capitalize(propName)}`] = {
        property: pseudoSelector,
        scale: config.scale,
        transform: (value: string, scale?: Scale) => {
          const result = `{} ${pseudoSelector} { ${propName}: ${
            scale?.[value] ?? value
          }}`;
          return result;
        },
      };
      return acc;
    }, {});

    return compose(newSystem, system(pseudoSystemConfig));
  }, system({}));

  return result;
};
