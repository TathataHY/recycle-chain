import type { CodegenConfig } from "@graphql-codegen/cli";

const documentsPattern = '**/*.graphql'

const plugins = [
  "typescript",
  "typescript-operations",
  "named-operations-object",
  "typed-document-node",
];

const config: CodegenConfig = {
  overwrite: true,
  watch: true,
  schema: "../../apps/api/src/schema.gql",
  generates: {
    "./src/generated/graphql.ts": {
      documents: `./src/${documentsPattern}`,
      plugins,
    },
    "../../standalone/mobile-apps/generated/generated.ts": {
      documents: `../../standalone/mobile-apps/generated/${documentsPattern}`,
      plugins,
    },
  },
};

export default config;
