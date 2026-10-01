import { useId } from "react"

const PLAIN_COLOR = "#FF7F4B"
// The brand shape as drawn in Figma.
const SHAPE_PATH =
  "M54.4609 20C72.8406 20.0002 82.0508 31.3142 86.1348 50.8926C86.2915 51.644 87.4119 51.7127 87.6572 50.9854C92.5891 36.3604 101.53 26.2588 116.793 26.2588C121.254 26.2589 125.176 26.9261 128.614 28.2158C129.125 33.6443 129.365 39.6577 129.365 46.2773C129.365 79.2056 122.379 111.939 94.9033 111.939C85.0197 111.939 77.7884 108.667 72.5791 102.598C72.1712 102.122 71.3706 102.318 71.2451 102.932C67.2047 122.693 57.9948 137.548 39.4863 137.548C37.312 137.548 35.2661 137.388 33.3418 137.076C23.7261 128.574 20 111.866 20 85.6621C20.0001 52.7339 26.9854 20.0002 54.4609 20Z"
const PATH_CENTER = { x: 74.683, y: 78.774 }
// Bounding box of the rotated shape.
const CANVAS = { width: 153.487, height: 156.482 }
const ROTATION_DEG = -150
// Runs from the accent on one lobe to the base on the other.
const GRADIENT_START = { x: 18.843, y: 124.571 }
const GRADIENT_END = { x: 132.639, y: 71.684 }
const COLOR_TRANSITION = "600ms cubic-bezier(0.25, 0.1, 0.25, 1)"

// Figma's progressive blur: strongest at the start, gone by the end. SVG has
// none, so a few fixed blur levels are crossfaded along that axis.
const BLUR_START = { x: 58.82, y: 17.94 }
const BLUR_END = { x: 75.72, y: 65.3 }
// Half of Figma's blur radius, which is how Figma maps it to a gaussian.
const MAX_BLUR = 10
const BLUR_LEVEL_COUNT = 5
// Room around the shape so the blur isn't cut off.
const BLUR_PADDING = MAX_BLUR * 3
const MASK_AREA = {
  x: -BLUR_PADDING,
  y: -BLUR_PADDING,
  width: PATH_CENTER.x * 2 + BLUR_PADDING * 2,
  height: PATH_CENTER.y * 2 + BLUR_PADDING * 2,
}

// Each level peaks at its spot on the axis and fades out at its neighbours',
// so the weights always add up to one.
function getBlurLevelMask(index: number) {
  const step = 1 / (BLUR_LEVEL_COUNT - 1)
  const position = index * step
  if (index === 0) {
    return { colors: ["white", "transparent"], positions: [0, step] }
  }
  if (index === BLUR_LEVEL_COUNT - 1) {
    return { colors: ["transparent", "white"], positions: [1 - step, 1] }
  }
  return {
    colors: ["transparent", "white", "transparent"],
    positions: [position - step, position, position + step],
  }
}

const BLUR_LEVELS = Array.from({ length: BLUR_LEVEL_COUNT }, (_, index) => ({
  blur: MAX_BLUR * (1 - index / (BLUR_LEVEL_COUNT - 1)),
  mask: getBlurLevelMask(index),
}))

export type ToneShapeProps = {
  // Base and accent of the tone.
  colors?: readonly [string, string]
  className?: string
}

// Brand shape tinted with a tone, fading between tones as they change. Plain
// orange while there is no tone.
export default function ToneShape({ colors, className }: ToneShapeProps) {
  const id = useId()
  const hasTone = !!colors
  const [baseColor, accentColor] = colors ?? [PLAIN_COLOR, PLAIN_COLOR]
  const gradientId = `${id}-gradient`

  const shape = (
    <>
      <path d={SHAPE_PATH} fill={`url(#${gradientId})`} />
      <path
        d={SHAPE_PATH}
        fill={PLAIN_COLOR}
        style={{
          opacity: hasTone ? 0 : 1,
          transition: `opacity ${COLOR_TRANSITION}`,
        }}
      />
    </>
  )

  return (
    <svg
      viewBox={`0 0 ${CANVAS.width + BLUR_PADDING * 2} ${CANVAS.height + BLUR_PADDING * 2}`}
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1={GRADIENT_START.x}
          y1={GRADIENT_START.y}
          x2={GRADIENT_END.x}
          y2={GRADIENT_END.y}
        >
          {[accentColor, baseColor].map((stopColor, index) => (
            <stop
              key={index}
              offset={index}
              style={{
                stopColor,
                transition: `stop-color ${COLOR_TRANSITION}`,
              }}
            />
          ))}
        </linearGradient>

        {BLUR_LEVELS.map(({ blur, mask }, index) => (
          <g key={index}>
            <filter
              id={`${id}-blur-${index}`}
              filterUnits="userSpaceOnUse"
              {...MASK_AREA}
            >
              <feGaussianBlur stdDeviation={blur} />
            </filter>
            <linearGradient
              id={`${id}-mask-gradient-${index}`}
              gradientUnits="userSpaceOnUse"
              x1={BLUR_START.x}
              y1={BLUR_START.y}
              x2={BLUR_END.x}
              y2={BLUR_END.y}
            >
              {mask.colors.map((stopColor, stopIndex) => (
                <stop
                  key={stopIndex}
                  offset={mask.positions[stopIndex]}
                  stopColor={stopColor}
                />
              ))}
            </linearGradient>
            <mask
              id={`${id}-mask-${index}`}
              maskUnits="userSpaceOnUse"
              // weights by alpha; luminance would skew them in linearRGB
              style={{ maskType: "alpha" }}
              {...MASK_AREA}
            >
              <rect
                {...MASK_AREA}
                fill={`url(#${id}-mask-gradient-${index})`}
              />
            </mask>
          </g>
        ))}
      </defs>

      <g
        transform={`translate(${BLUR_PADDING + CANVAS.width / 2} ${BLUR_PADDING + CANVAS.height / 2}) rotate(${ROTATION_DEG}) translate(${-PATH_CENTER.x} ${-PATH_CENTER.y})`}
        style={{ isolation: "isolate" }}
      >
        {/* added up, the masked levels blend into one smooth blur */}
        {BLUR_LEVELS.map(({ blur }, index) => (
          <g
            key={blur}
            mask={`url(#${id}-mask-${index})`}
            style={{ mixBlendMode: "plus-lighter" }}
          >
            <g filter={blur > 0 ? `url(#${id}-blur-${index})` : undefined}>
              {shape}
            </g>
          </g>
        ))}
      </g>
    </svg>
  )
}
