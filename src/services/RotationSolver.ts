type Vec2D<T> = { x: T; y: T };

export class RotationSolver {
  private static PI_OVER_180 = Math.PI / 180;

  center: Vec2D<number> | undefined;
  point: Vec2D<number> | undefined;
  angle: number | undefined;

  result: Vec2D<number> | undefined;
  private degToRad(deg: number) {
    return deg * RotationSolver.PI_OVER_180;
  }
  private parseVec(
    vec: Vec2D<string>
  ): Vec2D<number> | undefined {
    const { x, y } = vec;
    const pX = Number(x);
    const pY = Number(y);
    if (
      isNaN(pX) ||
      isNaN(pY) ||
      !isFinite(pX) ||
      !isFinite(pY)
    ) {
      return undefined;
    }
    return { x: pX, y: pY };
  }

  withCenter(center: Vec2D<string>) {
    const vec = this.parseVec(center);
    if (vec === undefined) {
      return null;
    }
    this.center = vec;
    return this;
  }

  withPoint(point: Vec2D<string>) {
    const vec = this.parseVec(point);
    if (vec === undefined) {
      return null;
    }
    this.point = vec;
    return this;
  }
  withAngle(angle: string, direction: number) {
    const pAngle = Number(angle);
    if (isNaN(pAngle) || !isFinite(pAngle)) {
      return null;
    }
    this.angle = this.degToRad(pAngle * direction);
    return this;
  }

  solve() {
    if (
      this.center === undefined ||
      this.point === undefined ||
      this.angle === undefined
    ) {
      this.result = undefined;
      return null;
    }

    const { x: h, y: k } = this.center;
    const { x, y } = this.point;

    const shiftX = x - h;
    const shiftY = y - k;
    const sinTheta = Math.sin(this.angle);
    const cosTheta = Math.cos(this.angle);

    const xPrime =
      h + shiftX * cosTheta - shiftY * sinTheta;

    const yPrime =
      k + shiftX * sinTheta + shiftY * cosTheta;
    this.result = { x: xPrime, y: yPrime };
    return this;
  }
}
