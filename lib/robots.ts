export type Robot = {
  id: string
  brand: string
  name: string
  category: string
  availability: "In Stock" | "Backorder"
  payloadKg: number
  reachMm: number
  axes: number
  controller: string
  image: string
}

const IMAGE_HOST = "https://icrmedusa.fra1.digitaloceanspaces.com"

// From the "Similar Products" section on icrservices.com.
export const ROBOTS = [
  {
    id: "motoman-hp165",
    brand: "MOTOMAN",
    name: "MOTOMAN - HP165",
    category: "Robots | Robot Arm",
    availability: "In Stock",
    payloadKg: 165,
    reachMm: 2651,
    axes: 6,
    controller: "NX100",
    image: `${IMAGE_HOST}/Motoman%20HP165%20Robot-01M3TBASP18Y1PKWT3J4AQG055.jpg`,
  },
  {
    id: "motoman-mh180",
    brand: "MOTOMAN",
    name: "MOTOMAN - MH180",
    category: "Robots | Robot Arm",
    availability: "In Stock",
    payloadKg: 180,
    reachMm: 2702,
    axes: 6,
    controller: "DX200",
    image: `${IMAGE_HOST}/Yaskawa%20Motoman%20MH180-01KQFJ352KX9HXEFD1EEQBPF2F.jpg`,
  },
  {
    id: "fanuc-r-2000ic165f",
    brand: "FANUC",
    name: "FANUC - R-2000iC/165F",
    category: "Robots | Robot Arm",
    availability: "In Stock",
    payloadKg: 165,
    reachMm: 2655,
    axes: 6,
    controller: "R-30iB",
    image: `${IMAGE_HOST}/FANUC%20R-2000iC-165F%20Robot-01KQTCHEP4FN2AA99TYZ8XXCPC.jpg`,
  },
  {
    id: "fanuc-r-2000ib165f",
    brand: "FANUC",
    name: "FANUC - R-2000iB/165F",
    category: "Robots | Robot Arm",
    availability: "In Stock",
    payloadKg: 165,
    reachMm: 2655,
    axes: 6,
    controller: "R-30iA, R-30iB",
    image: `${IMAGE_HOST}/FANUC%20R-2000iB%20165F%20Robot-01M0K1RK5P1AW8MDSMWZEHQJW2.jpg`,
  },
  {
    id: "abb-irb-6650",
    brand: "ABB",
    name: "ABB - IRB 6650",
    category: "Robots | Robot Arm",
    availability: "Backorder",
    payloadKg: 175,
    reachMm: 2550,
    axes: 6,
    controller: "S4C+",
    image: `${IMAGE_HOST}/ABB%20IRB%206650-01KQAVKMW0SQ7K40DNASD6F40D.jpg`,
  },
  {
    id: "abb-irb-6650-200275",
    brand: "ABB",
    name: "ABB - IRB 6650-200/2.75",
    category: "Robots | Robot Arm",
    availability: "In Stock",
    payloadKg: 200,
    reachMm: 2750,
    axes: 6,
    controller: "S4C+",
    image: `${IMAGE_HOST}/ABB%20IRB%206650-200-2.75-01KQB2J23C9FDBDE1H5PBZG0DY.jpg`,
  },
  {
    id: "motoman-es165d",
    brand: "MOTOMAN",
    name: "MOTOMAN - ES165D",
    category: "Robots | Robot Arm",
    availability: "In Stock",
    payloadKg: 165,
    reachMm: 2651,
    axes: 6,
    controller: "DX100",
    image: `${IMAGE_HOST}/Yaskawa%20Motoman%20ES165D%20Robot-01KYN5CHXCZRNKF9YN15C0T12X.jpg`,
  },
  {
    id: "abb-irb-6640-18528",
    brand: "ABB",
    name: "ABB - IRB 6640-185/2.8",
    category: "Robots | Robot Arm",
    availability: "Backorder",
    payloadKg: 185,
    reachMm: 2800,
    axes: 6,
    controller: "IRC5",
    image: `${IMAGE_HOST}/ABB%20IRB%206640-185-2.8-01KQATVNXE63MK906X1XFPZ4YD.jpg`,
  },
] as const satisfies readonly Robot[]

export type RobotId = (typeof ROBOTS)[number]["id"]

export const ROBOT_SPECS = ["payload", "reach", "axes", "controller"] as const

export type RobotSpec = (typeof ROBOT_SPECS)[number]

export const ROBOT_SPEC_LABELS = {
  payload: "Payload",
  reach: "Reach",
  axes: "Axes",
  controller: "Controller",
} satisfies Record<RobotSpec, string>

export function formatRobotSpec(robot: Robot, spec: RobotSpec) {
  switch (spec) {
    case "payload":
      return `${robot.payloadKg} kg`
    case "reach":
      return `${robot.reachMm} mm`
    case "axes":
      return String(robot.axes)
    case "controller":
      return robot.controller
  }
}

export function getRobot(id: RobotId) {
  return ROBOTS.find((robot) => robot.id === id)!
}

export function isRobotId(id: unknown): id is RobotId {
  return ROBOTS.some((robot) => robot.id === id)
}

// What the user did on the grid, oldest first.
export type RobotEvent = { type: "hover"; robotId: RobotId; seconds: number }

export type RobotPair = readonly [RobotId, RobotId]

export type CompareIntent = {
  pair: RobotPair
  probability: number
}
