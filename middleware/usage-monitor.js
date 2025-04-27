const fs = require('fs');
const path = require('path');

const usageMonitor = (req, res, next) => {
    const usage = {
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.path,
        ip: req.ip
    };

    fs.appendFile(
        path.join(__dirname, '../logs/usage.log'),
        JSON.stringify(usage) + '\n',
        { flag: 'a' },
        (err) => {
            if (err) console.error('Error al guardar log de uso:', err);
        }
    );

    next();
};

module.exports = usageMonitor;