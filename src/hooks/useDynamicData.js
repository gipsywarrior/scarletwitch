import { useState, useEffect } from 'react';

const useDynamicData = () => {
    const [data, setData] = useState({
        bitacora: [],
        historial: [],
        stats: {
            exp: { ganada: 0, gastada: 0, actual: 0 },
            bronce: { ganada: 0, gastada: 0, actual: 0 },
            plata: { ganada: 0, gastada: 0, actual: 0 },
            oro: { ganada: 0, gastada: 0, actual: 0 }
        }
    });

    useEffect(() => {
        fetch('/data.txt')
            .then(res => res.text())
            .then(text => {
                const parsed = parseTxt(text);
                setData(parsed);
            });
    }, []);

    const parseTxt = (text) => {
        const sections = text.split(/\[(.*?)\]/);
        let bitacoraRaw = "";
        let historialRaw = "";

        for (let i = 1; i < sections.length; i += 2) {
            if (sections[i] === "Bitacora") bitacoraRaw = sections[i + 1];
            if (sections[i] === "Historial") historialRaw = sections[i + 1];
        }

        const bitacora = bitacoraRaw.trim().split('\n').filter(l => l.trim()).map(line => ({
            isTitle: line.trim().startsWith('>'),
            text: line.trim().replace(/^>/, '')
        }));

        const stats = {
            exp: { ganada: 0, gastada: 0, actual: 0 },
            bronce: { ganada: 0, gastada: 0, actual: 0 },
            plata: { ganada: 0, gastada: 0, actual: 0 },
            oro: { ganada: 0, gastada: 0, actual: 0 }
        };

        const historial = historialRaw.trim().split('\n').filter(l => l.trim()).map(line => {
            const actionMatch = line.match(/"(.*?)"/);
            if (!actionMatch) return null;

            const action = actionMatch[1];
            const parts = line.split(actionMatch[0]);

            const date = parts[0].trim().replace(/,$/, '');
            const rest = parts[1].split(',').map(s => s.trim());

            const expStr = rest[1] || "0";
            const curStr = rest[2] || "0";
            const link = rest[3] || null;

            const expVal = parseInt(expStr.replace(/[^\d-]/g, '')) || 0;
            if (expVal > 0) stats.exp.ganada += expVal;
            else if (expVal < 0) stats.exp.gastada += Math.abs(expVal);

            let currencyType = null;
            let curVal = parseInt(curStr.replace(/[^\d-]/g, '')) || 0;

            if (curStr.includes('DB')) currencyType = 'bronce';
            else if (curStr.includes('DP')) currencyType = 'plata';
            else if (curStr.includes('DO')) currencyType = 'oro';

            if (currencyType) {
                if (curVal > 0) stats[currencyType].ganada += curVal;
                else if (curVal < 0) stats[currencyType].gastada += Math.abs(curVal);
            }

            return { date, action, expStr, curStr, link };
        }).filter(Boolean);

        stats.exp.actual = stats.exp.ganada - stats.exp.gastada;
        stats.bronce.actual = stats.bronce.ganada - stats.bronce.gastada;
        stats.plata.actual = stats.plata.ganada - stats.plata.gastada;
        stats.oro.actual = stats.oro.ganada - stats.oro.gastada;

        return { bitacora, historial, stats };
    };

    return data;
};

export default useDynamicData;
