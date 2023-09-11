export interface ApiError {
  response: {
    data: {
      success: boolean,
      message: string
    }
  }
}

export interface ITriangle {
  pointA: Point,
  pointB: Point,
  pointC: Point
}

export interface Point {
  coordinateX: number,
  coordinateY: number,
  coordinateZ: number
}