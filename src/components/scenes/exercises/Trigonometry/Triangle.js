import React from 'react';
import { XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines } from 'react-vis';

const TriangleGraph = ({ angle1, angle2, baseLength }) => {

    // Calculate coordinates of the triangle vertices
    const triangleData = calculateTriangle(angle1, angle2, baseLength);

    const vertices = triangleData.vertices
    const minX = Math.min(...vertices.map(point => point.x));
    const minY = Math.min(...vertices.map(point => point.y));
    const maxX = Math.max(...vertices.map(point => point.x));
    const maxY = Math.max(...vertices.map(point => point.y));
    const axisRange = [Math.min(minX, minY), Math.max(maxX, maxY)]

    return (
        <XYPlot width={350} height={350} xDomain={axisRange} yDomain={axisRange}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries data={vertices} strokeWidth={5}/>
        </XYPlot>
    );
};

export function calculateTriangle(leftAngle, rightAngle, bottomSide) {

    const topAngle = 180 - leftAngle - rightAngle;

    const leftRadians = (leftAngle * Math.PI) / 180;
    const rightRadians = (rightAngle * Math.PI) / 180;
    const topRadians = (topAngle * Math.PI) / 180;

    const leftSide = bottomSide * Math.sin(rightRadians) / Math.sin(topRadians)
    const rightSide = bottomSide * Math.sin(leftRadians) / Math.sin(topRadians)

    const innerHeight = Math.sin(leftRadians) * leftSide
    const leftBase = Math.cos(leftRadians) * leftSide

    const leftVertex = {x: 0, y:0}
    const rightVertex = {x: bottomSide, y:0}
    const topVertex = {x: leftBase, y: innerHeight}

    return {
        vertices: [leftVertex, rightVertex, topVertex, leftVertex],
        angles: {left: leftAngle, right: rightAngle, top: topAngle},
        sides: {left: leftSide, right: rightSide, bottom: bottomSide}
    };
}





export function calculateTriangleSideLengths(vertices) {
    const [vertex1, vertex2, vertex3] = vertices;

    const distance = (point1, point2) => Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));

    const side1Length = distance(vertex1, vertex2);
    const side2Length = distance(vertex2, vertex3);
    const side3Length = distance(vertex3, vertex1);

    return [side1Length, side2Length, side3Length];
}

export default TriangleGraph;
