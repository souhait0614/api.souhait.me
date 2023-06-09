## /cjp

```typescript
type RequestBody = {
  input: string
}

type ResponseBody = {
  output: string
}
```

## /genhera

```typescript
type RequestBody = {
  input: string
}

type ResponseBody = {
  output: string
}
```

## /nomlish

```typescript
type RequestBody = {
  input: string
  level?: 1 | 2 | 3 | 4
}

type ResponseBody = {
  output: string
}
```

## /googleRetranslate

```typescript
type RequestBody = {
  input: string
  target?: string
  source?: string
}

type ResponseBody = {
  output: string
}
```
