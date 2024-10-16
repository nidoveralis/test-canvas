import './style.css';

type Point = {
    x: number;
    y: number;
};
type Size = {
    width: number;
    height: number;
};
type Rect = {
    position: Point;
    size: Size;
};
type ConnectionPoint = {
    point: Point;
    angle: number;
};

// const rect1 = {
//     position: { x: 12, y: 12 },
//     size: {
//         width: 160,
//         height: 16,
//     }

// };

// const rect2 = {
//     position: { x: 40, y: 40 },
//     size: {
//         width: 20,
//         height: 20,
//     }

// };

// const cPoint1 = {
//     point: { x: 2, y: 20 },
//     angle: 90,
// };

// const cPoint2 = {
//     point: { x: 12, y: 20 },
//     angle: 90,
// };

const rect1: Rect = { position: { x: 100, y: 100 }, size: { width: 50, height: 30 } };
const rect2: Rect = { position: { x: 300, y: 100 }, size: { width: 50, height: 30 } };
const cPoint1: ConnectionPoint = { point: { x: 125, y: 100 }, angle: 0 };
const cPoint2: ConnectionPoint = { point: { x: 275, y: 100 }, angle: 180 };

const points: Point[] = [];

const dataConverter = (
    rect1: Rect,
    rect2: Rect,
    cPoint1: ConnectionPoint,
    cPoint2: ConnectionPoint
): any => {

    //проверяет прилежание к стороне
    // const isLiesOnRect = (rect: Rect, line: Point) => {
    //     const halfWidth = rect.size.width / 2;
    //     const halfHeight = rect.size.height / 2;
    //     const y = rect.position.y;
    //     const x = rect.position.x;

    //     const upperBound = y - halfHeight;
    //     const lowerBound = y + halfHeight;
    //     const leftBound = x - halfWidth;
    //     const rightBound = x + halfWidth;


    //     return (upperBound === line.y || lowerBound === line.y) &&
    //         (leftBound <= line.x || rightBound >= line.x)
    //         ||
    //         (leftBound === line.x || rightBound === line.x) &&
    //         (upperBound <= line.y || lowerBound >= line.y);
    // };

    // //проверяет перпендикулярность угла и проверяет сторону присоединения
    // const isAnglesPerpendicular = (rect: Rect, line: ConnectionPoint) => {
    //     if (line.angle % 90 !== 0) return;

    //     const { x, y } = line.point;
    //     const halfWidth = rect.size.width / 2;
    //     const halfHeight = rect.size.height / 2;
    //     const yRect = rect.position.y;
    //     const xRect = rect.position.x;

    //     const upperBound = yRect - halfHeight;
    //     const lowerBound = yRect + halfHeight;
    //     const leftBound = xRect - halfWidth;
    //     const rightBound = xRect + halfWidth;

    //     if (y === upperBound && x >= leftBound && x <= rightBound) {
    //         return line.angle === 270 ? 'top' : null;
    //     } else if (y === lowerBound && x >= leftBound && x <= rightBound) {
    //         return line.angle === 90 ? 'bottom' : null;
    //     } else if (x === leftBound && y >= upperBound && y <= lowerBound) {
    //         return line.angle === 180 ? 'left' : null;
    //     } else if (x === rightBound && y >= upperBound && y <= lowerBound) {
    //         return line.angle === 0 ? 'rigth' : null;
    //     } else {
    //         return null;
    //     }
    // };
    // // console.log(isAnglesPerpendicular(rect1, cPoint1));
    // // console.log(isAnglesPerpendicular(rect2, cPoint2));

    // if (isLiesOnRect(rect1, cPoint1.point)) return;
    // if (isLiesOnRect(rect2, cPoint2.point)) return;


    // if (!isAnglesPerpendicular(rect1, cPoint1)) return;
    // if (!isAnglesPerpendicular(rect2, cPoint2)) return;

    const pointsList = (rect: Rect, line: ConnectionPoint) => {
        const { x, y } = line.point;
        const halfWidth = rect.size.width / 2;
        const halfHeight = rect.size.height / 2;
        const yRect = rect.position.y;
        const xRect = rect.position.x;

        const upperBound = yRect - halfHeight;
        const lowerBound = yRect + halfHeight;
        const leftBound = xRect - halfWidth;
        const rightBound = xRect + halfWidth;


        switch (line.angle) {
            case 0:
                return { x: rightBound + 10, y: y };
            case 180:
                return { x: leftBound - 10, y: y };
            case 270:
                return { x: x, y: upperBound - 10 };
            case 270:
                return { x: x, y: lowerBound + 10 };
            default: console.log('err');
        }
    };

    const one = pointsList(rect1, cPoint1);
    const two = pointsList(rect2, cPoint2);

    one && points.push(one);
    points.push(cPoint1.point);
    two && points.push(two);
    points.push(cPoint2.point);

    return points;
};

dataConverter(rect1,
    rect2,
    cPoint1,
    cPoint2);

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("react") as HTMLCanvasElement | null;
    if (canvas) {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        console.log(points);

        ctx.strokeRect(
            rect1.position.x - (rect1.size.width / 2),
            rect1.position.y - (rect1.size.height / 2),
            rect1.size.width,
            rect1.size.height
        );

        ctx.strokeRect(
            rect2.position.x - (rect2.size.width / 2),
            rect2.position.y - (rect2.size.height / 2),
            rect2.size.width,
            rect2.size.height
        )

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

    }


});

