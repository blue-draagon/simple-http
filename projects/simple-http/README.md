# sneveil-simple-http

[![npm version](https://img.shields.io/npm/v/sneveil-simple-http.svg)](https://www.npmjs.com/package/sneveil-simple-http)
[![CI](https://github.com/sneveil/simple-http/actions/workflows/ci.yml/badge.svg)](https://github.com/sneveil/simple-http/actions/workflows/ci.yml)
[![npm downloads](https://img.shields.io/npm/dm/sneveil-simple-http.svg)](https://www.npmjs.com/package/sneveil-simple-http)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple Angular library for managing HTTP calls to an API, including loading, error handling, and request management, all managed by a single object.

## Installation

```bash
npm install sneveil-simple-http
```

## Prerequisites

- Angular >= 19.0.0
- RxJS >= 7.0.0

Enable `HttpClient` in your app (standalone):

```typescript
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()],
};
```

## Quick start

Import the HTTP helper classes from the package and use them inside **your own** Angular service:

```typescript
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  SimpleHttp,
  SimpleHttpGet,
  SimpleHttpList,
  SimpleHttpPost,
} from 'sneveil-simple-http';

@Injectable({ providedIn: 'root' })
export class EntityService {
  private http = inject(HttpClient);

  entities = new SimpleHttpList<Entity>({
    http: this.http,
    host: 'https://api.example.com',
    service: '/api',
    endpoint: 'entities',
  });

  entity = new SimpleHttpGet<Entity>({
    http: this.http,
    host: 'https://api.example.com',
    service: '/api',
    endpoint: 'entities',
  });

  create = new SimpleHttpPost<Entity>({
    http: this.http,
    host: 'https://api.example.com',
    service: '/api',
    endpoint: 'entities',
  });
}

interface Entity {
  id: number;
  title: string;
}
```

See `src/lib/example.service.ts` in this repository for a full CRUD example.

## Public API

Everything below is exported from `sneveil-simple-http`:

| Export | Description |
|--------|-------------|
| `SimpleHttp` | Full CRUD helper |
| `SimpleHttpList` | GET list |
| `SimpleHttpGet` | GET one |
| `SimpleHttpPost` | POST |
| `SimpleHttpPut` | PUT |
| `SimpleHttpPatch` | PATCH |
| `SimpleHttpDelete` | DELETE |
| `BaseHttp` | Base class for custom helpers |
| `SimpleLoading` | Loading state (`loading$`) |
| `SimpleMessage` | Status / error / success messages |
| `SimplePersist` | Local storage helper |
| `SimpleObservable` | Single-value observable wrapper |
| `SimpleListObservable` | List observable wrapper |
| `SimpleModel` | Config type (`http`, `host`, `service`, `endpoint`) |

Each HTTP helper exposes:

- `loading$` — request in progress
- `message.status$`, `message.error$`, `message.success$` — response feedback

## Configuration (`SimpleModel`)

| Option | Type | Description |
|--------|------|-------------|
| `http` | `HttpClient` | Injected Angular HTTP client |
| `host` | `string` | API base URL (e.g. `https://api.example.com`) |
| `service` | `string` | Optional path prefix (e.g. `/api`) |
| `endpoint` | `string` | Resource path (e.g. `entities`) |

## Publish to npm

1. Bump version: `npm run release:patch` (or `minor` / `major`)
2. Push the tag: `git push && git push --tags`
3. GitHub Actions publishes `dist/simple-http` to npm as `sneveil-simple-http`

## License

MIT © Sneveil
