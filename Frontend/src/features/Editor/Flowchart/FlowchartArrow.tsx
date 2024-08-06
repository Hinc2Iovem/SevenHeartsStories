import React from "react";
import {
  calculateDeltas,
  calculateControlPoints,
  PointTypes,
} from "../utils/ArrowUtils";

const CONTROL_POINTS_RADIUS = 5;
const STRAIGHT_LINE_BEFORE_ARROW_HEAD = 5;

type ArrowConfig = {
  arrowColor?: string;
  arrowHighlightedColor?: string;
  controlPointsColor?: string;
  boundingBoxColor?: string;
  dotEndingBackground?: string;
  dotEndingRadius?: number;
  arrowHeadEndingSize?: number;
  hoverableLineWidth?: number;
  strokeWidth?: number;
};

type Props = {
  startPoint: PointTypes;
  endPoint: PointTypes;
  isHighlighted?: boolean;
  showDebugGuideLines?: boolean;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  config?: ArrowConfig;
  tooltip?: string;
};

const ControlPoints = ({
  p1,
  p2,
  p3,
  p4,
  color,
}: {
  p1: PointTypes;
  p2: PointTypes;
  p3: PointTypes;
  p4: PointTypes;
  color: string;
}) => {
  return (
    <>
      <circle
        cx={p2.x}
        cy={p2.y}
        r={CONTROL_POINTS_RADIUS}
        strokeWidth="0"
        fill={color}
      />
      <circle
        cx={p3.x}
        cy={p3.y}
        r={CONTROL_POINTS_RADIUS}
        strokeWidth="0"
        fill={color}
      />
      <line
        strokeDasharray="1,3"
        stroke={color}
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
      />
      <line
        strokeDasharray="1,3"
        stroke={color}
        x1={p3.x}
        y1={p3.y}
        x2={p4.x}
        y2={p4.y}
      />
    </>
  );
};

const LENGTH_OF_TOPOLOGY_BLOCK = 50;
const HEIGHT_OF_TOPOLOGY_BLOCK = 20;

type PossibleVerticalSides = "top" | "bottom" | "middle";
type PossibleHorizontalSides = "left" | "right";

export const FlowchartArrow = ({
  startPoint,
  endPoint,
  isHighlighted = false,
  showDebugGuideLines = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
  config,
  tooltip,
}: Props) => {
  const defaultConfig = {
    arrowColor: "#bcc4cc",
    arrowHighlightedColor: "#4da6ff",
    controlPointsColor: "#ff4747",
    boundingBoxColor: "#ffcccc",
    dotEndingBackground: "#fff",
    dotEndingRadius: 3,
    arrowHeadEndingSize: 9,
    hoverableLineWidth: 15,
    strokeWidth: 1,
  };
  const currentConfig = {
    ...defaultConfig,
    ...config,
  };

  const sourceBlockCenterHorizontally =
    startPoint.x + LENGTH_OF_TOPOLOGY_BLOCK / 2;
  const sourceBlockCenterVertically =
    startPoint.y + HEIGHT_OF_TOPOLOGY_BLOCK / 2;

  const targetBlockCenterHorizontally =
    endPoint.x + LENGTH_OF_TOPOLOGY_BLOCK / 2;
  const targetBlockCenterVertically = endPoint.y + HEIGHT_OF_TOPOLOGY_BLOCK / 2;

  let sideVertically: PossibleVerticalSides = "" as PossibleVerticalSides;
  if (targetBlockCenterVertically - sourceBlockCenterVertically > 20) {
    sideVertically = "top";
  } else if (sourceBlockCenterVertically - targetBlockCenterVertically > 20) {
    sideVertically = "bottom";
  } else if (
    targetBlockCenterVertically - sourceBlockCenterVertically <= 20 ||
    sourceBlockCenterVertically - targetBlockCenterVertically <= 20
  ) {
    sideVertically = "middle";
  }

  let sideHorizontally: PossibleHorizontalSides = "" as PossibleHorizontalSides;

  if (sourceBlockCenterHorizontally > targetBlockCenterHorizontally) {
    sideHorizontally = "left";
  } else if (sourceBlockCenterHorizontally < targetBlockCenterHorizontally) {
    sideHorizontally = "right";
  }

  console.log("startPoint: ", startPoint);

  const startPointRegardingSides: PointTypes = startPoint;
  const endPointRegardingSides: PointTypes = endPoint;

  if (sideVertically === "top") {
    startPointRegardingSides.y += HEIGHT_OF_TOPOLOGY_BLOCK;
    startPointRegardingSides.x += LENGTH_OF_TOPOLOGY_BLOCK / 2;

    endPointRegardingSides.x += LENGTH_OF_TOPOLOGY_BLOCK / 2;
  } else if (sideVertically === "bottom") {
    startPointRegardingSides.x += LENGTH_OF_TOPOLOGY_BLOCK / 2;

    endPointRegardingSides.y += HEIGHT_OF_TOPOLOGY_BLOCK;
    endPointRegardingSides.x += LENGTH_OF_TOPOLOGY_BLOCK / 2;
  } else if (sideVertically === "middle") {
    if (sideHorizontally === "left") {
      startPointRegardingSides.y += HEIGHT_OF_TOPOLOGY_BLOCK / 2;

      endPointRegardingSides.y += HEIGHT_OF_TOPOLOGY_BLOCK / 2;
      endPointRegardingSides.x += LENGTH_OF_TOPOLOGY_BLOCK;
    } else if (sideHorizontally === "right") {
      startPointRegardingSides.y += HEIGHT_OF_TOPOLOGY_BLOCK / 2;
      startPointRegardingSides.x += LENGTH_OF_TOPOLOGY_BLOCK;

      endPointRegardingSides.y += HEIGHT_OF_TOPOLOGY_BLOCK / 2;
    }
  }

  console.log(sideVertically);
  console.log(sideHorizontally);

  const {
    arrowColor,
    arrowHighlightedColor,
    controlPointsColor,
    arrowHeadEndingSize,
    strokeWidth,
    hoverableLineWidth,
    dotEndingBackground,
    dotEndingRadius,
  } = currentConfig;

  const arrowHeadOffset = arrowHeadEndingSize / 2;
  const boundingBoxElementsBuffer =
    strokeWidth +
    arrowHeadEndingSize / 2 +
    dotEndingRadius +
    CONTROL_POINTS_RADIUS / 2;

  const { absDx, absDy, dx, dy } = calculateDeltas(
    startPointRegardingSides,
    endPointRegardingSides
  );
  const { p1, p2, p3, p4, boundingBoxBuffer } = calculateControlPoints({
    boundingBoxElementsBuffer,
    dx,
    dy,
    absDx,
    absDy,
  });

  const canvasXOffset =
    Math.min(startPointRegardingSides.x, endPointRegardingSides.x) -
    boundingBoxBuffer.horizontal;
  const canvasYOffset =
    Math.min(startPointRegardingSides.y, endPointRegardingSides.y) -
    boundingBoxBuffer.vertical;

  const curvedLinePath = `
    M ${p1.x} ${p1.y}
    C ${p2.x} ${p2.y},
    ${p3.x} ${p3.y},
    ${p4.x - STRAIGHT_LINE_BEFORE_ARROW_HEAD} ${p4.y}
    L ${p4.x} ${p4.y}`;

  const getStrokeColor = () => {
    if (isHighlighted) return arrowHighlightedColor;

    return arrowColor;
  };

  const strokeColor = getStrokeColor();

  const centerX = (p4.x + p1.x) / 2;
  const centerY = (p4.y + p1.y) / 2;

  const angle = Math.atan2(p4.y - p1.y, p4.x - p1.x) * (180 / Math.PI);

  return (
    <>
      <svg
        width={5000}
        height={5000}
        className={`absolute left-0 top-0 ${isHighlighted ? "z-30" : "z-29"} ${
          showDebugGuideLines
            ? "border-dashed border-1 border-black"
            : "border-0"
        }`}
        style={{
          transform: `translate(${canvasXOffset}px, ${canvasYOffset}px)`,
        }}
      >
        <path
          d={curvedLinePath}
          strokeWidth={strokeWidth}
          stroke={strokeColor}
          fill="none"
          className="transition-stroke duration-300 z-[10]"
        />
        <path
          d={curvedLinePath}
          strokeWidth={hoverableLineWidth}
          stroke="transparent"
          pointerEvents="all"
          fill="none"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          className="cursor-default z-[10]"
        >
          {tooltip && <title>{tooltip}</title>}
        </path>
        <path
          d={`
            M ${(arrowHeadEndingSize / 5) * 2} 0
            L ${arrowHeadEndingSize} ${arrowHeadEndingSize / 2}
            L ${(arrowHeadEndingSize / 5) * 2} ${arrowHeadEndingSize}`}
          fill="none"
          stroke="transparent"
          strokeWidth={hoverableLineWidth}
          strokeLinecap="round"
          pointerEvents="all"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          className="cursor-default"
          style={{
            transform: `translate(${p4.x - arrowHeadOffset * 2}px, ${
              p4.y - arrowHeadOffset
            }px) `,
          }}
        >
          {tooltip && <title>{tooltip}</title>}
        </path>
        <circle
          cx={p1.x}
          cy={p1.y}
          r={dotEndingRadius}
          stroke="transparent"
          strokeWidth={hoverableLineWidth}
          fill="transparent"
          className="cursor-default"
        >
          {tooltip && <title>{tooltip}</title>}
        </circle>
      </svg>
      <svg
        width={5000}
        height={5000}
        className={`absolute left-0 top-0 ${
          isHighlighted ? "z-11" : "z-10"
        } pointer-events-none`}
        style={{
          transform: `translate(${canvasXOffset}px, ${canvasYOffset}px)`,
        }}
      >
        <circle
          cx={p1.x}
          cy={p1.y}
          r={dotEndingRadius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill={dotEndingBackground}
          className="transition-stroke duration-300"
        />
        <path
          d={`
            M ${(arrowHeadEndingSize / 5) * 2} 0
            L ${arrowHeadEndingSize} ${arrowHeadEndingSize / 2}
            L ${(arrowHeadEndingSize / 5) * 2} ${arrowHeadEndingSize}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="transition-stroke duration-300"
          style={{
            transform: `translate(${p4.x - arrowHeadOffset * 2}px, ${
              p4.y - arrowHeadOffset
            }px) rotate(${angle}deg)`,
          }}
        />
        {showDebugGuideLines && (
          <ControlPoints
            p1={p1}
            p2={p2}
            p3={p3}
            p4={p4}
            color={controlPointsColor}
          />
        )}
      </svg>
    </>
  );
};
