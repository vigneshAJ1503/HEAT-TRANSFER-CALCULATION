function calculate() {
    const T_H_IN = parseFloat(document.getElementById('T_H_IN').value);
    const T_C_IN = parseFloat(document.getElementById('T_C_IN').value);
    const m_dot_H = parseFloat(document.getElementById('m_dot_H').value);
    const m_dot_C = parseFloat(document.getElementById('m_dot_C').value);
    const UA = parseFloat(document.getElementById('UA').value);

    if (isNaN(T_H_IN) || isNaN(T_C_IN) || isNaN(m_dot_H) || isNaN(m_dot_C) || isNaN(UA)) {
        alert("Please enter valid numerical values for all inputs.");
        return;
    }

    let T_H_OUT = T_H_IN - 10;
    let T_C_OUT = T_C_IN + 10;

    for (let i = 0; i < 100; i++) {
        const T_D_1 = T_H_IN - T_C_OUT;
        const T_D_2 = T_H_OUT - T_C_IN;

        const LMTD = (T_D_1 - T_D_2) / Math.log(T_D_1 / T_D_2);

        const Q_LMTD = UA * LMTD;

        const DeltaT_H = T_H_IN - T_H_OUT;
        const DeltaT_C = T_C_OUT - T_C_IN;

        const Q_H = m_dot_H * 2 * DeltaT_H;
        const Q_C = m_dot_C * DeltaT_C;

        if (Math.abs(Q_H - Q_LMTD) < 0.01 && Math.abs(Q_C - Q_LMTD) < 0.01) {
            break;
        }

        T_H_OUT = (90 - 0.75 * UA * (T_C_OUT - 40)) / 1.5;
        T_C_OUT = (225 - 0.5 * UA * (T_C_OUT - 40)) / 2;
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p>Calculation Results:</p>
        <p><strong>T_H_OUT:</strong> ${T_H_OUT.toFixed(2)}</p>
        <p><strong>T_C_OUT:</strong> ${T_C_OUT.toFixed(2)}</p>
    `;
}