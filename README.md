# sneveil/simple-http

[![npm version](https://img.shields.io/npm/v/sneveil/simple-http.svg)](https://www.npmjs.com/package/sneveil/simple-http)
[![CI](https://github.com/sneveil/simple-http/actions/workflows/ci.yml/badge.svg)](https://github.com/sneveil/simple-http/actions/workflows/ci.yml)
[![npm downloads](https://img.shields.io/npm/dm/sneveil/simple-http.svg)](https://www.npmjs.com/package/sneveil/simple-http)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple Angular library for managing HTTP calls to an API, including loading, error handling, and request management, all managed by a single object.

## Installation

\`\`\`bash
npm install sneveil/simple-http
\`\`\`

## Prérequis

- Angular >= 17.0.0
- RxJS >= 7.0.0

## Utilisation rapide

\`\`\`typescript
import { SimpleHttpModule } from 'sneveil/simple-http';

@NgModule({
  imports: [SimpleHttpModule.forRoot({ baseUrl: 'https://api.example.com' })]
})
export class AppModule {}
\`\`\`

## API

| Méthode | Description |
|---------|-------------|
| `get(url, options?)` | Requête GET avec retry automatique |
| `post(url, body, options?)` | Requête POST |
| `put(url, body, options?)` | Requête PUT |
| `delete(url, options?)` | Requête DELETE |

## Configuration

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `baseUrl` | `string` | `''` | URL de base de l'API |
| `retryCount` | `number` | `3` | Nombre de tentatives |
| `cacheEnabled` | `boolean` | `false` | Active le cache des GET |

## Contribuer

Voir [CONTRIBUTING.md](./CONTRIBUTING.md). Ce projet suit [Conventional Commits](https://www.conventionalcommits.org/).

## Changelog

Voir [CHANGELOG.md](./CHANGELOG.md).

## Licence

MIT © Sneveil