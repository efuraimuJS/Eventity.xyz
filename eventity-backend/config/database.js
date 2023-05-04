const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
  },
});

// \\wsl$\Ubuntu-22.04\home\efuraimujs\project22\Eventity.xyz\eventity-backend\.tmp\data.db
