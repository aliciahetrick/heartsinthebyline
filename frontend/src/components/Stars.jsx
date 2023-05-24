import styled, { css } from "styled-components";
import Chance from "chance";

import { ReactComponent as StarImage } from "../assets/star.svg";

const DEFAULT_STARS_N = 16;
const chance = new Chance();

export function Stars({ color = "gold", amount = DEFAULT_STARS_N }) {
  return (
    <StarsContainer amount={amount}>
      {Array.from(Array(amount).keys()).map((item, index) => {
        return <StarImage key={index} fill={color} id={`${index}`} />;
      })}
    </StarsContainer>
  );
}

function createStarsCSS(amount) {
  let styles = "";

  for (let i = 0; i < amount; i += 1) {
    styles += `
      .star:nth-child(${i}) {
        width: 18px;
        height: 18px;
        left:${
          i % 2 === 0
            ? chance.integer({ min: 4, max: 35 })
            : chance.integer({ min: 65, max: 92 })
        }%; 
        top: ${chance.integer({ min: 5, max: 75 })}%;
      }

      .star:nth-child(${i}) {
        animation-delay: ${chance.floating({ min: 0.2, max: 4, fixed: 2 })}s;
      }
     `;
  }

  return css`
    ${styles}
  `;
}

export const StarsContainer = styled.div`
  width: 100%;
  height: 100%;
  @keyframes grow {
    0%,
    100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  }
  .star {
    position: absolute;
    animation: grow 2s cubic-bezier(0.42, 0, 0.275, 1.155) infinite both;
    z-index: -1;
  }
  ${(props) => createStarsCSS(props.amount)};
`;
