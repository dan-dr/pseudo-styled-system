# pseudo-styled-system

Takes a styled-system and returns the same system with prefixed pseudo props.

`yarn add pseudo-styled-system`

## Example

```tsx
import { pseudoizeSystem, PseudoizedSystem } from 'pseudo-styled-system'
import { color, ColorProps } from 'styled-system'

const pseudoColor = pseudoizeSystem(color, ':hover');
type PseudoColorProps = PseudoizedSystem<ColorProps>;

const pseudoBorder = pseudoizeSystem(system({ borderColor: true }), [':hover', ':focus']);
type PseudoBorderProps = PseudoizedSystem<BorderProps>;

// component
const Component = styled.div`
 compose(color, pseudoColor, pseudoBorder)
`

<Component hoverColor="colorFromTheme" />
```

## Notes
- The resulting props are prefixed with the pseudo selector. e.g. `:hover = hover` `:first-child = firstChild`
- You need to compose the system yourself. Does not return a composed system, but a new system without the original props. 
- You should only add styling pseudo props (start with `:`) and not elements (start with `::`)
