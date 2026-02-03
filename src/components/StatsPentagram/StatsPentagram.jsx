import React, { useEffect, useRef } from 'react';
import './StatsPentagram.css';

const StatsPentagram = () => {
    const radarRef = useRef(null);
    const pentacleRef = useRef(null);
    const statsGroupRef = useRef(null);
    const pmValueRef = useRef(null);

    const stats = {
        vit: 3000,
        fue: 1000,
        vel: 5,
        vol: 1,
        ref: 1,
        pm: 1000
    };

    const display = v => String(v).padStart(2, "0");
    const maxRadius = 120;
    const minRadius = 40;
    const labelOffset = 25;
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
        const wobbleSpeed = 0.008;
        let animationFrameId;

        const animate = () => {
            animatedPoints.forEach((pt) => {
                pt.phase += wobbleSpeed * (0.6 + Math.random() * 0.4);
                const ox = Math.cos(pt.phase) * wobbleRadius;
                const oy = Math.sin(pt.phase * 1.3) * wobbleRadius;
                pt.x = pt.baseX + ox;
                pt.y = pt.baseY + oy;
            });


            if (radarRef.current) {
                radarRef.current.setAttribute("d", getBlobPath(animatedPoints));
            }


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
                    children[i * 2 + 1].setAttribute("y", ly + 14);
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
                <circle r="120" className="guide" />
                <circle r="80" className="guide" />
                <path id="pentacle" ref={pentacleRef} />
                <path id="radar-fill" ref={radarRef} /> 
                <g id="stats" ref={statsGroupRef}>
                    {order.map((stat) => (
                        <React.Fragment key={stat}>
                            <text className="stat-label">{stat.toUpperCase()}</text>
                            <text className="stat-value">{display(stats[stat])}</text>
                        </React.Fragment>
                    ))}
                </g>
                <g className="pm-center">
                    <text id="pm-label" x="0" y="-4">PM</text>
                    <text id="pm-value" ref={pmValueRef} x="0" y="10">{display(stats.pm)}</text>
                </g>
            </svg>
        </div>
    );
};

export default StatsPentagram;
