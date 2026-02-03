import React, { useEffect, useRef } from 'react';
import './StatsPentagram.css';

const StatsPentagram = ({ stats: dynamicStats }) => {
    const pentacleRef = useRef(null);
    const statsGroupRef = useRef(null);
    const pmValueRef = useRef(null);

    const defaultStats = {
        vit: 3000,
        fue: 1000,
        vel: 5,
        vol: 1,
        ref: 1,
        pm: 1000
    };

    const stats = dynamicStats || defaultStats;

    const display = v => String(v).padStart(2, "0");
    const maxRadius = 120;
    const minRadius = 40;
    const labelOffset = 40; // Increased from 25
    const order = ["vit", "fue", "vel", "vol", "ref"];
    const starOrder = [0, 2, 4, 1, 3, 0];

    const ritualScale = v => Math.log10(v + 1);

    const perceptualBoost = (stat, value) => {
        if (stat === "vol" || stat === "ref") {
            return ritualScale(value) * 1.6;
        }
        return ritualScale(value);
    };

    const maxScaled = Math.max(...order.map(stat => perceptualBoost(stat, stats[stat])));

    const polar = (angle, stat, value) => {
        const scaled = perceptualBoost(stat, value);
        const r = minRadius + (scaled / maxScaled) * (maxRadius - minRadius);
        return {
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r
        };
    };

    const angles = order.map((_, i) => -Math.PI / 2 + i * (2 * Math.PI / order.length));
    const initialPoints = angles.map((a, i) => polar(a, order[i], stats[order[i]]));
    const perimeterPoints = angles.map(a => ({
        x: Math.cos(a) * maxRadius,
        y: Math.sin(a) * maxRadius
    }));

    // Calculate inner pentagon vertices (where pentagram lines intersect)
    // The inner pentagon radius is outer * (1/phi^2) ≈ 0.382, rotated 36°
    const phi = (1 + Math.sqrt(5)) / 2;
    const innerRadius = maxRadius / (phi * phi);
    const innerAngles = angles.map(a => a + Math.PI / 5); // Rotated 36° (π/5)
    const innerPoints = innerAngles.map(a => ({
        x: Math.cos(a) * innerRadius,
        y: Math.sin(a) * innerRadius
    }));

    // Rounded tip parameters
    const tipRadius = 10; // Radius of the rounded arc at each tip

    // For a regular pentagram, the tip angle is 36° (π/5)
    const tipAngle = Math.PI / 5; // 36 degrees
    const halfAngle = tipAngle / 2; // 18 degrees

    // Distance from vertex to tangent point along each side
    const tangentDist = tipRadius / Math.tan(halfAngle);

    // For each tip, calculate the arc that "rounds" the vertex
    const getRoundedTipPath = (i) => {
        const outer = perimeterPoints[i];
        const innerLeft = innerPoints[(i + 4) % 5];
        const innerRight = innerPoints[i];

        // Direction vectors from outer vertex to each inner point
        const dirLeft = {
            x: innerLeft.x - outer.x,
            y: innerLeft.y - outer.y
        };
        const dirRight = {
            x: innerRight.x - outer.x,
            y: innerRight.y - outer.y
        };

        // Normalize the direction vectors
        const lenLeft = Math.sqrt(dirLeft.x ** 2 + dirLeft.y ** 2);
        const lenRight = Math.sqrt(dirRight.x ** 2 + dirRight.y ** 2);
        const normLeft = { x: dirLeft.x / lenLeft, y: dirLeft.y / lenLeft };
        const normRight = { x: dirRight.x / lenRight, y: dirRight.y / lenRight };

        // Tangent points: move from outer vertex inward by tangentDist
        const p1 = {
            x: outer.x + normLeft.x * tangentDist,
            y: outer.y + normLeft.y * tangentDist
        };
        const p2 = {
            x: outer.x + normRight.x * tangentDist,
            y: outer.y + normRight.y * tangentDist
        };

        // Draw the arc from p1 to p2
        // Then lines back to the vertex to close the shape for filling
        // sweep-flag = 1 for clockwise (bulge points outward, hollow toward center)
        return `M ${p1.x} ${p1.y} A ${tipRadius} ${tipRadius} 0 0 1 ${p2.x} ${p2.y} L ${outer.x} ${outer.y} Z`;
    };

    const getBlobPath = (pts) => {
        if (!pts.length) return "";
        const n = pts.length;
        let d = `M ${(pts[0].x + pts[n - 1].x) / 2},${(pts[0].y + pts[n - 1].y) / 2}`;
        for (let i = 0; i < n; i++) {
            const p0 = pts[i];
            const p1 = pts[(i + 1) % n];
            const midX = (p0.x + p1.x) / 2;
            const midY = (p0.y + p1.y) / 2;
            d += ` Q ${p0.x},${p0.y} ${midX},${midY}`;
        }
        return d + " Z";
    };

    useEffect(() => {
        const animatedPoints = initialPoints.map((p, i) => ({
            baseX: p.x,
            baseY: p.y,
            angle: angles[i],
            phase: Math.random() * Math.PI * 2,
            x: p.x,
            y: p.y
        }));

        const wobbleRadius = 4;
        const wobbleSpeed = 0.01;
        let animationFrameId;

        const animate = () => {
            animatedPoints.forEach((pt) => {
                pt.phase += wobbleSpeed * (0.6 + Math.random() * 0.4);
                const ox = Math.cos(pt.phase) * wobbleRadius;
                const oy = Math.sin(pt.phase * 1.3) * wobbleRadius;
                pt.x = pt.baseX + ox;
                pt.y = pt.baseY + oy;
            });

            // Removed radar animation

            if (pentacleRef.current) {
                let d = `M ${perimeterPoints[starOrder[0]].x} ${perimeterPoints[starOrder[0]].y}`;
                starOrder.slice(1).forEach(i => {
                    d += ` L ${perimeterPoints[i].x} ${perimeterPoints[i].y}`;
                });
                pentacleRef.current.setAttribute("d", d);
            }


            if (statsGroupRef.current) {
                const children = statsGroupRef.current.children;
                for (let i = 0; i < order.length; i++) {
                    const angle = angles[i];
                    const lx = Math.cos(angle) * (maxRadius + labelOffset);
                    const ly = Math.sin(angle) * (maxRadius + labelOffset);
                    children[i * 2].setAttribute("x", lx);
                    children[i * 2].setAttribute("y", ly);
                    children[i * 2 + 1].setAttribute("x", lx);
                    children[i * 2 + 1].setAttribute("y", ly + 20); // Spacing between label and value
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="sigil-container">
            <svg id="sigil" viewBox="-180 -180 360 360">
                <circle r="125" className="pentagram-base" />
                <path id="pentacle" ref={pentacleRef} />
                {/* Rounded arc tips at each pentacle vertex */}
                {[0, 1, 2, 3, 4].map(i => (
                    <path 
                        key={i} 
                        d={getRoundedTipPath(i)} 
                        className="pentacle-tip" 
                    />
                ))}
                <g id="stats" ref={statsGroupRef}>
                    {order.map((stat) => (
                        <React.Fragment key={stat}>
                            <text className="stat-label">{stat.toUpperCase()}</text>
                            <text className="stat-value">{display(stats[stat])}</text>
                        </React.Fragment>
                    ))}
                </g>
                <g className="pm-center">
                    <text id="pm-label" x="0" y="-12">PM</text>
                    <text id="pm-value" ref={pmValueRef} x="0" y="12">{display(stats.pm)}</text>
                </g>
                {/* Daedric Symbols around the pentagram */}
                <g className="daedric-symbols">
                    {/* A - Arriba Izquierda (entre VIT y REF) */}
                    <text className="daedric-symbol" x="-55" y="-70">A</text>
                    {/* S - Arriba Derecha (entre VIT y FUE) */}
                    <text className="daedric-symbol" x="55" y="-70">S</text>
                    {/* Q - Abajo (entre VOL y VEL, centrado) */}
                    <text className="daedric-symbol" x="0" y="95">Q</text>
                </g>
            </svg>
        </div>
    );
};

export default StatsPentagram;
