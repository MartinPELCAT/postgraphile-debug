import express from 'express';
import { join } from 'path';
import { postgraphile } from 'postgraphile';
import { PostGraphileConnectionFilterPreset } from 'postgraphile-plugin-connection-filter';
import { PostGraphileAmberPreset } from 'postgraphile/presets/amber';
import { PgLazyJWTPreset } from 'postgraphile/presets/lazy-jwt';
import { makeV4Preset } from 'postgraphile/presets/v4';
import { makePgService } from 'postgraphile/adaptors/pg';
import { grafserv } from 'postgraphile/grafserv/express/v4';

const app = express();

const PORT = 3000 ?? Number(process.env.PORT);


const preset: GraphileConfig.Preset = {
  extends: [
    PostGraphileAmberPreset,
    PgLazyJWTPreset,
    PostGraphileConnectionFilterPreset,
    makeV4Preset({
      dynamicJson: true,
      watchPg: false,
      graphiql: true,
      enhanceGraphiql: true,
      exportGqlSchemaPath: join(__dirname, 'schema.gql').replace('/dist', ''),
      sortExport: true,
    }),
  ],
  pgServices: [
    makePgService({
      connectionString: "postgres://server:postgres_server_dev@localhost/platform",
      schemas: "public",
    }),
  ],
};

const pgl = postgraphile(preset);

const serv = pgl.createServ(grafserv);


const server = app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`;
  console.info(`Server ready at ${url}`);
});

serv.addTo(app, server);

server.on('error', (error) => console.error(error.message, { error }));

